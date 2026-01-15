FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
RUN corepack enable pnpm

COPY package.json pnpm-lock.yaml* ./
COPY prisma ./prisma

RUN pnpm i --frozen-lockfile

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable pnpm

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm prisma generate
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm run build

FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

RUN corepack enable pnpm
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nextjs:nodejs prisma.config.ts ./prisma.config.ts

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]