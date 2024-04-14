# Use Node.js version 14 as the base image
FROM node:21-alpine

# Create and set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# ignore node_modules in the .dockerignore file


# Copy the rest of the application code
COPY . .

# Expose the port on which your app runs
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
