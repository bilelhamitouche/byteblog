# ByteBlog

A modern blogging platform built with Next.js where you can share your thoughts, one byte at a time.

## Features

- 🔐 User authentication (login/register)
- ✍️ Create, read, update, and delete blog posts
- 💬 Comment system with replies and likes
- 🎨 Rich text editing with Tiptap
- 🌓 Light/dark mode support
- 📱 Responsive design
- 🔍 Search functionality
- 📝 Markdown/code syntax highlighting
- ⚡ Optimized performance with Tanstack Query and Turbopack

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Tanstack Query
- **Forms**: React Hook Form with Zod validation
- **Authentication**: Better Auth
- **Database**: PostgreSQL with Drizzle ORM
- **Rich Text Editor**: Tiptap
- **Icons**: Lucide React & Heroicons
- **UI Components**: Shadcn UI
- **Date Utilities**: Date-fns
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database
- Package manager (pnpm, npm, yarn, or bun)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/byteblog.git
cd byteblog
```

2. Install dependencies:

```bash
pnpm install
# or
npm install
# or
yarn
# or
bun install
```

3. Set up environment variables:
   Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Configure your database in `.env`:

```env
POSTGRES_URL=your_postgres_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

5. Run database migrations:

```bash
pnpm dlx drizzle-kit push
# or
npx drizzle-kit push
```

6. Start the development server:

```bash
pnpm dev
# or
npm run dev
# or
yarn dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
byteblog/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes (login, register)
│   ├── (main)/            # Main application routes
│   ├── api/               # API routes
│   ├── layout.tsx         # Root layout with providers
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/                # Shadcn/ui components
│   ├── AuthorPost*.tsx    # Post listing components
│   ├── Comment*.tsx       # Comment system components
│   └── CodeBlock.tsx      # Syntax highlighting component
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── hooks/                 # Custom React hooks
└── actions/               # Server actions
```

## Key Components

### Authentication

- Secure user registration and login
- Protected routes for authenticated users
- Session management with Better Auth

### Blog Posts

- Create posts with rich text editor
- View posts with syntax highlighting
- Author attribution and timestamps
- Infinite scroll for post listings

### Comment System

- Nested comments with replies
- Comment liking functionality
- Comment forms with validation

### Rich Text Editor

- Built with Tiptap
- Supports headings, lists, code blocks
- Syntax highlighting via Highlight.js
- Bullet points, ordered lists, and more

## Development

### Available Scripts

```bash
# Development server with Turbopack
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Database migrations
pnpm dlx drizzle-kit push
pnpm dlx drizzle-kit studio
```

### Code Quality

- ESLint configured with Next.js rules
- TypeScript for type safety
- Prettier formatting (via editor configuration)

## Deployment

The easiest way to deploy ByteBlog is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

### Vercel Deployment Steps

1. Push your code to a GitHub repository
2. Import the project in Vercel
3. Configure environment variables:
   - `POSTGRES_URL`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL`
4. Deploy!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org) - The React framework for production
- [Tiptap](https://tiptap.dev) - Rich text editor for web
- [Better Auth](https://www.better-auth.com) - Authentication framework
- [Radix UI](https://www.radix-ui.com) - Accessible UI primitives
- [Shadcn/ui](https://ui.shadcn.com) - Beautifully designed components
- [React Query](https://tanstack.com/query) - Data fetching and state management
