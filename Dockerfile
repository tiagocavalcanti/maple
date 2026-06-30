FROM debian:bookworm-slim

RUN apt-get update \
 && apt-get install -y curl ca-certificates \
 && rm -rf /var/lib/apt/lists/*

# Instala `maple` + `libchdb.so` em /root/.maple/bin
RUN curl -fsSL https://maple.dev/cli/install | sh

EXPOSE 4318

# --offline é obrigatório aqui: serve a UI embutida (mesma origem do domínio Railway)
CMD ["maple", "start", "--offline"]
