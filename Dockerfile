FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY expo-app/package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY expo-app/ ./

# Build static web bundle
RUN npx expo export --platform web

# Install serve to host static files
RUN npm install -g serve

# Expose port (Cloud Run uses PORT env variable, default 8080)
ENV PORT=8080
EXPOSE 8080

# Serve the static web build
CMD serve dist -l $PORT -s
