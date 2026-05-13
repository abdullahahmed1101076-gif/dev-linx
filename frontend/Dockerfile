# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# copy package files first
COPY package*.json ./

# install dependencies
RUN npm install

# copy rest of project
COPY . .

# build production app
RUN npm run build


# Production stage (Nginx)
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
