FROM node:alpine3.20 as build
#install angular cli
RUN npm install -g @angular/cli
# Set the working directory inside the container
#WORKDIR /app
#RUN mkdir seneflix

WORKDIR /app



# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install Angular dependencies
RUN npm install

# Copy files from local machine to virtual directory in docker image
COPY . .
RUN npm run build --prod

ENV APP_NAME 'seneflix'
ENV ROUTING 'true'
ENV STANDALONE 'true'
ENV STRICT 'true'
ENV STYLE 'css'


CMD ng new $APP_NAME --routing=$ROUTING --standalone=$STANDALONE --strict=$STRICT --style=$STYLE \
    && mv $APP_NAME/* . \
    && rm -rf $APP_NAME \
    && ng serve --host 0.0.0.0 --port 4200

RUN ng build --configuration=production

# Use Nginx to serve the built Angular app
FROM nginx:alpine


COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /app/dist/seneflix /usr/share/nginx/html

# Expose port for Angular app
EXPOSE 80

#EXPOSE 4200
