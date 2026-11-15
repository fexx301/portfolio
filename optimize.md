# GPU Optimization Plan

## Current rendering setup

The site currently runs two independent WebGL render loops:

- `Scene3D` renders the fixed particle background continuously. It uses antialiasing, Bloom post-processing, and a DPR cap of `2`.
- `Hero` renders the aurora fragment shader continuously at a DPR cap of `1`, including when the hero is off-screen.

The particle count is already reduced from `900` to `500` below `768px`. Reduced-motion currently removes `Scene3D`, but it does not stop the hero shader.

## Recommended quality tiers

### Full quality

Use on devices that maintain the target frame rate:

- Three.js DPR: `Math.min(window.devicePixelRatio, 1.5)`
- Bloom: enabled
- Particles: `900`
- Hero shader DPR: `1`

### Constrained quality

Use on mobile initially, or after a sustained performance decline:

- Three.js DPR: `1`
- Bloom: disabled
- Particles: `500`
- Hero shader DPR: `1`

### Reduced motion

When `prefers-reduced-motion: reduce` is enabled:

- Do not run the Three.js particle scene.
- Do not run the animated hero shader.
- Show the existing static hero gradient fallback.

## Priority fixes

### 1. Pause rendering when it cannot be seen

- Stop the hero shader's `requestAnimationFrame` loop when the hero leaves the viewport, and resume it when the hero becomes visible.
- Pause both WebGL render loops while `document.hidden` is true.
- Use `IntersectionObserver` and the Page Visibility API so no device classification is required for these savings.

This is the highest-value change because the hero shader currently continues drawing after the user scrolls past it.

### 2. Cap the particle canvas at DPR 1.5

Change the Three.js DPR cap from `2` to `1.5`.

At DPR `1.5`, the canvas renders `2.25x` its CSS pixel count instead of `4x` at DPR `2`. That is approximately 44% fewer pixels on high-density displays. Text, layout, images, and the hero shader are unaffected. Particles and glow may appear slightly softer, which should be difficult to notice against the Bloom effect.

Devices with a native DPR of `1.5` or lower will be unchanged.

### 3. Make Bloom adaptive

- Keep Bloom enabled for the full-quality tier.
- Disable Bloom for the constrained tier.
- Do not repeatedly toggle Bloom on and off; once the site falls back during a visit, retain constrained quality in `sessionStorage` for the rest of that session.

Bloom only affects the fixed particle background. Disabling it makes the particles a little sharper and less luminous, but does not alter the hero aurora or page content. Because Bloom already renders at `height={300}`, the performance improvement will be moderate rather than transformative.

### 4. Use measured performance as the fallback trigger

Do not classify a device as weak solely by model, age, core count, or whether it has integrated graphics.

- Start mobile/coarse-pointer devices in constrained quality.
- Start desktop devices in full quality.
- While the scene is visible, measure frame performance after a short warm-up.
- If performance remains below approximately `50 FPS` (about `20–22 ms` per frame) for two consecutive seconds, switch to constrained quality.
- Do not automatically switch back during the same session, which prevents quality oscillation.

`navigator.deviceMemory`, `navigator.hardwareConcurrency`, and data-saver status may be treated as supporting signals, but not as the sole decision mechanism.

### 5. Complete reduced-motion support

The reduced-motion path should stop the custom hero WebGL loop as well as the React Three Fiber scene. A CSS animation media query cannot stop a JavaScript `requestAnimationFrame` loop by itself.

### 6. Lower-priority particle optimization

The particle loop updates every particle on the CPU and uploads the position buffer on every frame. With only `500–900` particles this is not the largest GPU cost, but it is avoidable work.

If profiling still shows pressure after the earlier fixes:

- Move particle drift into a vertex shader, or update at a lower frequency.
- Reduce the constrained tier below `500` particles if necessary.
- Avoid adding the unused floating geometry to the always-running scene without profiling it first.

## Verification targets

Test the optimized version on desktop and at least one real mobile device:

- Full-quality desktop should remain close to `60 FPS` during normal scrolling and pointer interaction.
- Constrained quality should remain at or above roughly `50 FPS` without repeated tier switching.
- Scrolling beyond the hero should stop its WebGL draw loop.
- Background tabs should stop both WebGL loops.
- Reduced-motion mode should show static visuals with no continuously running WebGL animation.
- Check high-DPR displays specifically, because that is where the DPR reduction provides the largest saving.

## Expected outcome

The visual identity remains intact on capable hardware. Constrained devices lose a small amount of particle glow and sharpness in exchange for steadier frame rates, lower battery usage, and less heat. Pausing invisible work should provide the largest improvement with no visible tradeoff.
