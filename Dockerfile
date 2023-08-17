# Usamos una imagen base de Node
FROM node:16

# Directorio en el que se ejecutará todo
WORKDIR /usr/app

# Copiamos el archivo 'package.json' y 'yarn.lock' (si está disponible)
COPY package.json yarn.lock ./

# Instalamos las dependencias usando yarn
RUN yarn install

# Copiamos el resto de archivos de nuestra app
COPY . .

# Expone el puerto 8081, que es el que usa Metro Bundler por defecto
EXPOSE 8081

# Comando para arrancar el servidor de desarrollo de React Native
CMD ["yarn", "start"]
