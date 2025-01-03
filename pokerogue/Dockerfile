# Use an official Node.js image as the base
FROM node:20.13

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install 

# Copy the rest of the application code
COPY . .

# Start the application
CMD ["npm", "run", "start"]
