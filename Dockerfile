# Build stage
FROM node:22 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev --ignore-scripts && \
    npm rebuild sqlite3 --build-from-source

COPY . .

RUN npm run build

# Production stage
FROM node:22

WORKDIR /app

ENV DB_ROUTE="./db/database.sqlite"

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build

CMD ["node", "build/index.js"]