FROM node:18-alpine

WORKDIR /app

# Sao chép package.json để cài thư viện
COPY package*.json ./

# Cài đặt tất cả dependencies
RUN npm install

# Sao chép toàn bộ source code
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]