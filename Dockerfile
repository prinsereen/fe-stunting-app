# Menggunakan Node.js versi LTS
FROM node:18-alpine

# Direktori kerja untuk aplikasi
WORKDIR /app

# Menyalin file package.json dan package-lock.json
COPY package*.json ./

# Menginstall dependensi
RUN npm install

# Menyalin seluruh kode aplikasi ke dalam container
COPY . .

# Build aplikasi React menggunakan Vite
RUN npm run build

# Mengekspos port default Vite 
EXPOSE 4173

# Menjalankan server preview Vite
CMD ["npm", "run", "preview"]
