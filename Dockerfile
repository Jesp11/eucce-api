# --- ETAPA 1: Instalación de todas las dependencias ---
FROM node:20-alpine AS deps
RUN npm install -g pnpm
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- ETAPA 2: Construcción (Build) ---
FROM node:20-alpine AS builder
RUN npm install -g pnpm
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build
# Instalamos solo dependencias de producción para limpiar la imagen final
RUN pnpm prune --prod

# --- ETAPA 3: Imagen Final ---
FROM node:20-alpine AS runner
WORKDIR /app

# Instalar pnpm también aquí si usas scripts de pnpm para iniciar
RUN npm install -g pnpm

RUN addgroup -S nodejs && adduser -S nestjs -G nodejs

# Copiamos los archivos
COPY --from=builder /app/package.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Ajustamos permisos para que el usuario nestjs sea dueño de la carpeta /app
RUN chown -R nestjs:nodejs /app

USER nestjs

ENV NODE_ENV=production
# Importante: NestJS por defecto busca en dist/main.js
CMD ["node", "dist/main"]