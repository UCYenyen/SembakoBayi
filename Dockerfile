FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable pnpm
COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma
RUN pnpm i --frozen-lockfile

# Stage for running migrations/seeds
FROM node:20-alpine AS migrator
WORKDIR /app
RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build-time arguments for Next.js public variables
ARG NEXT_PUBLIC_PUSHER_KEY
ARG NEXT_PUBLIC_PUSHER_CLUSTER
ARG NEXT_PUBLIC_PUSHER_TLS
ARG NEXT_PUBLIC_PUSHER_HOST
ARG NEXT_PUBLIC_PUSHER_PORT
ARG NEXT_PUBLIC_APP_URL

# Make them available during build
ENV NEXT_PUBLIC_PUSHER_KEY=${NEXT_PUBLIC_PUSHER_KEY}
ENV NEXT_PUBLIC_PUSHER_CLUSTER=${NEXT_PUBLIC_PUSHER_CLUSTER}
ENV NEXT_PUBLIC_PUSHER_TLS=${NEXT_PUBLIC_PUSHER_TLS}
ENV NEXT_PUBLIC_PUSHER_HOST=${NEXT_PUBLIC_PUSHER_HOST}
ENV NEXT_PUBLIC_PUSHER_PORT=${NEXT_PUBLIC_PUSHER_PORT}
ENV NEXT_PUBLIC_APP_URL=${NEXT_PUBLIC_APP_URL}

RUN pnpm prisma generate
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

RUN corepack enable pnpm
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs /app/prisma.config.ts ./prisma.config.ts

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]