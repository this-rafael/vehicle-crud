# Use a imagem base do Node.js 20
FROM node:20



# Configure o diretório de trabalho dentro do container
WORKDIR /usr/src/app

# Copie o package.json e o package-lock.json (se existir)
COPY package*.json ./

# Instale as dependências
RUN npm install

RUN ls -la node_modules

# Copie o restante do código para o container
COPY . .

# Exponha a porta em que a aplicação será executada
EXPOSE 3000

RUN npm run build

# Comando para inicializar a aplicação
CMD ["node", "dist/main.js"]
