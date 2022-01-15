FROM node:16.13.1-alpine3.14
WORKDIR /app
# Copy everything to workdir except what is in .dockerignore
COPY . .
# Install dependencies
RUN npm install && npm cache clean --force
CMD ["npm", "start"]