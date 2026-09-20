# AlgoArena

A modern, full-stack platform for competitive programming, coding challenges, and technical interviews. Built as a scalable monorepo, it combines a high-performance Express/PostgreSQL backend with a highly interactive React/Vite frontend featuring an integrated code editor.

## Features

- **Interactive Code Editor**: Integrated Monaco Editor (`@monaco-editor/react`) for a VS Code-like coding experience directly in the browser.
- **Modern React Frontend**: Built with React 18, Vite, React Router, and Zustand for state management.
- **Beautiful UI/UX**: Styled with Tailwind CSS, Radix UI primitives, and Framer Motion for smooth animations and transitions.
- **Robust Backend API**: Node.js/Express backend utilizing async handlers, modular controllers, and clean architecture.
- **Secure Authentication**: Custom JWT authentication with HttpOnly cookies, refresh token rotation, and OTP-based email verification.
- **Database & ORM**: PostgreSQL database modeled and queried using Prisma ORM.
- **Transactional Emails**: Email delivery queue with exponential backoff, supporting Resend and Nodemailer.
- **Observability & Metrics**: OpenTelemetry tracing and Prometheus metrics (`prom-client`) for comprehensive monitoring.

## Project Structure

```text
algoarena/
├── apps/
│   ├── backend/          # Node.js/Express API with Prisma
│   └── frontend/         # React/Vite SPA with Monaco Editor
├── packages/
│   ├── eslint-config/    # Shared ESLint configurations
│   ├── shared/           # Shared utility functions and formatting tools
│   └── types/            # Shared TypeScript interfaces and types
├── .github/workflows/    # CI/CD pipelines for linting, type-checking, and testing
└── README.md             # This file
```

## Quick Start

### Prerequisites

- Node.js 22+
- PostgreSQL 16+

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/algoarena.git
cd algoarena
```

2. Install dependencies across all workspaces:
```bash
npm ci
```

3. Configure Environment Variables:

**Backend (`apps/backend/.env`):**
```env
PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/algoarena"
DIRECT_URL="postgresql://user:password@localhost:5432/algoarena"
ACCESS_SECRET="your-super-secret-access-key"
REFRESH_SECRET="your-super-secret-refresh-key"
OTP_VERIFY_SECRET="your-super-secret-otp-key"
RESEND_API_KEY="re_your_api_key"
OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318/v1/traces"
```

**Frontend (`apps/frontend/.env`):**
```env
VITE_API_URL="http://localhost:5000"
VITE_PROD="development"
```

4. Setup the Database:
```bash
npm --workspace backend exec prisma generate
npm --workspace backend exec prisma db push
```

5. Start the Development Servers:
```bash
# Start the backend API on port 5000
npm --workspace backend run dev

# Start the frontend Vite server on port 5173
npm --workspace frontend run dev
```

## Development & Tooling

### API Development
The backend is structured around modular features (e.g., `auth`, `health`) and utilizes Zod for rigorous request validation. It includes comprehensive unit and integration tests written in Vitest. 

```bash
# Run backend tests
npm --workspace backend exec vitest -- run tests/unit
```

### Frontend Development
The frontend leverages TanStack React Query for efficient data fetching, caching, and mutation state management. Radix UI and Tailwind CSS are used to construct accessible, customizable components (configured via a `components.json` setup).

```bash
# Run frontend build
npm --workspace frontend run build
```

## License

This project is licensed under the MIT License.