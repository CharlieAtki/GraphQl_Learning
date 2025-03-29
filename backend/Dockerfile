# Step 1: Use Node.js Alpine image for smaller size
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package files first for better caching
COPY package*.json ./

# Step 4: Install only production dependencies
RUN npm ci --only=production

# Step 5: Copy application files
COPY . .

# Step 6: Use non-root user for security
RUN chown -R node:node /usr/src/app
USER node

# Step 7: Expose the port
EXPOSE 3001

# Step 8: Set environment to production
ENV NODE_ENV=production

# Step 9: Define the command to run the backend server
CMD ["npm", "start"]