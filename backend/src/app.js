import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import io from 'socket.io';
import http from 'http';

import routes from './routes';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);
    this.socket();
    this.middlewares();
    this.routes();

    this.connectedUsers = {};
    this.connectedUsersFront = [];
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', socket => {
      const { user_id, source = 'Mobile' } = socket.handshake.query;

      if (source === 'Mobile') {
        this.connectedUsers[user_id] = socket.id;
      } else {
        this.connectedUsersFront.push(socket.id);
        socket.join('front');
      }

      socket.on('disconnect', () => {
        if (source === 'Mobile') {
          delete this.connectedUsers[user_id];
        } else {
          this.connectedUsersFront.splice(socket.id, 1);
          socket.leave('front');
        }
      });
    });
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      req.io = this.io;
      req.connectedUsers = this.connectedUsers;
      req.connectedUsersFront = this.connectedUsersFront;

      next();
    });
  }

  routes() {
    this.app.use(routes);
  }
}

export default new App().server;
