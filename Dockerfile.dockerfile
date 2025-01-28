FROM node:22

RUN npm install -g @angular/cli

WORKDIR /
RUN mkdir seneflix
WORKDIR /seneflix

ENV APP_NAME 'seneflix'
ENV ROUTING 'true'
ENV STANDALONE 'false'
ENV STRICT 'true'
ENV STYLE 'css'

CMD ng new $APP_NAME --routing=$ROUTING --standalone=$STANDALONE --strict=$STRICT --style=$STYLE \
    && mv $APP_NAME/* . \
    && rm -rf $APP_NAME \
    && ng serve --host 0.0.0.0 --port 4200

EXPOSE 4200
