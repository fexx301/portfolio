// Run with `npm test`. Mocks OpenRouter, so no key or network is needed.
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { POST } from '../api/ask.js'

const ask = (question, ip = '1.1.1.1') =>
  POST(
    new Request('http://x/api/ask', {
      method: 'POST',
      headers: { 'x-forwarded-for': ip },
      body: JSON.stringify({ question }),
    }),
  )

function mockOpenRouter(chunks, status = 200) {
  globalThis.fetch = async () =>
    new Response(
      new ReadableStream({
        start(c) {
          for (const chunk of chunks) c.enqueue(new TextEncoder().encode(chunk))
          c.close()
        },
      }),
      { status },
    )
}

test('rejects empty and oversized questions', async () => {
  assert.equal((await ask('   ')).status, 400)
  assert.equal((await ask('x'.repeat(301))).status, 400)
})

test('streams only the text deltas, across split chunks and keep-alives', async () => {
  mockOpenRouter([
    ': OPENROUTER PROCESSING\n\n',
    'data: {"choices":[{"delta":{"content":"Veto pins "}}]}\n\ndata: {"choices":[{"del',
    'ta":{"content":"deployments."}}]}\n\ndata: [DONE]\n\n',
  ])
  const res = await ask('What is Veto?', '2.2.2.2')
  assert.equal(res.status, 200)
  assert.equal(await res.text(), 'Veto pins deployments.')
})

test('upstream errors become a 502 so the page uses its offline answer', async () => {
  mockOpenRouter(['{"error":{"message":"No auth"}}'], 401)
  assert.equal((await ask('hi', '3.3.3.3')).status, 502)
})

test('rate-limits after 10 questions per hour per IP', async () => {
  mockOpenRouter(['data: [DONE]\n\n'])
  for (let i = 0; i < 10; i++) assert.equal((await ask('hi', '4.4.4.4')).status, 200)
  assert.equal((await ask('hi', '4.4.4.4')).status, 429)
})
