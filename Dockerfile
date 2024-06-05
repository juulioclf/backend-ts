# Etapa 1: Build da aplicação
FROM node:16 AS builder

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de configuração e dependências
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

# Instalando as dependências
RUN npm install

# Gerando os arquivos do Prisma
RUN npx prisma generate

# Copiando o restante do código da aplicação
COPY . .

# Compilando a aplicação TypeScript
RUN npm run build

# Etapa 2: Configuração do ambiente de produção
FROM node:16-slim

# Instalando OpenSSL
RUN apt-get update -y && apt-get install -y openssl

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando os arquivos de configuração e dependências
COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./

# Instalando somente as dependências de produção
RUN npm install --only=production

# Gerando os arquivos do Prisma no ambiente de produção
RUN npx prisma generate

# Copiando o código compilado
COPY --from=builder /app/dist ./dist

# Expondo a porta que a aplicação irá rodar
EXPOSE 8000

# Comando para iniciar a aplicação
CMD ["node", "dist/main"]
