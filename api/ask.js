import { personalData, profile, projects, skills, experiences, now } from '../src/data/data.js'

// Vercel serverless function: POST /api/ask { question } -> streamed plain-text answer.
// The OpenRouter key stays server-side (OPENROUTER_API_KEY); the browser never sees it.
const MODEL = process.env.OPENROUTER_MODEL || 'anthropic/claude-haiku-5.5'

const facts = JSON.stringify(
  {
    personalData,
    profile: Object.fromEntries(profile),
    projects: projects.map(({ title, description, tags, link, github }) => ({ title, description, tags, link, github })),
    skills,
    experiences,
    now,
  },
  null,
  1,
)

const SYSTEM = `You answer visitors' questions on ${personalData.name}'s portfolio site, speaking as ${personalData.name.split(' ')[0]} in the first person.

Use only the facts below. If something isn't covered by them, say it isn't on the site and suggest emailing ${personalData.email}. Never invent projects, employers, numbers, dates, links or opinions.
Answer in under 120 words of plain sentences: no markdown, lists, headings or code.
You are not a general-purpose assistant. If asked to write code, draft or rewrite text, or do any task unrelated to this portfolio, decline in one sentence and offer to talk about the projects instead.

FACTS:
${facts}`

// shortcut: per-instance memory, so the limit resets on cold starts and isn't shared
// across instances; move to Vercel KV/Upstash or a Vercel Firewall rate-limit rule if abused.
const LIMIT = 10
const WINDOW_MS = 60 * 60 * 1000
const hits = new Map()
function allow(ip) {
  const t = Date.now()
  const recent = (hits.get(ip) || []).filter((h) => t - h < WINDOW_MS)
  if (recent.length >= LIMIT) return false
  recent.push(t)
  hits.set(ip, recent)
  return true
}

export async function POST(request) {
  let question = ''
  try {
    question = String((await request.json()).question ?? '').trim()
  } catch {
    // fall through to validation
  }
  if (!question || question.length > 300) {
    return new Response('Ask a question of up to 300 characters.', { status: 400 })
  }

  const ip = request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
  if (!allow(ip)) {
    return new Response("That's the limit for now. Try again in an hour, or email me.", { status: 429 })
  }

  const upstream = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
      'Content-Type': 'application/json',
      'X-Title': `${personalData.name} portfolio`,
    },
    body: JSON.stringify({
      model: MODEL,
      stream: true,
      max_tokens: 1024,
      reasoning: { effort: 'low', exclude: true },
      messages: [
        { role: 'system', content: SYSTEM },
        { role: 'user', content: question },
      ],
    }),
    signal: request.signal,
  })
  if (!upstream.ok || !upstream.body) {
    console.error('openrouter error:', upstream.status, await upstream.text().catch(() => ''))
    return new Response('The live answers are unavailable right now.', { status: 502 })
  }

  // OpenRouter streams OpenAI-style SSE; forward only the text deltas as plain text.
  const decoder = new TextDecoder()
  const encoder = new TextEncoder()
  let buffer = ''
  const toText = new TransformStream({
    transform(chunk, controller) {
      buffer += decoder.decode(chunk, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()
      for (const line of lines) {
        if (!line.startsWith('data:')) continue // skips ": OPENROUTER PROCESSING" keep-alives
        const data = line.slice(5).trim()
        if (data === '[DONE]') continue
        try {
          const json = JSON.parse(data)
          if (json.error) throw new Error(json.error.message || 'stream error')
          const delta = json.choices?.[0]?.delta?.content
          if (delta) controller.enqueue(encoder.encode(delta))
        } catch (err) {
          console.error('openrouter stream:', err.message)
          controller.error(err)
          return
        }
      }
    },
  })

  return new Response(upstream.body.pipeThrough(toText), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}
