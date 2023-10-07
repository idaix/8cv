# Infinite CV - 8cv -

8cv or Infinite CV is the ideal platform to build your portfolio, share your projects, and provide your links and CV. It offers a seamless way to showcase your skills and connect with potential opportunities.

> **Warning**
> This project is still in development and is not ready for production use.
>
> It uses new technologies (server actions, drizzle ORM) which are subject to change and may break your application.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org)
- **Styling:** [Tailwind CSS](https://tailwindcss.com)
- **Auth Management:** [NextAuth](https://next-auth.js.org/)
- **ORM:** [Prisma ORM](https://prisma.io)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com)
- **File Uploads:** [uploadthing](https://uploadthing.com)

## Running Locally

1. Clone the repository

```bash
git clone https://github.com/daishek/8cv.git
```

2. Install dependencies using npm

```bash
npm i
```

3. Copy the `.env.example` to `.env` and update the variables.

```bash
cp .env.example .env
```

4. Push the database schema

```bash
npx prisma db push
```

5. Start the development server

```bash
npm run dev
```
