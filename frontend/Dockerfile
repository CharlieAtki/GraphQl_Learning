# Step 1: Use Node.js Alpine image for development
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /app

# Step 3: Copy package files
COPY package*.json ./

# Step 4: Install ALL dependencies (including dev dependencies)
RUN npm install

# Step 5: Copy all project files
COPY . .

# Step 6: Expose the Vite development server port
EXPOSE 5173

# Step 7: Set environment to development
ENV NODE_ENV=development

# Step 8: Start the development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]