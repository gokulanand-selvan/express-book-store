FROM node:20.12.2

WORKDIR /

COPY  /package*.json ./ 

RUN npm install

COPY . .

CMD [ "npm" "run" "start" ]

