FROM node:alpine3.20 as build
#install angular cli
RUN npm install -g @angular/cli
# Set the working directory inside the container
WORKDIR /app
RUN mkdir seneflix

WORKDIR /seneflix



# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install Angular dependencies
RUN npm install
# Copy the application code into the container
COPY . .

ENV APP_NAME 'seneflix'
ENV ROUTING 'true'
ENV STANDALONE 'false'
ENV STRICT 'true'
ENV STYLE 'css'


CMD ng new $APP_NAME --routing=$ROUTING --standalone=$STANDALONE --strict=$STRICT --style=$STYLE \
    && mv $APP_NAME/* . \
    && rm -rf $APP_NAME \
    && ng serve --host 0.0.0.0 --port 4200

RUN ng build --configuration=production

# Use Nginx to serve the built Angular app
FROM nginx:alpine
COPY --from=0 /seneflix/dist /usr/share/nginx/html

# Expose port for Angular app
EXPOSE 80

#EXPOSE 4200
