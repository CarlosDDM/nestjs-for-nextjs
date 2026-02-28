FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

FROM node:22-alpine AS runner

WORKDIR /app

COPY --from=builder /app/ /app/

CMD ["npm", "run", "start:dev"]

EXPOSE 3000