# SlothState

This is the frontend codebase for [SlothState](https://sloth-state.vercel.app/), built with [Vite](https://vitejs.dev/), TypeScript, and React. It features a modular, scalable structure and supports modern frontend development best practices.

---

## 🚀 Live Site

**Access the deployed frontend directly at:**  
[https://sloth-state.vercel.app/](https://sloth-state.vercel.app/)

---

## 📁 Directory Structure

```
frontend/
├── public/                   # Static assets
├── src/
│   ├── components/           # Reusable UI components
│   ├── context/              # React context providers
│   ├── hooks/                # Custom React hooks (e.g., useTracking)
│   ├── lib/                  # Utility libraries and helpers
│   ├── pages/                # Page-level components and routes
│   ├── App.css               # App-specific styles
│   ├── App.tsx               # Main application component
│   ├── index.css             # Global styles
│   ├── main.tsx              # Entry point
│   └── vite-env.d.ts         # Vite/TypeScript environment types
├── index.html                # HTML template
├── package.json              # Project metadata and scripts
├── tailwind.config.ts        # Tailwind CSS configuration (if used)
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration
└── ...                       # Other config and lock files
```

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The app will be available at [http://localhost:8080](http://localhost:8080) or the port shown in your terminal.

### 3. Build for production

```bash
npm run build
```

### 4. Preview the production build

```bash
npm run preview
```

---

## ✨ Features

- **Modern React** with hooks and context
- **TypeScript** for type safety
- **Vite** for fast development and HMR
- **Custom hooks** for analytics and user tracking
- **Tailwind CSS** for styling (if configured)
- **Modular structure** for easy scaling and maintenance

---

## 📦 Scripts

| Command           | Description                    |
|-------------------|-------------------------------|
| `npm run dev`     | Start development server       |
| `npm run build`   | Build for production           |
| `npm run preview` | Preview production build       |

---
<!-- 
## 📄 License

See [LICENSE](LICENSE) for license details.

--- -->

**Visit:** [https://sloth-state.vercel.app/](https://sloth-state.vercel.app/)  
for the live application.