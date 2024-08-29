# Use a imagem base do Node.js
FROM node:18

# Cria o diretório de trabalho
WORKDIR /usr/src/app

# Copia o package.json e o package-lock.json (ou yarn.lock) para dentro do contêiner
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta que a aplicação irá rodar
EXPOSE 80

# Define o comando para iniciar a aplicação
CMD ["npm", "start"]
