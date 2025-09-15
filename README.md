# Image Processing API Udacity Project

A TypeScript/Express API that resizes and caches images on demand.  
Built for Udacity’s Full Stack JavaScript Nanodegree.

---

## Features

- **Resize on the fly** using [Sharp]
- **Disk caching** for faster repeated requests
- **TypeScript** + **ESLint/Prettier** for code quality
- **Unit & integration tests** with Jasmine + SuperTest

---

## Project Structure

```
## Project Structure
image-processing-api/
├─ assets/
│  ├─ source/
│  └─ cache/
├─ spec/support/jasmine.json
├─ src/
│  ├─ app.ts
│  ├─ server.ts
│  ├─ routes/images.ts
│  ├─ middleware/validateQuery.ts
│  └─ lib/resize.ts
├─ tests/
│  ├─ api.spec.ts
│  └─ resize.spec.ts
├─ .eslintrc.cjs
├─ .prettierrc
├─ package.json
└─ tsconfig.json

```

---

## Installation

Clone the repo and install dependencies:

```bash
git clone <the repo link>
cd image-processing-api
npm install
```

---

## Development

Start the dev server with automatic reload:

```bash
npm run dev
```

Open: [http://localhost:3000/](http://localhost:3000/)

---

## Usage

Place at least one **.jpg** file in `assets/source/` (e.g. `fjord.jpg`).

Resize it via:

```
GET /api/images?filename=fjord&width=300&height=200
```

- **filename**: base name of the source file (without extension)
- **width/height**: positive integers (max 4000)

The resized image is cached to `assets/cache/` and served directly on subsequent requests.

---

## Build & Run

Compile TypeScript to JavaScript:

```bash
npm run build
npm start      # runs dist/server.js
```

---

## Testing

Run all Jasmine/SuperTest specs:

```bash
npm test
```

---

## Code Quality & Format

Lint and format the code:

```bash
npm run lint
npm run format
```

---

## Scripts

| Command          | Description                            |
| ---------------- | -------------------------------------- |
| `npm run dev`    | Start development server (ts-node-dev) |
| `npm run build`  | Compile TypeScript to `dist/`          |
| `npm start`      | Start compiled server                  |
| `npm test`       | Run Jasmine test suite                 |
| `npm run lint`   | ESLint check                           |
| `npm run format` | Format with Prettier                   |

---
