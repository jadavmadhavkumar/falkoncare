Got it 👍 This is a **classic Next.js prerender crash**, and the log already tells us *where* to look. I’ll turn this into **one clear TODO list you can follow in code**, step by step.

---

## ✅ What the error really means (in plain English)

```
Error occurred prerendering page "/services"
Element type is invalid: ... but got: undefined
```

👉 During **build time**, Next.js tried to render `/services`, but **one React component imported on that page is `undefined`**.

That usually means:

* wrong import (default vs named)
* component file path is wrong
* component is client-only but used in a server component
* component isn’t exported at all

---

## 🧩 TODO: Fix `/services` build error on Vercel

### ✅ TODO 1: Open `/services/page.tsx` (or `page.jsx`)

This is the page that crashes.

```txt
/app/services/page.tsx
```

---

### ✅ TODO 2: Find the broken import

Look at **every import at the top** of the file.

❌ Common broken patterns:

```ts
import ServicesCard from "@/components/ServicesCard" // but file exports named
import { ServicesCard } from "@/components/ServicesCard" // but file exports default
import Something from "@/components/something" // wrong filename case
```

✔ Correct patterns must match exports exactly.

---

### ✅ TODO 3: Verify each component export

Open every component used on `/services`.

#### If you import like this:

```ts
import ServicesCard from "@/components/ServicesCard"
```

Then the component file **must** have:

```ts
export default function ServicesCard() {
  return (...)
}
```

#### If you import like this:

```ts
import { ServicesCard } from "@/components/ServicesCard"
```

Then the component file **must** have:

```ts
export function ServicesCard() {
  return (...)
}
```

🚨 If even **one component is `undefined`**, the build will fail.

---

### ✅ TODO 4: Check for client-only components

If `/services/page.tsx` uses:

* `useState`
* `useEffect`
* `window`
* `document`
* third-party UI libs (carousel, map, charts)

Then **add this at the very top** of the file:

```ts
"use client";
```

⚠ Without this, Vercel build fails but local dev might still work.

---

### ✅ TODO 5: Temporarily isolate the crash (fast debug)

Replace `/services/page.tsx` with this:

```tsx
export default function ServicesPage() {
  return <div>Services page works</div>;
}
```

* If build **passes** → the issue is **one of your components**
* Add components back **one by one** until it fails again

That pinpoints the exact culprit.

---

### ✅ TODO 6: Watch for dynamic imports that break SSR

If you use things like maps, charts, sliders:

❌ Bad:

```ts
import Map from "@/components/Map";
```

✔ Fix with dynamic import:

```ts
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
});
```

---

### ✅ TODO 7: Re-deploy on Vercel

After fixing:

```bash
git add .
git commit -m "Fix services page prerender error"
git push
```

Vercel will rebuild automatically.

---

## 🧠 90% chance the real issue is ONE of these

* ❌ Default vs named export mismatch
* ❌ Missing `"use client"`
* ❌ Wrong file path or filename case
* ❌ Client-only library rendered on server

---

If you want, paste:

* `/app/services/page.tsx`
* or the imports at the top

and I’ll **tell you exactly which line is breaking the build** 👀🔥

