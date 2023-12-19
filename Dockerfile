# Tahap 1: Membangun aplikasi
FROM node:16 AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Tahap 2: Menyiapkan image produksi
FROM node:16-alpine
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
RUN npm install --only=production
COPY --from=builder /usr/src/app/dist ./dist

# Port yang akan digunakan
EXPOSE 3000

# Menjalankan aplikasi
CMD ["node", "dist/main"]
