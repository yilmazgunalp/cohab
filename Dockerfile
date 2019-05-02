FROM node

RUN git clone https://github.com/yilmazgunalp/cohab.git

RUN pwd

WORKDIR /cohab

CMD npm start
