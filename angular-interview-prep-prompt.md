# Senior Angular Interview Prep — Build Instructions for Claude Code

## TASK

Build a complete **multi-page static website** — an interview preparation reference guide for Senior Angular Developer (FinTech focus). No frameworks, no build tools. Pure HTML + CSS + JS. Ready to open in browser and deploy to GitHub Pages as-is.

---

## FILE STRUCTURE

```
/
├── index.html                  ← Dashboard / hub
├── styles/
│   └── main.css                ← Global design system
├── js/
│   └── app.js                  ← All interactive JS
├── pages/
│   ├── js-core.html            ← JavaScript Core
│   ├── typescript.html         ← TypeScript
│   ├── angular-core.html       ← Angular fundamentals
│   ├── rxjs.html               ← RxJS — all operators
│   ├── ngrx.html               ← NgRx Store
│   ├── signals.html            ← Angular Signals
│   ├── di.html                 ← Dependency Injection
│   ├── forms.html              ← Angular Forms
│   ├── routing.html            ← Router — full topic
│   ├── websocket.html          ← WebSocket for trading
│   ├── canvas.html             ← Canvas API + charts
│   ├── workers.html            ← ServiceWorker + WebWorker
│   ├── http.html               ← HTTP methods + Interceptors
│   ├── architecture.html       ← Architecture + Patterns
│   ├── solid-dry.html          ← SOLID, DRY, KISS, YAGNI
│   ├── live-coding.html        ← Live coding tasks + solutions
│   ├── communication.html      ← Client communication simulation
│   └── cheatsheet.html         ← Quick reference cheatsheet
└── README.md
```

---

## DESIGN SYSTEM (main.css)

```css
:root {
  --bg: #f8fafc;
  --bg-card: #ffffff;
  --bg-code: #f1f5f9;
  --bg-sidebar: #ffffff;
  --text-primary: #1e293b;
  --text-secondary: #475569;
  --text-muted: #94a3b8;
  --accent: #3b82f6;
  --accent-light: #eff6ff;
  --accent-dark: #1d4ed8;
  --success: #10b981;
  --success-light: #ecfdf5;
  --warning: #f59e0b;
  --warning-light: #fffbeb;
  --danger: #ef4444;
  --danger-light: #fef2f2;
  --border: #e2e8f0;
  --shadow: 0 1px 3px rgba(0, 0, 0, 0.07), 0 1px 2px rgba(0, 0, 0, 0.05);
  --radius: 10px;
  --radius-sm: 6px;
  --sidebar-width: 260px;
}

/* Dark mode */
[data-theme="dark"] {
  --bg: #0f172a;
  --bg-card: #1e293b;
  --bg-code: #0f172a;
  --bg-sidebar: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
  --text-muted: #64748b;
  --border: #334155;
  --accent-light: #1e3a5f;
  --success-light: #064e3b;
  --warning-light: #451a03;
  --danger-light: #450a0a;
}
```

**Component classes to implement:**

- `.card` — white bg, border, border-radius: var(--radius), box-shadow, padding 1.5rem
- `.code-block` — monospace, bg-code, border, copy button (top-right), syntax colored via highlight.js
- `.tip` — left border accent blue, accent-light bg
- `.warn` — left border warning
- `.danger` — left border danger
- `.success` — left border success
- `.badge.mutates` — red pill label
- `.badge.pure` — green pill label
- `.badge.new-arr` — blue pill label
- `.qa-block` — question card with toggle answer button
- `.quiz-option` — clickable answer, turns green/red on click
- `.definition` — italic, slightly indented, colored text — for defining terms
- `.comparison-table` — full-width table with alternating rows, sticky header

**Layout:**

```
[ sidebar 260px fixed ] [ main content scrollable ]
```

Sidebar: fixed left, full height, white bg, border-right, overflow-y auto, z-index 100.
On mobile (< 768px): sidebar hidden, hamburger button top-left toggles it.

---

## JAVASCRIPT (app.js)

Implement these functions:

```js
// 1. Toggle Q&A answer visibility
function toggleAnswer(btn) { ... }

// 2. Quiz answer check with feedback
function checkAnswer(el, isCorrect, explanation) { ... }

// 3. Copy code block to clipboard
function copyCode(btn) { ... }

// 4. Dark mode toggle (persist in localStorage)
function toggleDarkMode() { ... }

// 5. Mark page as done (persist in localStorage)
function markDone(pageId) { ... }

// 6. Keyboard shortcut Ctrl+K → focus search input
// 7. Filter page content by search keyword (highlight matching text)
// 8. Smooth scroll to anchor
// 9. Highlight active sidebar link based on current URL
// 10. Collapsible hint sections in live-coding page
// 11. Update progress counter on index page from localStorage
```

---

## GLOBAL PAGE TEMPLATE

Every page in `/pages/` follows this structure:

```html
<!DOCTYPE html>
<html lang="en" data-theme="light">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>[Topic] — Angular Interview Prep</title>
    <link rel="stylesheet" href="../styles/main.css" />
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"></script>
  </head>
  <body>
    <!-- Hamburger (mobile) -->
    <button class="hamburger" onclick="toggleSidebar()">☰</button>

    <!-- Sidebar -->
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <span>Angular Prep</span>
        <button class="dark-toggle" onclick="toggleDarkMode()">🌙</button>
      </div>
      <nav>
        <!-- ALL page links here, active class on current -->
        <a href="../index.html">🏠 Dashboard</a>
        <div class="nav-section">JavaScript</div>
        <a href="js-core.html">JS Core</a>
        <div class="nav-section">TypeScript</div>
        <a href="typescript.html">TypeScript</a>
        <div class="nav-section">Angular</div>
        <a href="angular-core.html">Angular Core</a>
        <a href="signals.html">Signals</a>
        <a href="di.html">Dependency Injection</a>
        <a href="forms.html">Forms</a>
        <a href="routing.html">Router</a>
        <div class="nav-section">RxJS & State</div>
        <a href="rxjs.html">RxJS</a>
        <a href="ngrx.html">NgRx</a>
        <div class="nav-section">Platform APIs</div>
        <a href="websocket.html">WebSocket</a>
        <a href="canvas.html">Canvas</a>
        <a href="workers.html">SW + WebWorker</a>
        <a href="http.html">HTTP & Interceptors</a>
        <div class="nav-section">Engineering</div>
        <a href="architecture.html">Architecture</a>
        <a href="solid-dry.html">SOLID & DRY</a>
        <div class="nav-section">Practice</div>
        <a href="live-coding.html">Live Coding</a>
        <a href="communication.html">Client Comms</a>
        <a href="cheatsheet.html">⚡ Cheatsheet</a>
      </nav>
      <div class="sidebar-progress">
        Progress: <span id="progress-count">0</span> / 18
      </div>
    </aside>

    <!-- Main -->
    <main class="main-content">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="../index.html">Home</a> › <span>[Topic]</span>
      </nav>

      <!-- Page header -->
      <div class="page-header">
        <h1>[Topic Title]</h1>
        <p class="page-desc">[Short description]</p>
        <button class="btn-done" onclick="markDone('[page-id]')">
          ✓ Mark as done
        </button>
      </div>

      <!-- Search -->
      <div class="search-bar">
        <input
          type="text"
          id="search"
          placeholder="Search on this page... (Ctrl+K)"
          oninput="filterContent(this.value)"
        />
      </div>

      <!-- CONTENT HERE -->

      <!-- Page navigation -->
      <div class="page-nav">
        <a href="[prev].html" class="btn-nav">← [Prev topic]</a>
        <a href="[next].html" class="btn-nav">→ [Next topic]</a>
      </div>
    </main>

    <!-- Back to top -->
    <button
      class="back-to-top"
      onclick="window.scrollTo({top:0,behavior:'smooth'})"
    >
      ↑
    </button>

    <script src="../js/app.js"></script>
    <script>
      hljs.highlightAll();
    </script>
  </body>
</html>
```

---

## CONTENT — EACH PAGE IN DETAIL

### index.html — Dashboard

Grid of 18 topic cards. Each card:

- Emoji icon
- Title
- 1-line description
- Estimated read time (e.g. "~20 min")
- Progress indicator (done/not done from localStorage)
- "Start →" link

Top stats bar: "X of 18 topics completed" progress bar.

---

### js-core.html — JavaScript Core

#### Section: Data Types

8 types: number, bigInt, string, boolean, undefined, null, object, symbol.

Full explanation of each. Special note: `typeof null === 'object'` is a historical bug.

Primitives vs Reference types:

- Side-by-side visual: primitive copied by value, reference copied by pointer
- Code showing mutation problem with objects
- Solutions: spread `{...obj}`, `Object.assign()`, `structuredClone()`

#### Section: Array Methods (VERY DETAILED)

Full table with ALL methods. For each method write:

- **Definition** — what it does in 1 sentence
- **Mutates**: yes/no badge
- **Returns**: what type
- **Parameters**: listed
- **Code example**
- **Pitfall** (if any)

Methods to cover individually:

MUTATING (badge: red "mutates"):
`push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`, `copyWithin`

NON-MUTATING returning new array (badge: blue "new array"):
`map`, `filter`, `slice`, `concat`, `flat`, `flatMap`, `Array.from`

NON-MUTATING returning value (badge: green "pure"):
`reduce`, `reduceRight`, `find`, `findIndex`, `findLast`, `findLastIndex`, `some`, `every`, `includes`, `indexOf`, `lastIndexOf`, `join`, `forEach`, `entries`, `keys`, `values`, `at`

Special section: **Why mutability matters in Angular**

- `this.orders.push(x)` → OnPush won't detect → UI not updated
- `this.orders = [...this.orders, x]` → new reference → OnPush detects → UI updates
- Same for NgRx reducers: always return new state object

#### Section: Object Methods

For each method: definition + example:
`Object.keys()`, `Object.values()`, `Object.entries()`, `Object.assign()`, `Object.freeze()`, `Object.isFrozen()`, `Object.create()`, `Object.defineProperty()`, `Object.getPrototypeOf()`, `structuredClone()`, `hasOwnProperty()`, `in` operator, optional chaining `?.`, nullish coalescing `??`

#### Section: Prototypes & Prototype Chain (DETAILED)

- Definition: every object has a hidden `[[Prototype]]` property linking to another object. When you access a property, JS walks up the chain until found or `null`.
- `__proto__` vs `Object.getPrototypeOf()` — prefer the latter
- `Object.create(proto)` — creates object with specific prototype
- `hasOwnProperty(key)` vs `in` operator — difference: `in` checks prototype chain
- Prototype chain visualization: `arr → Array.prototype → Object.prototype → null`
- `instanceof` — checks if constructor's prototype is anywhere in the chain
- ES6 `class` — syntactic sugar over prototype inheritance
  - `extends` sets up prototype chain
  - `super()` calls parent constructor (required in child)
  - `static` methods on class, not instance
  - Private fields `#field` — truly private

Side-by-side: prototype function pattern vs class syntax doing the same thing.

#### Section: Spread, Rest, Destructuring

Each with definition + multiple examples:

- Spread in arrays: `[...a, ...b]`
- Spread in objects: `{...obj, key: val}`
- Rest params: `function(...args)`
- Array destructuring: `const [a, b, ...rest] = arr`
- Object destructuring: `const { name, age: userAge = 25 } = obj`
- Nested destructuring
- Destructuring in function params

#### Section: Closures & Hoisting

**var vs let vs const hoisting:**

- `var` — hoisted, initialized as `undefined`
- `let`/`const` — hoisted but NOT initialized → Temporal Dead Zone (TDZ)
- Code examples showing TDZ error

**Closures:**

- Definition: a function that remembers variables from its outer scope even after the outer function has returned
- Example 1: counter factory
- Example 2: private state (module pattern)
- Example 3: memoization
- Classic pitfall: `for` loop with `var` (all print same value) → fix with `let` or IIFE
- Angular context: used in services for encapsulating state

#### Section: Event Loop

Explain each component:

- **Call Stack** — LIFO, executes synchronous code
- **Web APIs** — browser APIs (setTimeout, fetch, DOM events) run outside stack
- **Microtask Queue** — Promise.then, queueMicrotask, MutationObserver — processed BEFORE next macrotask
- **Macrotask Queue (Callback Queue)** — setTimeout, setInterval, I/O callbacks

Step-by-step walkthrough of this exact code:

```js
console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Output: 1, 4, 3, 2 — explain WHY
```

Full lists: what goes in microtask queue vs macrotask queue.

Angular context: Zone.js patches all async APIs to trigger Change Detection.

#### Section: Promise & async/await

Promise states: pending → fulfilled / rejected (diagram).

`.then()` — definition: runs when promise resolves, receives resolved value, returns new promise
`.catch()` — definition: runs when promise rejects
`.finally()` — runs always, no arguments

Chaining example with explanation of why each step passes value.

`async/await` — equivalent of .then chain, but reads synchronously.

`await` — pauses ONLY the current async function, rest of program continues.

`try/catch` with async/await — catch error has type `unknown`, must narrow.

Comparison table:
| | Promise.all | Promise.allSettled | Promise.race | Promise.any |
|---|---|---|---|---|
| Waits for | All resolve | All settle | First to settle | First to resolve |
| Rejects if | Any rejects | Never | First rejects | All reject |
| Use case | Parallel required | Parallel optional | Timeout | First success |

`firstValueFrom` (RxJS): converts Observable to Promise — used when you need await with Angular HTTP.

#### Section: this, call, apply, bind

`this` in 5 contexts (table):

1. Global — `window` (non-strict) / `undefined` (strict)
2. Object method — the object
3. Arrow function — inherits from outer scope (no own this)
4. Class — the instance
5. Event handler — the DOM element

`call(ctx, ...args)` — definition: calls function immediately with given this and individual args
`apply(ctx, [args])` — definition: calls function immediately with given this and args as array
`bind(ctx)` — definition: returns NEW function with permanently bound this, does not call

Arrow functions: definition — they do NOT have their own `this`, they inherit from lexical scope. This is why you use arrow functions in Angular class methods and RxJS callbacks.

**Q&A block (5 questions):**

1. What is the difference between `==` and `===`?
2. What is the Temporal Dead Zone?
3. Why does `typeof null === 'object'`?
4. What's the output of setTimeout(fn, 0) vs Promise.resolve().then(fn)?
5. What is a closure? Give a practical example.

**Quiz (4 questions)** — multiple choice with instant feedback.

---

### typescript.html — TypeScript

#### Section: Generics

Definition: a type parameter that gets filled in at usage time. Like a variable, but for types.

```ts
function identity<T>(value: T): T {
  return value;
}
// T is determined at call: identity<number>(42)
```

Generic constraints: `<T extends object>`, `<T extends keyof U>`
Generic with default: `<T = string>`
Generic in interfaces and classes.
Real Angular examples: `Observable<T>`, `HttpClient.get<User[]>()`, `signal<number>(0)`, `BehaviorSubject<Order[]>`

#### Section: Utility Types

For EACH utility type: definition + example + when to use:

- `Partial<T>` — all fields optional → use for update DTOs, form partial values
- `Required<T>` — all fields required → opposite of Partial
- `Readonly<T>` — all fields readonly → immutable objects, NgRx state
- `Pick<T, K>` — take only specified keys → create DTO from model
- `Omit<T, K>` — exclude specified keys → model without id for create
- `Record<K, V>` — object type with keys K and values V → lookup maps, instrument price map
- `NonNullable<T>` — remove null and undefined → after validation
- `ReturnType<F>` — extract return type of function
- `Parameters<F>` — extract parameter types as tuple
- `Exclude<T, U>` — remove U from union T
- `Extract<T, U>` — keep only U from union T
- `InstanceType<T>` — instance type of constructor

#### Section: Type vs Interface

Comparison table:
| Feature | type | interface |
|---|---|---|
| Object shape | ✅ | ✅ |
| Union types | ✅ | ❌ |
| Intersection | `&` | `extends` |
| Declaration merging | ❌ | ✅ |
| Primitive alias | ✅ | ❌ |
| Tuple | ✅ | ❌ |
| Mapped types | ✅ | ❌ |

Rule of thumb: `interface` for models and class contracts, `type` for unions, intersections, utility type aliases.

#### Section: Discriminated Unions

Definition: a union of object types where each has a common literal field (`type`, `kind`) that uniquely identifies which variant it is. TypeScript can narrow the type in switch/if blocks.

```ts
type ApiEvent =
  | { type: "quote"; payload: Quote }
  | { type: "order"; payload: Order }
  | { type: "error"; message: string };

function handle(event: ApiEvent) {
  switch (event.type) {
    case "quote": // TS knows payload is Quote
    case "order": // TS knows payload is Order
    case "error": // TS knows message is string
  }
}
```

Use case: WebSocket message handling in trading platform.

#### Section: never, unknown, any

Definition for each, when to use, code examples.
Type narrowing with `unknown`.
Exhaustive check with `never`.

#### Section: Decorators

Definition: a function prefixed with `@` that receives metadata about the target (class, method, property, parameter) and can modify behavior.

Angular decorators — each with definition + example:
`@Component`, `@Directive`, `@Injectable`, `@Pipe`, `@NgModule`, `@Input`, `@Output`, `@ViewChild`, `@ContentChild`, `@ViewChildren`, `@ContentChildren`, `@HostListener`, `@HostBinding`

TypeScript decorators: `@readonly`, class decorators, method decorators — brief.

#### Section: Type Guards

Definition: a runtime check that narrows the TypeScript type within a code block.

Types of guards:

- `typeof` — for primitives
- `instanceof` — for classes
- `in` — for object properties
- Custom type predicate: `value is SomeType`

#### Section: keyof, typeof, Mapped Types

`keyof T` — union of keys of T as literal type
`typeof variable` — get TypeScript type from runtime value
Mapped types: transform all keys of T

**Q&A (5 questions) + Quiz (4 questions)**

---

### angular-core.html — Angular Core

#### Section: Lifecycle Hooks (DETAILED)

For each hook:

- **When it fires** (exact timing)
- **Common use case** (what to put in it)
- **Pitfall** (what NOT to do)
- **Code example**

Order: constructor → ngOnChanges → ngOnInit → ngDoCheck → ngAfterContentInit → ngAfterContentChecked → ngAfterViewInit → ngAfterViewChecked → ngOnDestroy

`constructor` — DI only, no DOM access, no HTTP
`ngOnChanges(changes: SimpleChanges)` — runs before ngOnInit if @Input exists, runs again on each @Input reference change
`ngOnInit` — run once after first ngOnChanges, good for HTTP calls and subscriptions
`ngDoCheck` — every CD cycle, very heavy — avoid unless custom CD needed
`ngAfterContentInit` — after ng-content projected, @ContentChild available
`ngAfterContentChecked` — after every content check
`ngAfterViewInit` — @ViewChild available, DOM ready — good for Canvas init, third-party libs
`ngAfterViewChecked` — after every view check
`ngOnDestroy` — cleanup: unsubscribe, clearInterval, worker.terminate()

#### Section: Change Detection

**Zone.js** — patches browser APIs (setTimeout, Promise, fetch, DOM events) so Angular knows when to run CD.

**Default strategy:**

- Every async event triggers CD on entire component tree
- Safe but slow for large apps

**OnPush strategy:**
Exactly 4 conditions that trigger check:

1. @Input reference changes (must be NEW object, not mutated)
2. Event originates from component or its children
3. async pipe emits new value
4. Manual: `markForCheck()` or `detectChanges()`

`markForCheck()` — marks component and all ancestors for check in next cycle
`detectChanges()` — immediately runs CD on component and children
`ApplicationRef.tick()` — runs CD on entire app

FinTech example: 20,000 instruments table — why OnPush is mandatory, how to update quotes correctly.

Wrong: `this.quotes.push(q)` — same array reference, OnPush misses it
Right: `this.quotes = [...this.quotes, q]` or use signals

#### Section: Standalone Components

Before (NgModule required) vs After (standalone: true).
`bootstrapApplication()` for app startup.
`importProvidersFrom()` for library providers.
`imports` array in @Component.

#### Section: New Control Flow Syntax (Angular 17+)

**@if / @else if / @else** — definition: built-in template conditional, replaces \*ngIf. Compiled at build time, not a directive. Supports `as` alias and `@else if` chaining.

```html
@if (user$ | async; as user) {
<app-profile [user]="user" />
} @else if (loading()) {
<app-spinner />
} @else {
<app-login />
}
```

**@for / @empty** — definition: replaces \*ngFor. Requires `track` expression (replaces trackBy, mandatory). Has built-in `$index`, `$first`, `$last`, `$even`, `$odd`, `$count` variables.

```html
@for (order of orders(); track order.id) {
<app-order-row [order]="order" [first]="$first" />
} @empty {
<p>No orders found.</p>
}
```

**@switch / @case / @default** — definition: replaces ngSwitch. Cleaner syntax, no extra wrappers needed.

**@defer** — definition: lazily loads a template block with configurable trigger conditions. Dramatically reduces initial bundle size for non-critical UI.

- `@placeholder` — shown before defer triggers
- `@loading` — shown while chunk is loading
- `@error` — shown if loading fails
- Trigger options: `on viewport`, `on interaction`, `on hover`, `on idle`, `on timer(2s)`, `when condition`

```html
@defer (on viewport) {
<app-heavy-chart [data]="chartData" />
} @placeholder {
<div class="chart-skeleton"></div>
} @loading (minimum 500ms) {
<app-spinner />
}
```

Why new syntax over structural directives: no imports needed, build-time optimization, cleaner code, better `@defer` support.

Migration CLI: `ng generate @angular/core:control-flow`

#### Section: Angular Pipes

**Built-in pipes** — each with definition + example:

- `DatePipe` — formats Date objects and strings. `{{ date | date:'dd/MM/yyyy' }}`. Locale-aware.
- `CurrencyPipe` — formats numbers as currency. `{{ price | currency:'USD':'symbol':'1.2-2' }}`
- `DecimalPipe` — formats numbers. `{{ price | number:'1.4-5' }}`
- `PercentPipe` — formats as percentage. `{{ ratio | percent:'1.1-2' }}`
- `AsyncPipe` — subscribes to Observable/Promise, emits values, auto-unsubscribes on destroy. Works with OnPush CD.
- `JsonPipe` — `{{ obj | json }}` — debugging
- `SlicePipe` — `{{ arr | slice:0:5 }}`
- `UpperCasePipe`, `LowerCasePipe`, `TitleCasePipe`
- `KeyValuePipe` — iterate over object properties in template

**Custom pipe:**

```ts
@Pipe({ name: "formatPrice", standalone: true, pure: true })
export class FormatPricePipe implements PipeTransform {
  transform(value: number, currency = "USD", decimals = 2): string {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value);
  }
}
// Usage: {{ instrument.price | formatPrice:'EUR':4 }}
```

**Pure vs impure pipes:**

- `pure: true` (default) — recalculates only when input reference changes. Fast.
- `pure: false` — recalculates on every CD cycle. Use only when necessary (e.g., filtering mutable arrays).
- FinTech: use pure pipes + immutable data for performance.

#### Section: trackBy

Without trackBy: Angular destroys and recreates ALL DOM nodes on array change.
With trackBy: Angular only touches changed items.

```ts
trackByOrderId = (index: number, order: Order) => order.id;
// In template: @for (order of orders; track order.id) { ... }
```

FinTech: 10,000 rows table — trackBy is non-negotiable.

#### Section: ViewChild, ContentChild

`@ViewChild` — access child component/directive/element in template
`@ContentChild` — access projected content (ng-content)
`@ViewChildren` / `@ContentChildren` — QueryList of multiple

`{ static: true }` — available in ngOnInit
`{ static: false }` — available in ngAfterViewInit (default)

#### Section: ng-template, ng-container, ngTemplateOutlet

`ng-template` — defines a template block that Angular doesn't render until used. Used in *ngIf else, *ngFor, custom structural directives.

`ng-container` — a grouping element that renders nothing in DOM. Use to apply structural directives without adding extra elements.

`ngTemplateOutlet` — renders a template reference programmatically. Use for reusable template slots, dynamic templates.

#### Section: Decorators reference

`@Input()` — receive data from parent. `@Input({ required: true })` (Angular 16+). `@Input({ transform: ... })`.
`@Output()` — emit events to parent via EventEmitter.
`@HostListener('click', ['$event'])` — listen to host element events.
`@HostBinding('class.active')` — bind to host element properties.

**Q&A (6 questions) + Quiz (5 questions)**

---

### rxjs.html — RxJS (MOST DETAILED PAGE)

#### Section: What is an Observable

Definition: a lazy push-based data stream that can emit zero or more values over time and then complete or error.

Three callback types: `next(value)`, `error(err)`, `complete()`.

Observer pattern vs Observable.

`subscribe()` — activates the Observable, returns Subscription.
`unsubscribe()` — stops execution, releases resources.

#### Section: Cold vs Hot Observables

**Cold Observable** — definition: the data producer is created INSIDE the Observable. Each subscriber gets its own independent execution. Does not start until subscribed.
Example: `this.http.get('/api')` — each subscription = new HTTP request.

**Hot Observable** — definition: the data producer exists OUTSIDE the Observable. All subscribers share the same execution. Emits regardless of subscribers.
Example: WebSocket connection, mouse events, `Subject`.

Code showing the difference. Trading platform: quotes WebSocket is hot — one connection, many subscribers.

#### Section: Subject Types (ALL FOUR)

**Subject:**
Definition: an Observable that is also an Observer. Multicasts to multiple subscribers. No initial value. New subscribers miss values emitted before they subscribed.

```ts
const s = new Subject<number>();
s.subscribe((v) => console.log("A:", v));
s.next(1); // A: 1
s.subscribe((v) => console.log("B:", v)); // B misses 1
s.next(2); // A: 2, B: 2
```

**BehaviorSubject(initialValue):**
Definition: a Subject that always stores the current value. New subscribers immediately receive the current value. Requires an initial value.

```ts
const bs = new BehaviorSubject<number>(0);
bs.subscribe((v) => console.log("A:", v)); // A: 0
bs.next(5); // A: 5
bs.subscribe((v) => console.log("B:", v)); // B: 5 (gets current)
bs.next(10); // A: 10, B: 10
```

Use: shared state, current user, selected instrument price.

**ReplaySubject(bufferSize):**
Definition: a Subject that buffers N last emitted values and replays them to new subscribers.

```ts
const rs = new ReplaySubject<number>(3); // buffer last 3
rs.next(1);
rs.next(2);
rs.next(3);
rs.next(4);
rs.subscribe((v) => console.log(v)); // 2, 3, 4 (last 3)
```

Use: audit log, recent N ticks, joining late subscriber.

**AsyncSubject:**
Definition: emits ONLY the last value, and only when `complete()` is called. Subscribers after complete still get the last value.
Use: HTTP-like behavior, one-shot operations.

Full comparison table: Subject | BehaviorSubject | ReplaySubject | AsyncSubject → [Has initial value | Replays to new subscribers | When emits | Use case]

#### Section: pipe() — How it works

Definition: `pipe()` is a method on Observable that takes operators as arguments and applies them left-to-right as a function composition chain. Each operator receives an Observable and returns a new Observable. The original Observable is never mutated.

```ts
// pipe(f, g, h) is equivalent to: h(g(f(source$)))
source$.pipe(
  debounceTime(300), // 1st: wait 300ms silence
  distinctUntilChanged(), // 2nd: skip if same value
  filter((v) => v.length > 1), // 3rd: skip short strings
  switchMap((v) => search(v)), // 4th: cancel prev, new request
  takeUntilDestroyed(), // 5th: auto-unsubscribe
);
```

Reusable pipe chains using standalone `pipe()` function from 'rxjs':

```ts
import { pipe } from 'rxjs';
const searchPipeline = pipe(
  debounceTime(300),
  distinctUntilChanged(),
  filter((s: string) => s.length > 1)
);
// Apply to multiple streams:
symbolSearch$.pipe(searchPipeline, switchMap(searchSymbols)).subscribe(...);
nameSearch$.pipe(searchPipeline, switchMap(searchNames)).subscribe(...);
```

#### Section: Creation Operators (each with definition + example)

`of(...values)` — emits values synchronously then completes. Use: wrap static values into stream.
`from(iterable|promise|observable)` — converts array/Promise/iterable to Observable. Use: convert Promise to Observable.
`fromEvent(target, event)` — creates Observable from DOM event. Use: click, keyup, scroll.
`interval(ms)` — emits incrementing numbers every N ms. Use: polling.
`timer(delay, interval?)` — emits after delay, optionally repeating. Use: delayed start + polling.
`EMPTY` — completes immediately, no values. Use: short-circuit.
`NEVER` — never completes or emits. Use: testing.
`throwError(() => err)` — emits error immediately. Use: error factories.
`defer(() => obs)` — creates Observable lazily per subscription. Use: different logic per subscriber.
`merge(...observables)` — merges multiple observables, emits from all concurrently.
`concat(...observables)` — subscribes sequentially, waits for complete before next.
`combineLatest([...])` — emits when ALL have emitted, uses latest from each.
`forkJoin([...])` — waits for ALL to complete, emits last value from each.
`zip([...])` — emits arrays pairing nth values from all sources.

#### Section: Transformation Operators (each with definition + example)

`map(fn)` — definition: transforms each emitted value by applying a function. Like Array.map but for streams. Does NOT subscribe to inner observables.

`switchMap(fn)` — definition: maps each value to an Observable, subscribes to it, and **cancels the previous inner Observable** when a new value arrives. Only the most recent inner Observable is active.
When: search autocomplete, route changes, any "cancel previous request" scenario.
Pitfall: do NOT use for parallel independent requests — some will be cancelled.

`mergeMap(fn)` — definition: maps each value to an Observable and **merges all inner Observables concurrently**. All inner subscriptions run in parallel.
When: independent parallel requests (upload multiple files).
Pitfall: order of results NOT guaranteed. Can cause race conditions.

`concatMap(fn)` — definition: maps each value to an Observable and subscribes **sequentially** — waits for previous to complete before subscribing to next.
When: order matters (sequential API calls, ordered queue of operations).
Pitfall: if inner Observable never completes, queue freezes.

`exhaustMap(fn)` — definition: maps to inner Observable, **ignores new source values while inner is still active**. First wins, rest are discarded.
When: form submit button (prevent double submit), login request.
Pitfall: missed values — use only when "ignore if busy" is intentional.

Giant comparison table:
| Operator | Cancels previous? | Parallel? | Sequential? | Ignores new? | FinTech use |
|---|---|---|---|---|---|
| switchMap | ✅ | ❌ | ❌ | ❌ | Instrument search |
| mergeMap | ❌ | ✅ | ❌ | ❌ | Upload N files |
| concatMap | ❌ | ❌ | ✅ | ❌ | Queue orders |
| exhaustMap | ❌ | ❌ | ❌ | ✅ | Submit button |

`scan(fn, seed)` — definition: like reduce but emits intermediate accumulations after each value. Use: running total, accumulating price ticks, maintaining history buffer.

```ts
// Keep last 100 price ticks as history
priceUpdates$.pipe(
  scan((history, price) => [...history, price].slice(-100), [] as number[]),
);
// Running P&L
trades$.pipe(scan((total, trade) => total + trade.pnl, 0));
```

`buffer(signal$)` — definition: collects values into arrays, emits array when signal$ emits. Use: batch quotes.
`bufferTime(ms)` — definition: collects values for N ms, emits array. Use: batch UI updates every 100ms.
`pairwise()` — definition: emits [previous, current] pairs. Use: detect price direction (up/down arrow).
`groupBy(keyFn)` — definition: splits stream into sub-streams by key. Use: group orders by symbol.
`expand(fn)` — definition: recursively projects each result back to source. Use: pagination "load more".

#### Section: Filtering Operators (each with definition + example)

`filter(fn)` — passes only values that satisfy predicate.
`take(n)` — completes after N values.
`takeUntil(notifier$)` — completes when notifier$ emits.
`takeWhile(fn)` — completes when fn returns false.
`takeUntilDestroyed(destroyRef?)` — Angular 16+, completes when component destroyed. Must be called in injection context.
`skip(n)` — skips first N values.
`skipUntil(notifier$)` — skips until notifier$ emits.
`debounceTime(ms)` — definition: waits N ms of silence, emits last value. Resets timer on each new value. Use: search input, resize events.
`throttleTime(ms)` — definition: emits first value, ignores rest for N ms. Use: scroll events, price update rate limiting.
`distinctUntilChanged(compareFn?)` — definition: skips emission if value equals previous. Use: don't re-render if price unchanged.
`first(fn?)` — emits first (matching) value then completes.
`last(fn?)` — emits last value before complete.
`elementAt(n)` — emits value at index n.

#### Section: Combination Operators

`combineLatest([a$, b$])` — emits array of LATEST values from all when ANY emits. All must have emitted at least once.
`forkJoin([a$, b$])` — emits array of LAST values when ALL complete.
`zip([a$, b$])` — emits paired arrays of nth values from each source.
`withLatestFrom(other$)` — combines source with latest value from other$ without subscribing to other$.
`startWith(value)` — prepends value to stream.

Full table comparing combineLatest vs forkJoin vs zip:
| | combineLatest | forkJoin | zip |
|---|---|---|---|
| When emits | On any new value | After all complete | After each source emits nth |
| Requires complete | ❌ | ✅ | ❌ |
| Use case | Live filters | Parallel HTTP | Pair-by-pair |

#### Section: Error Handling

`catchError(fn)` — definition: intercepts an error, returns a new Observable to continue the stream.

```ts
obs$.pipe(
  catchError((err) => {
    console.error(err);
    return of(defaultValue); // continue with fallback
    // OR: return throwError(() => err); // rethrow
  }),
);
```

`retry(count)` — definition: resubscribes on error N times before propagating error.
`retryWhen(fn)` — definition: resubscribes based on notifier Observable (deprecated in RxJS 7, prefer retry with delay config).
`retry({ count: 3, delay: 2000 })` — modern retry with delay.

#### Section: Utility Operators

`tap(fn)` — definition: performs side effects (logging, updating external state) WITHOUT modifying the stream. Does NOT change values.
`delay(ms)` — definition: delays each emission by N ms.
`timeout(ms)` — definition: errors if no emission within N ms.
`finalize(fn)` — definition: runs callback when Observable completes OR errors. Use: hide loading spinner.
`shareReplay(1)` — definition: multicasts Observable and replays last N values to new subscribers. Use: HTTP requests shared between components (prevents duplicate calls).
`share()` — multicasts without replay.

#### Section: firstValueFrom / lastValueFrom

`firstValueFrom(obs$)` — definition: converts an Observable to a Promise that resolves with the first emitted value, then auto-unsubscribes. Throws `EmptyError` if Observable completes without emitting.
Replaces deprecated `.toPromise()`.

`lastValueFrom(obs$)` — definition: converts Observable to Promise resolving with the last emitted value after complete(). Use when you need the final result.

When to use:

- Inside Guards and Resolvers that need `async/await` style
- Mixing Observable-based services with async/await code
- One-time reads when subscribe overhead is unnecessary

```ts
// In a Guard with async/await
export const authGuard: CanActivateFn = async () => {
  const isAuth = await firstValueFrom(inject(AuthService).isAuthenticated$);
  return isAuth ? true : inject(Router).createUrlTree(["/login"]);
};

// In a Resolver
export const instrumentResolver: ResolveFn<Instrument> = (route) =>
  inject(InstrumentService).getOne(route.params["symbol"]);
// OR with firstValueFrom when mixing:
// const data = await firstValueFrom(service.getOne(id));
```

Comparison table:
| Method | Returns | Auto-unsubscribes | Throws if empty |
|---|---|---|---|
| `firstValueFrom` | First value | ✅ | ✅ EmptyError |
| `lastValueFrom` | Last value | ✅ | ✅ EmptyError |
| `.toPromise()` | Last value | ✅ | ❌ (returns undefined) |
| `.subscribe()` | Subscription | ❌ must manual | N/A |

#### Section: Memory Leaks

Definition: a subscription that is never unsubscribed continues to hold memory and execute callbacks even after the component is destroyed.

4 approaches with code + comparison:

1. `takeUntil(destroy$)` — classic, works everywhere
2. `takeUntilDestroyed(destroyRef)` — Angular 16+, cleaner
3. `async pipe` in template — **BEST** — Angular manages subscription lifecycle automatically
4. Manual `unsubscribe()` — fragile, easy to forget

**async pipe** — definition: subscribes to Observable in template, displays emitted values, automatically unsubscribes on component destroy, triggers CD on new value with OnPush.

**Q&A (8 questions) + Quiz (5 questions)**

---

### signals.html — Angular Signals

#### Section: What are Signals

Definition: a reactive primitive that holds a value and notifies consumers when it changes. Synchronous — always has a current value. Introduced in Angular 16.

Why signals: simpler than RxJS for local component state, no subscription management, fine-grained reactivity, future of Angular change detection.

#### Section: Core API (each with full definition + example)

`signal<T>(initialValue)` — creates a writable signal.

- `.set(newValue)` — replaces value
- `.update(fn)` — updates based on current value
- `.mutate(fn)` — mutates internal value (arrays/objects) — deprecated in newer versions
- Calling the signal as a function `price()` — reads current value

`computed(fn)` — definition: creates a READ-ONLY signal that derives its value from other signals. Automatically tracks dependencies. Memoized — only recalculates when dependencies change.

```ts
const price = signal(100);
const tax = signal(0.2);
const total = computed(() => price() * (1 + tax()));
// total() == 120, recalculates only when price or tax changes
```

`effect(fn)` — definition: runs a side effect whenever any signals read inside it change. Runs after render. Returns cleanup function.

```ts
// Basic effect — auto-tracks all signals read inside
effect(() => {
  console.log("Price changed to:", price()); // tracks price
});

// With cleanup function
effect((onCleanup) => {
  const timer = setInterval(() => refresh(), 1000);
  onCleanup(() => clearInterval(timer)); // runs before next effect execution
});

// allowSignalWrites option — needed when writing signals inside effect
effect(
  () => {
    if (price() > 2.0) {
      alertSignal.set(true); // writing a signal inside effect
    }
  },
  { allowSignalWrites: true },
);

// untracked() — read signal without creating dependency
effect(() => {
  const current = price(); // tracked
  const config = untracked(() => configSignal()); // NOT tracked
  doSomething(current, config);
});
```

Pitfall: setting a signal inside effect without `allowSignalWrites` throws an error. Setting a signal that effect also reads creates infinite loop.

`toSignal(observable$)` — definition: converts an Observable to a Signal. Must be called in injection context. Returns a readonly Signal.

```ts
const quotes = toSignal(this.ws.quotes$, { initialValue: [] });
```

`toObservable(signal)` — definition: converts a Signal to an Observable. Emits new value whenever signal changes.

`input()` — Angular 17+: declare @Input as signal. `readonly name = input<string>()`. `input.required<string>()`.

`model()` — Angular 17+: two-way binding signal. Replaces @Input + @Output pattern for two-way.

`linkedSignal()` — Angular 19+: creates a signal linked to another with optional transform.

#### Section: Signals vs RxJS Decision Table

| Scenario                        | Use Signals       | Use RxJS             |
| ------------------------------- | ----------------- | -------------------- |
| Component local state           | ✅                | over-engineered      |
| HTTP request                    | ❌                | ✅                   |
| WebSocket stream                | ❌                | ✅                   |
| Derived/computed value          | ✅                | possible but verbose |
| Shared state between components | signals + service | BehaviorSubject      |
| Complex async flows             | ❌                | ✅                   |
| Simple counter / toggle         | ✅                | over-engineered      |

#### Section: Signals + NgRx

`@ngrx/signals` — SignalStore. Modern alternative to classic NgRx for state with Signals.

```ts
const OrderStore = signalStore(
  withState<OrderState>({ orders: [], loading: false }),
  withMethods((store) => ({
    loadOrders: rxMethod<void>(
      pipe(
        switchMap(() => inject(OrderService).getOrders()),
        tap((orders) => patchState(store, { orders })),
      ),
    ),
  })),
);
```

**Q&A (5 questions) + Quiz (4 questions)**

---

### di.html — Dependency Injection

#### Section: How DI Works

Angular builds an injector tree that mirrors the component tree. When a class requests a dependency, Angular walks up the tree to find the nearest provider.

Injector hierarchy (top to bottom):

1. Platform Injector — platform-level singletons
2. Root Injector — `providedIn: 'root'` — one instance for entire app
3. Module Injector — provided in `@NgModule.providers`
4. Component Injector — provided in `@Component.providers` — new instance per component subtree
5. Element Injector — `@Directive.providers`

#### Section: providedIn Options

`providedIn: 'root'` — singleton, tree-shakeable, available everywhere
`providedIn: 'platform'` — shared across multiple Angular apps on same page
`providedIn: 'any'` — separate instance per lazy-loaded module
`providedIn: MyModule` — only available where MyModule is imported

#### Section: Provider Types (each with definition + example)

`useClass` — creates new instance of specified class
`useValue` — uses exact value as-is (config objects, constants)
`useFactory` — calls factory function, can inject dependencies via `deps`
`useExisting` — alias to another token, does NOT create new instance

`multi: true` — allows multiple providers for same token (used for interceptors, validators)

#### Section: InjectionToken

Definition: a typed, unique token for non-class dependencies (primitives, config objects, interfaces). Avoids string key collision with third-party libraries.

```ts
export const API_URL = new InjectionToken<string>('API_URL');
// Provider:
{ provide: API_URL, useValue: 'https://api.trading.com' }
// Inject (modern):
private readonly apiUrl = inject(API_URL);
// Inject (constructor):
constructor(@Inject(API_URL) private apiUrl: string) {}
```

Token with factory default (no providers[] needed):

```ts
export const FEATURE_FLAGS = new InjectionToken<FeatureFlags>("FeatureFlags", {
  providedIn: "root",
  factory: () => ({ darkMode: false, betaFeatures: false }),
});
```

Why not string tokens: risk of collision with third-party libraries.

#### Section: DI Decorators (@Self, @SkipSelf, @Optional, @Host)

Each with: definition + code example + when to use.

`@Self()` — look only in current component's injector, throw if not found
`@SkipSelf()` — skip current injector, start from parent
`@Optional()` — return null if not found instead of throwing
`@Host()` — look in host component (for directives in components)

#### Section: inject() function vs constructor

`inject()` — Angular 14+, can be used in constructor, field initializer, and factory functions. Cleaner for standalone.
Constructor injection — classic, works everywhere, required for inherited classes.

`inject()` must be called in injection context (constructor, field initializer, `runInInjectionContext`).

**Q&A (5 questions) + Quiz (4 questions)**

---

### routing.html — Router

#### Section: Configuration

`RouterModule.forRoot(routes)` — root app, once only, creates Router service.
`RouterModule.forChild(routes)` — feature modules.
`provideRouter(routes)` — standalone app bootstrap (modern).

Route properties:
`path`, `component`, `loadChildren`, `loadComponent`, `children`, `redirectTo`, `pathMatch`, `data`, `resolve`, `canActivate`, `canActivateChild`, `canDeactivate`, `canLoad`, `canMatch`, `outlet`, `title`

#### Section: Navigation

`[routerLink]="['/orders', id]"` — template navigation.
`routerLinkActive="active-class"` — add class when route active.

`this.router.navigate(['/orders', id])` — programmatic navigation.
`this.router.navigate(['../sibling'], { relativeTo: this.route })` — relative.
`this.router.navigateByUrl('/orders/123')` — by full URL string.

Navigation options: `queryParams`, `fragment`, `replaceUrl`, `skipLocationChange`, `queryParamsHandling`.

#### Section: ActivatedRoute

`this.route.params` — Observable of path params
`this.route.queryParams` — Observable of query params
`this.route.data` — Observable of static and resolved data
`this.route.snapshot.params` — sync snapshot (use carefully)
`ActivatedRouteSnapshot` — immutable snapshot of route state at a moment in time.

#### Section: Lazy Loading

`loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule)` — module-based
`loadComponent: () => import('./page.component').then(c => c.PageComponent)` — standalone

Preloading strategies:

- `NoPreloading` — default, load only when navigated to
- `PreloadAllModules` — preload all lazy modules after initial load
- Custom preloading strategy — based on route data flag

#### Section: Guards (each with definition + example)

`canActivate` — definition: prevents navigation TO route. Returns boolean or UrlTree (redirect).
`canActivateChild` — same but for child routes.
`canDeactivate` — definition: prevents navigation AWAY from route. Use for unsaved form warning.
`canLoad` / `canMatch` — definition: prevents lazy module from loading.
`resolve` — definition: pre-fetches data before component activates. Route waits until Observable completes.

Functional guards (Angular 14+): `canActivate: [() => inject(AuthService).isLoggedIn()]`

#### Section: Router Events

Full list: NavigationStart, RoutesRecognized, RouteConfigLoadStart, RouteConfigLoadEnd, NavigationEnd, NavigationCancel, NavigationError, ActivationEnd — each with brief definition.

#### Section: BreakpointObserver

Definition: an Angular CDK service that reactively observes media query breakpoints. Returns an Observable that emits whenever the breakpoint state changes.

```ts
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({...})
export class LayoutComponent {
  private bp = inject(BreakpointObserver);

  isMobile$ = this.bp.observe([Breakpoints.Handset]).pipe(
    map(result => result.matches),
    takeUntilDestroyed()
  );

  // Multiple breakpoints with named result:
  layout$ = this.bp.observe(['(max-width: 768px)', '(min-width: 1400px)']).pipe(
    map(r => ({
      isMobile: r.breakpoints['(max-width: 768px)'],
      isWide:   r.breakpoints['(min-width: 1400px)']
    }))
  );
}
```

Built-in Breakpoints constants: `Breakpoints.Handset`, `Breakpoints.Tablet`, `Breakpoints.Web`, `Breakpoints.HandsetPortrait`, `Breakpoints.XSmall`, `Breakpoints.Small`, `Breakpoints.Medium`, `Breakpoints.Large`, `Breakpoints.XLarge`.

**Q&A (5 questions) + Quiz (4 questions)**

---

### forms.html — Angular Forms

#### Section: Template-driven vs Reactive (comparison table)

|             | Template-driven        | Reactive                    |
| ----------- | ---------------------- | --------------------------- |
| Setup       | Implicit via ngModel   | Explicit FormGroup in class |
| Validation  | Attributes in template | Validators array in class   |
| Testing     | Harder (needs DOM)     | Easier (pure TS)            |
| Scalability | Simple forms           | Complex, dynamic forms      |
| Sync/Async  | Async (tick required)  | Sync                        |

#### Section: Reactive Forms (DETAILED)

`FormControl` — definition: tracks value and validity of a single form field.
`FormGroup` — definition: tracks value and validity of a group of FormControls as an object.
`FormArray` — definition: tracks value and validity of an array of FormControls (dynamic fields).
`FormBuilder` — definition: shorthand service for creating FormGroup/FormControl/FormArray.

`setValue(obj)` — sets ALL fields, must provide complete object.
`patchValue(partial)` — sets SOME fields, partial update.
`getRawValue()` — gets all values including disabled fields.
`reset()` — resets to initial state.

Built-in Validators: `required`, `minLength`, `maxLength`, `min`, `max`, `email`, `pattern`, `requiredTrue`, `nullValidator`

Custom validator:

```ts
function positiveNumber(control: AbstractControl): ValidationErrors | null {
  return control.value > 0 ? null : { notPositive: true };
}
```

Custom async validator (checks server):

```ts
function uniqueEmail(service: UserService) {
  return (control: AbstractControl): Observable<ValidationErrors | null> =>
    service.checkEmail(control.value).pipe(
      map((taken) => (taken ? { emailTaken: true } : null)),
      catchError(() => of(null)),
    );
}
```

`valueChanges` — Observable that emits on every value change.
`statusChanges` — Observable that emits on every status change (VALID/INVALID/PENDING).

Cross-field validation (example: password + confirm password).

Dynamic FormArray (add/remove fields at runtime).

**Q&A (5 questions) + Quiz (4 questions)**

---

### http.html — HTTP & Interceptors

#### Section: HTTP Methods Table

| Method  | Definition                | Has Body | Idempotent | Safe |
| ------- | ------------------------- | -------- | ---------- | ---- |
| GET     | Retrieve resource         | ❌       | ✅         | ✅   |
| POST    | Create resource           | ✅       | ❌         | ❌   |
| PUT     | Replace resource entirely | ✅       | ✅         | ❌   |
| PATCH   | Partially update resource | ✅       | ❌         | ❌   |
| DELETE  | Remove resource           | optional | ✅         | ❌   |
| HEAD    | Like GET but no body      | ❌       | ✅         | ✅   |
| OPTIONS | Get allowed methods       | ❌       | ✅         | ✅   |

**Idempotent** definition: calling the same request multiple times has the same result as calling once.
**Safe** definition: does not modify server state.

#### Section: HttpClient

Each method with definition + TypeScript example:
`get<T>`, `post<T>`, `put<T>`, `patch<T>`, `delete<T>`

`HttpParams` — building query parameters.
`HttpHeaders` — request headers.
`observe: 'response'` — get full HttpResponse with status, headers.
`observe: 'events'` — get all HTTP events (upload progress etc).
`responseType: 'blob'` — for file downloads.

#### Section: Interceptors (DETAILED)

Definition: a class that intercepts all outgoing HttpRequests and incoming responses, allowing modification before they reach the application code.

Why `req.clone()`: HttpRequest is IMMUTABLE — you cannot modify it directly, must create a copy.

Auth interceptor (full, no any, generics):

```ts
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept<T>(
    req: HttpRequest<T>,
    next: HttpHandler,
  ): Observable<HttpEvent<T>> {
    const token = localStorage.getItem("token");
    const cloned = token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;
    return next.handle(cloned);
  }
}
```

Error interceptor with 401 redirect.
Loading interceptor (show/hide global loader).
Logger interceptor (timing requests).

Order of execution: registration order for requests (top-down), reverse for responses.

Functional interceptors (Angular 15+):

```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  return next(req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }));
};
```

CRITICAL rules:

- Never `subscribe()` inside interceptor — only `.pipe()`
- Always `return next.handle(cloned)` — missing return breaks entire HTTP pipeline
- `req.clone()` is the only way to modify request

**Q&A (5 questions) + Quiz (4 questions)**

---

### ngrx.html — NgRx

#### Section: What is NgRx and When to Use

Definition: a reactive state management library for Angular, based on Redux pattern — unidirectional data flow, immutable state, pure functions.

When to use:

- ✅ Complex state shared across many components
- ✅ Large teams (predictability + DevTools)
- ✅ Complex async flows with optimistic updates
- ❌ Small apps — BehaviorSubject or Signals suffice

#### Section: Core Concepts

**Action** — definition: a plain object with a `type` string that describes what happened. Optionally carries data (props).

```ts
export const loadOrders = createAction("[Orders] Load");
export const loadOrdersSuccess = createAction(
  "[Orders] Load Success",
  props<{ orders: Order[] }>(),
);
export const loadOrdersFailure = createAction(
  "[Orders] Load Failure",
  props<{ error: string }>(),
);
```

**Reducer** — definition: a pure function `(state, action) => newState` that describes how state changes. MUST NOT have side effects. MUST return new object (never mutate state).

```ts
export const ordersReducer = createReducer(
  initialState,
  on(loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    orders,
    loading: false,
  })),
  on(loadOrdersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
);
```

**Store** — definition: the single immutable state tree. Components read from it, never modify directly.

```ts
// Read:
orders$ = this.store.select(selectAllOrders);
// Write:
this.store.dispatch(loadOrders());
```

**Selector** — definition: a memoized function that extracts a slice of state. Recalculates only when its input changes.

```ts
export const selectOrdersState = createFeatureSelector<OrdersState>("orders");
export const selectAllOrders = createSelector(
  selectOrdersState,
  (s) => s.orders,
);
export const selectPendingOrders = createSelector(selectAllOrders, (orders) =>
  orders.filter((o) => o.status === "pending"),
);
```

**Effect** — definition: handles side effects (HTTP, WebSocket, navigation) triggered by actions. Actions in → Actions out.

```ts
loadOrders$ = createEffect(() =>
  this.actions$.pipe(
    ofType(loadOrders),
    switchMap(() =>
      this.orderService.getAll().pipe(
        map((orders) => loadOrdersSuccess({ orders })),
        catchError((error) => of(loadOrdersFailure({ error: error.message }))),
      ),
    ),
  ),
);
```

#### Section: Data Flow Diagram (text-based)

Component dispatches Action → Effect handles async → dispatches Success/Failure Action → Reducer updates State → Selector derives data → Component re-renders.

#### Section: Feature State Folder Structure

Show the recommended folder layout for a feature slice:

```
features/orders/
├── state/
│   ├── orders.actions.ts     ← createAction definitions
│   ├── orders.reducer.ts     ← createReducer + initialState
│   ├── orders.effects.ts     ← createEffect definitions
│   ├── orders.selectors.ts   ← createSelector definitions
│   └── orders.state.ts       ← state interface + initialState
├── orders.component.ts
└── orders.module.ts (or orders.routes.ts for standalone)
```

Registration in module/config:

```ts
// Standalone app:
provideStore({ orders: ordersReducer }),
provideEffects([OrdersEffects]),
// Or lazy:
provideState('orders', ordersReducer),
provideEffects([OrdersEffects]),
```

#### Section: EntityAdapter

Definition: a utility for managing normalized collections (arrays of objects with IDs) in NgRx. Provides CRUD operations without boilerplate.
`getInitialState()`, `addOne()`, `addMany()`, `setAll()`, `updateOne()`, `removeOne()`, `getSelectors()`.

#### Section: @ngrx/signals (SignalStore)

Modern alternative using Angular Signals. `withState`, `withComputed`, `withMethods`.

**Q&A (5 questions) + Quiz (4 questions)**

---

### websocket.html — WebSocket

#### Section: WebSocket Fundamentals

Definition: a protocol providing full-duplex communication over a single TCP connection. Unlike HTTP (request-response), WebSocket maintains persistent connection — both client and server can send data at any time.

States: CONNECTING (0), OPEN (1), CLOSING (2), CLOSED (3).

Native WebSocket API:

```ts
const ws = new WebSocket("wss://trading.server.com/stream");
ws.onopen = () => {
  /* connection ready */
};
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
};
ws.onclose = (event) => {
  /* event.code, event.reason */
};
ws.onerror = (error) => {
  /* handle */
};
ws.send(JSON.stringify({ action: "subscribe", symbol: "BTCUSD" }));
ws.close();
```

#### Section: RxJS webSocket()

Definition: RxJS Subject wrapping WebSocket, providing Observable interface for messages and Observer interface for sending.

```ts
import { webSocket, WebSocketSubject } from "rxjs/webSocket";

const connection$ = webSocket<TradeEvent>("wss://trading.server.com/stream");
// Send:
connection$.next({ action: "subscribe", symbol: "EURUSD" });
// Receive:
connection$
  .pipe(retryWhen((errors) => errors.pipe(delay(3000))))
  .subscribe((event) => this.handleEvent(event));
```

#### Section: Reconnection Service

Full production-ready WebSocket service with:

- Automatic reconnection with exponential backoff
- Subscription management
- Type-safe message handling
- takeUntilDestroyed cleanup

#### Section: Performance for 20k Instruments

`bufferTime(100)` — batch updates every 100ms instead of each tick
`throttleTime(50, asyncScheduler, { leading: true, trailing: true })` — rate-limit per symbol
`distinctUntilChanged((a, b) => a.price === b.price)` — skip if price unchanged
Virtual scroll — only render visible rows
WebWorker — process/calculate indicators off main thread

**ngZone.runOutsideAngular()** — definition: runs code outside Angular's Zone.js patch, preventing Change Detection from triggering on every WebSocket message. Call `ngZone.run()` only when you actually need to update the UI.

```ts
constructor(private ngZone: NgZone) {}

ngOnInit() {
  this.ngZone.runOutsideAngular(() => {
    // WS tick handler runs here — no CD triggered
    this.ws.quotes$.subscribe(quote => {
      this.latestQuotes.set(quote.symbol, quote); // update Map (no CD)
      if (this.shouldUpdateUI(quote)) {
        this.ngZone.run(() => {
          this.displayQuote = quote; // THIS triggers CD
        });
      }
    });
  });
}
```

**Q&A (5 questions) + Quiz (4 questions)**

---

### canvas.html — Canvas API

#### Section: Canvas vs SVG vs WebGL

|                          | Canvas                 | SVG           | WebGL              |
| ------------------------ | ---------------------- | ------------- | ------------------ |
| Type                     | Raster (pixels)        | Vector        | GPU-accelerated 3D |
| DOM interaction          | ❌ (pixels)            | ✅ (elements) | ❌                 |
| Performance (many items) | ✅                     | ❌ (DOM)      | ✅✅               |
| Animation                | requestAnimationFrame  | CSS/SMIL      | ✅✅               |
| Use in trading           | Price charts, heatmaps | Simple icons  | 3D visualization   |

#### Section: Canvas API Basics

Getting context, drawing primitives, text, images.

`fillRect`, `strokeRect`, `clearRect`, `beginPath`, `moveTo`, `lineTo`, `arc`, `quadraticCurveTo`, `bezierCurveTo`, `fill`, `stroke`, `fillText`, `strokeText`, `drawImage`.

Coordinate system explanation (0,0 top-left).

Transformations: `translate`, `rotate`, `scale`, `save`, `restore`.

#### Section: Candlestick Chart

Full implementation: price scale, time axis, drawing candles, wick, volume bars. Color based on open/close comparison.

#### Section: Performance

`requestAnimationFrame` — definition: schedules animation callback on next browser repaint, ~60fps. Prefer over setTimeout for animations.

Dirty rendering — only redraw changed areas using `clearRect` on dirty regions.

`devicePixelRatio` — multiply canvas size for sharp rendering on Retina.

OffscreenCanvas — render in WebWorker, transfer to main thread.

**Q&A (4 questions) + Quiz (3 questions)**

---

### workers.html — ServiceWorker & WebWorker

#### Section: Comparison Table

|                     | ServiceWorker                  | WebWorker              |
| ------------------- | ------------------------------ | ---------------------- |
| Purpose             | Network proxy, caching         | CPU-heavy computations |
| Access to DOM       | ❌                             | ❌                     |
| Lifecycle           | Independent of page            | Tied to page           |
| Use in trading      | Cache instrument data, offline | Calculate RSI/MACD     |
| Angular integration | @angular/service-worker        | new Worker()           |

#### Section: ServiceWorker in Angular

Setup, `ngsw-config.json`, cache strategies: `performance` (cache-first), `freshness` (network-first).
Update flow, SwUpdate service for version prompts.

#### Section: WebWorker in Angular

Full example: trading indicator calculation (RSI) in worker. postMessage protocol. Error handling. Terminate on destroy.

`angular generate web-worker` CLI command.

**Q&A (4 questions) + Quiz (3 questions)**

---

### architecture.html — Architecture & Patterns

#### Section: Smart vs Dumb Components

Smart (Container): knows about state/services, dispatches actions, passes data down.
Dumb (Presentational): only @Input/@Output, pure rendering, reusable.

#### Section: MVVM in Angular

Definition: Model-View-ViewModel — architectural pattern separating UI from business logic.

- **Model** — data and business logic (services, interfaces)
- **View** — template (HTML)
- **ViewModel** — component class (binds Model to View via data binding)

Angular is naturally MVVM: the component class IS the ViewModel. Two-way binding (`[(ngModel)]`) is the MVVM sync mechanism. Explain how this differs from MVC.

#### Section: Feature/Core/Shared Structure

```
src/app/
├── core/           ← singletons (auth, http interceptors, guards)
├── shared/         ← reusable components, pipes, directives
├── features/
│   ├── orders/     ← orders feature module
│   └── charts/     ← charts feature module
└── app.module.ts
```

#### Section: GOF Patterns in Angular

For each pattern: definition + how it appears in Angular + code snippet.

- **Observer** — RxJS Observable/Subject. Subscribers react to events without knowing emitters.
- **Factory** — Angular DI with `useFactory`. Create objects without specifying exact class.
- **Decorator** — `@Component`, `@Injectable`, `@Pipe`. Adds metadata/behavior to class without modifying it.
- **Strategy** — `ChangeDetectionStrategy`. Algorithm (CD behavior) selected at configuration time.
- **Command** — NgRx Actions. Encapsulated operations with type + payload, replayable.
- **Proxy** — `HttpInterceptor`. Intercepts and modifies requests transparently.
- **Chain of Responsibility** — HTTP interceptor chain. Each interceptor processes request and passes to next.
- **Singleton** — `providedIn: 'root'`. One shared instance throughout app.
- **Template Method** — Lifecycle hooks. Framework defines the algorithm (lifecycle), component overrides steps.
- **Facade** — see next section.

#### Section: OOP Principles in Angular

**Encapsulation** — `private`/`protected` service properties, exposing only public API. Example: `private quotes$ = new BehaviorSubject(...)` — internal state hidden, only `getQuotes()` is public.

**Abstraction** — interfaces as contracts. `IOrderRepository` interface — components depend on abstraction, not concrete `HttpOrderService`.

**Inheritance** — `extends` for base components/services. Example: `BaseChartComponent` with shared canvas setup, extended by `CandlestickComponent` and `LineChartComponent`.

**Polymorphism** — multiple components implementing same interface, used interchangeably. Example: different chart types all implementing `IChart { render(data): void }`.

#### Section: Facade Pattern

Definition: a service that wraps complex state management (NgRx store) and exposes a simple API to components. Components only talk to facade, not directly to store.

Full example with OrderFacade wrapping store.

#### Section: Repository Pattern

Definition: abstracts data access behind an interface. Components use IOrderRepository, not concrete HTTP service. Swap implementation without changing consumers.

#### Section: Barrel Exports (index.ts)

Definition: `index.ts` files that re-export from a module, providing a clean public API.

#### Section: Monorepo with Nx

Brief overview: workspace, apps, libs. `nx generate`, `nx build`, `nx affected`. Why for enterprise Angular.

**Q&A (5 questions) + Quiz (3 questions)**

---

### solid-dry.html — SOLID, DRY, KISS, YAGNI

For EACH principle:

1. Name + acronym expansion
2. Definition — what it means
3. Problem it solves
4. ❌ Bad Angular code example
5. ✅ Good Angular code example
6. FinTech context note

Principles to cover:

- S — Single Responsibility
- O — Open/Closed
- L — Liskov Substitution
- I — Interface Segregation
- D — Dependency Inversion
- DRY — Don't Repeat Yourself
- KISS — Keep It Simple, Stupid
- YAGNI — You Aren't Gonna Need It
- WET — Write Everything Twice (anti-pattern)

**Q&A (5 questions) + Quiz (4 questions)**

---

### live-coding.html — Live Coding Tasks

Format for each task:

- Problem statement (as interviewers phrase it)
- Hints (collapsible)
- Solution with inline comments
- Time complexity if relevant
- Follow-up questions interviewers ask

Tasks:

1. **Implement debounce** — from scratch, no lodash
2. **Implement throttle** — from scratch
3. **Fix memory leak** — given broken RxJS code, identify and fix
4. **Virtual scroll** — implement with CDK, explain why
5. **WebSocket service** — full reconnect service
6. **Custom pipe** — formatPrice with currency and decimals
7. **Custom validator** — async email uniqueness check
8. **Simple store** — BehaviorSubject-based state service
9. **Flatten nested array** — recursive, iterative, and with flat()
10. **Deep clone** — without structuredClone (recursive)
11. **Find duplicates** — in array of objects by key
12. **Group by key** — array → Record<key, items[]>
13. **Implement Observable from scratch** — understand the mechanism
14. **Auth interceptor** — full with 401 refresh token logic

---

### communication.html — Client Communication

Templates with sample scripts:

- Self-introduction (English + notes for Russian)
- Explaining a technical concept to non-technical stakeholder
- Reporting a task delay
- Proposing a technical solution with tradeoffs
- Handling "why don't you have 5 years experience"
- Explaining technical debt to manager
- Asking clarifying questions before estimating
- How to say no (or push back) professionally

Interview Q&A section with model answers for behavioral questions.

---

### cheatsheet.html — Quick Reference

ONE PAGE. Dense. Printable. Everything needed for 30-minute pre-interview review.

Sections (compact, no explanations — just facts):

1. Array methods — two columns: MUTATES | PURE/NEW
2. RxJS operators quick table: name | one-liner description
3. switchMap vs mergeMap vs concatMap vs exhaustMap — one sentence each
4. Subject types — one sentence each
5. Lifecycle hooks — ordered list with one-word use case
6. OnPush triggers — 4 bullet points
7. Signals API — one-liners
8. DI providers — useClass/useValue/useFactory/useExisting — one line each
9. SOLID — one sentence each
10. Common interview questions — 20 Q&A in compact format
11. HTTP methods — compact table
12. Guard types — one line each
13. Angular 17+ Control Flow — @if/@for/@defer — one line each
14. GOF Patterns in Angular — name | one-liner
15. OOP principles — one line each

Print CSS: `@media print { .sidebar { display: none; } .main-content { margin: 0; } }`

---

## README.md

```markdown
# Senior Angular Interview Prep

Complete reference guide for Senior Angular Developer interviews.
Focus: FinTech, trading platforms, real-time systems.

## Topics Covered

| Section      | Topics                                                                |
| ------------ | --------------------------------------------------------------------- |
| JavaScript   | Objects, arrays, closures, event loop, promises, prototypes           |
| TypeScript   | Generics, utility types, discriminated unions, decorators             |
| Angular      | Lifecycle, CD, DI, standalone, forms, routing, pipes, @if/@for/@defer |
| RxJS         | All operators with definitions, subjects, pipe(), memory leaks        |
| NgRx         | Store, actions, reducers, effects, selectors, signals store           |
| Signals      | signal, computed, effect, toSignal, input, model                      |
| Platform     | WebSocket, Canvas, ServiceWorker, WebWorker                           |
| HTTP         | All methods, interceptors, error handling                             |
| Architecture | MVVM, GOF patterns, OOP, SOLID, DRY, KISS, YAGNI                      |
| Practice     | Live coding tasks + client communication                              |
| Cheatsheet   | Quick reference for pre-interview review                              |

## Usage

Open `index.html` in any browser. No build step required.

## GitHub Pages Deployment

1. Push to GitHub repository
2. Settings → Pages → Deploy from branch → `main` → `/ (root)`
3. Your site will be at `https://[username].github.io/[repo-name]`

## Features

- Dark mode (persists in localStorage)
- Progress tracking (mark topics as done)
- Search within pages
- Interactive Q&A with toggle answers
- Multiple choice quizzes with instant feedback
- Copy code button on all code blocks
- Print-friendly cheatsheet
- Mobile responsive
```

---

## IMPLEMENTATION NOTES FOR CLAUDE CODE

1. Build files in this order: `main.css` → `app.js` → `index.html` → each page file → `README.md`

2. Every code example uses TypeScript with proper types. No `any` unless demonstrating why `any` is bad.

3. Every operator, method, hook, concept gets its own definition paragraph. Never skip definitions.

4. FinTech context throughout: use `Order`, `Quote`, `Instrument`, `Position` as example types. Use trading scenarios (subscribe to symbol, place order, display price).

5. All pages must have working Q&A toggles and quiz functionality via `app.js`.

6. `highlight.js` from CDN for syntax highlighting — no local files needed.

7. Sidebar navigation links must work correctly relative to `../index.html` and `./other-page.html`.

8. No personal names anywhere. This is a public reference guide.

9. Mobile hamburger menu must work.

10. localStorage keys: `done_[pageId]` for progress, `theme` for dark mode.

11. Code blocks must have a "Copy" button in top-right corner.

12. All tables must be responsive (horizontal scroll on mobile).

13. Each page ends with ← Previous | Next → navigation.

14. Every definition starts with the term in bold, followed by an em dash, followed by the definition. Consistent format throughout.

15. All FinTech examples use realistic types: `Quote { symbol, bid, ask, timestamp }`, `Order { id, symbol, side: 'BUY'|'SELL', quantity, price, status }`, `Instrument { symbol, type: 'FOREX'|'STOCK'|'CRYPTO', price, change }`, `Position { symbol, quantity, avgPrice, unrealizedPnl }`.
