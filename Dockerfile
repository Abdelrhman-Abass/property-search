# Use the official Node.js image from the Docker Hub
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies (this is better to do before copying the rest of the app for caching purposes)
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which the app will run (default Next.js port is 3000)
EXPOSE 3000

# Start the Next.js application in development mode
CMD ["npm", "run", "dev"]
