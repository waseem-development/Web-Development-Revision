# TypeScript Initialization (Node.js Project)

---

## 1. Create Project Folder

<pre class="overflow-visible! px-0!" data-start="347" data-end="395"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:0:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder="" data-language="shell"><div class="cm-line">mkdir my-ts-project</div><div class="cm-line">cd my-ts-project</div></div></div></div></div></div></div></div></div></div></pre>

---

## 2. Initialize npm

<pre class="overflow-visible! px-0!" data-start="424" data-end="447"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:1:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">npm init <span class="ͼc">-y</span></div></div></div></div></div></div></div></div></div></div></pre>

This creates:

<pre class="overflow-visible! px-0!" data-start="464" data-end="484"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:2:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder=""><div class="cm-line">package.json</div></div></div></div></div></div></div></div></div></div></pre>

---

## 3. Install TypeScript + Node Types

<pre class="overflow-visible! px-0!" data-start="530" data-end="573"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:3:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">npm i <span class="ͼc">-D</span> typescript @types/node</div></div></div></div></div></div></div></div></div></div></pre>

### Why?

* `typescript` → compiler
* `@types/node` → Node globals (`process`, `fs`, `path`, etc.)

Both are **devDependencies** because they’re not needed at runtime.

---

## 4. Generate tsconfig.json

<pre class="overflow-visible! px-0!" data-start="779" data-end="805"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:4:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">npx tsc <span class="ͼc">--init</span></div></div></div></div></div></div></div></div></div></div></pre>

Creates:

<pre class="overflow-visible! px-0!" data-start="817" data-end="838"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:5:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder=""><div class="cm-line">tsconfig.json</div></div></div></div></div></div></div></div></div></div></pre>

---

## 5. Create Source Folder

<pre class="overflow-visible! px-0!" data-start="873" data-end="911"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:6:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">mkdir src</div><div class="cm-line">touch src/app.ts</div></div></div></div></div></div></div></div></div></div></pre>

---

## 6. Minimal tsconfig.json (Recommended)

Replace with this for Node projects:

<pre class="overflow-visible! px-0!" data-start="999" data-end="1239"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:7:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder="" data-language="json"><div class="cm-line">{</div><div class="cm-line">  "compilerOptions": {</div><div class="cm-line">    "rootDir": <span class="ͼ7">"./src"</span>,</div><div class="cm-line">    "outDir": <span class="ͼ7">"./dist"</span>,</div><div class="cm-line"><br/></div><div class="cm-line">    "module": <span class="ͼ7">"NodeNext"</span>,</div><div class="cm-line">    "target": <span class="ͼ7">"ES2022"</span>,</div><div class="cm-line"><br/></div><div class="cm-line">    "strict": <span class="ͼ8">true</span>,</div><div class="cm-line">    "esModuleInterop": <span class="ͼ8">true</span>,</div><div class="cm-line">    "skipLibCheck": <span class="ͼ8">true</span>,</div><div class="cm-line"><br/></div><div class="cm-line">    "sourceMap": <span class="ͼ8">true</span></div><div class="cm-line">  }</div><div class="cm-line">}</div></div></div></div></div></div></div></div></div></div></pre>

### Meaning:

| Option       | Purpose             |
| ------------ | ------------------- |
| rootDir      | TS source           |
| outDir       | Compiled JS         |
| module       | Modern Node imports |
| target       | JS version          |
| strict       | Full type safety    |
| sourceMap    | Debugging           |
| skipLibCheck | Faster builds       |

---

## 7. package.json Scripts

Update:

<pre class="overflow-visible! px-0!" data-start="1533" data-end="1631"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:8:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder="" data-language="json"><div class="cm-line"><span class="ͼ7">"scripts"</span>: {</div><div class="cm-line">  "build": <span class="ͼ7">"tsc"</span>,</div><div class="cm-line">  "start": <span class="ͼ7">"node dist/app.js"</span>,</div><div class="cm-line">  "dev": <span class="ͼ7">"tsc --watch"</span></div><div class="cm-line">}</div></div></div></div></div></div></div></div></div></div></pre>

---

## 8. Example app.ts

<pre class="overflow-visible! px-0!" data-start="1660" data-end="1696"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:9:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder="" data-language="typescript"><div class="cm-line">console<span class="ͼ9">.</span>log(<span class="ͼ7">"Hello Waseem"</span>);</div></div></div></div></div></div></div></div></div></div></pre>

---

## 9. Compile

<pre class="overflow-visible! px-0!" data-start="1718" data-end="1743"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:10:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">npm run build</div></div></div></div></div></div></div></div></div></div></pre>

Creates:

<pre class="overflow-visible! px-0!" data-start="1755" data-end="1774"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:11:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder=""><div class="cm-line">dist/app.js</div></div></div></div></div></div></div></div></div></div></pre>

---

## 10. Run

<pre class="overflow-visible! px-0!" data-start="1793" data-end="1814"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:12:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">npm start</div></div></div></div></div></div></div></div></div></div></pre>

Output:

<pre class="overflow-visible! px-0!" data-start="1825" data-end="1843"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:13:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder=""><div class="cm-line">Hello Waseem</div></div></div></div></div></div></div></div></div></div></pre>

---

# Important Concept (Core Interview Point)

### Node NEVER runs TypeScript.

Flow:

<pre class="overflow-visible! px-0!" data-start="1937" data-end="1975"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:14:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder=""><div class="cm-line">TypeScript → JavaScript → Node</div></div></div></div></div></div></div></div></div></div></pre>

Always.

---

# Optional: Run TS Directly (Development Only)

<pre class="overflow-visible! px-0!" data-start="2041" data-end="2069"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:15:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">npm i <span class="ͼc">-D</span> ts-node</div></div></div></div></div></div></div></div></div></div></pre>

Then:

<pre class="overflow-visible! px-0!" data-start="2078" data-end="2112"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:16:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" data-language="shell" aria-placeholder=""><div class="cm-line">npx ts-node src/app.ts</div></div></div></div></div></div></div></div></div></div></pre>

This skips manual compiling.

⚠️ Not recommended for production.

---

# Real-World Folder Structure

<pre class="overflow-visible! px-0!" data-start="2218" data-end="2324"><div class="w-full"><div class=""><div class=""><div class="border-token-border-light bg-token-bg-elevated-secondary corner-superellipse/1.1 rounded-3xl border my-4"><div class="pointer-events-none sticky z-40 shrink-0 mx-4 transition-opacity duration-300 opacity-0"><div class="sticky bg-token-border-light"></div></div><div class="relative z-0 flex max-w-full"><div id="7de3ff83-6511-4fd4-bbed-c993a0448ae9:17:editor" class="Rx43rG_codemirror z-10 flex h-full w-full flex-col items-stretch"><div class="cm-editor ͼ1 ͼ3 ͼ5"><div class="cm-announced" aria-live="polite"></div><div tabindex="-1" class="cm-scroller"><div spellcheck="false" autocorrect="off" autocapitalize="none" writingsuggestions="false" translate="no" contenteditable="false" class="cm-content" role="textbox" aria-multiline="true" aria-readonly="true" aria-label="Edit code" aria-placeholder=""><div class="cm-line">project/</div><div class="cm-line">│</div><div class="cm-line">├── src/</div><div class="cm-line">│   └── app.ts</div><div class="cm-line">│</div><div class="cm-line">├── dist/</div><div class="cm-line">│   └── app.js</div><div class="cm-line">│</div><div class="cm-line">├── tsconfig.json</div><div class="cm-line">└── package.json</div></div></div></div></div></div></div></div></div></div></pre>

---

# Professional Summary

### Initialization steps:

1. npm init
2. install typescript + @types/node
3. tsc --init
4. create src
5. configure tsconfig
6. add scripts
7. write TS
8. compile
9. run JS
