FROM debian:bookworm-slim

RUN apt-get update \
 && apt-get install -y curl ca-certificates socat \
 && rm -rf /var/lib/apt/lists/*

RUN curl -fsSL https://maple.dev/cli/install | sh

EXPOSE 8080
CMD sh -c 'maple start --offline --reset & exec socat TCP-LISTEN:8080,fork,reuseaddr TCP:127.0.0.1:4318'
