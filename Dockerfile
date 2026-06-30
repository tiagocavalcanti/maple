FROM debian:bookworm-slim

RUN apt-get update \
 && apt-get install -y curl ca-certificates nginx \
 && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://maple.dev/cli/install | sh

COPY shim.js /opt/shim.js
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 8080
CMD sh -c 'maple start --offline & exec nginx -g "daemon off;"'
