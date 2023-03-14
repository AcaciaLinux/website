FROM node:19-alpine
RUN adduser -D max
RUN apk add bash git vim make python3
WORKDIR /root
RUN npm install -g "@angular/cli"
