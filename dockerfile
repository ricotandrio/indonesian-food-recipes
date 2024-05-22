FROM debian:11.6-slim as builder

WORKDIR /app

RUN apt update
RUN apt install curl unzip -y

RUN curl https://bun.sh/install | bash

COPY package.json .
COPY bun.lockb .

RUN /root/.bun/bin/bun install --production

# ? -------------------------
FROM gcr.io/distroless/base

WORKDIR /app

COPY --from=builder /root/.bun/bin/bun bun
COPY --from=builder /app/node_modules node_modules

COPY src src
COPY tsconfig.json .

# Install MySQL client
RUN apt update && apt install -y default-mysql-client

ENV NODE_ENV production
CMD ["./bun", "src/index.ts"]

EXPOSE 8080

# https://elysiajs.com/integrations/docker