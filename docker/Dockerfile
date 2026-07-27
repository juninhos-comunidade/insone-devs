# syntax=docker/dockerfile:1
FROM node:20-alpine AS builder
WORKDIR /app

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend .
RUN npx prisma generate
RUN npm run build

FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["node", "dist/main"]
