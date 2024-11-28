FROM node:18-alpine AS build

RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

WORKDIR /app
COPY . .

RUN source /root/.shrc && \
    pnpm install && \
    pnpm run build


FROM node:18-alpine
WORKDIR /app

ENV NODE_ENV=production

COPY --from=build --chown=nextjs:nodejs /app/.next ./.next
COPY --from=build /app/next.config.js ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/public ./public

CMD npm start
