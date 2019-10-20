import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/** Rotas Abertas */
routes.post('/sessions', SessionController.store);

/** Rotas Protegidas */
routes.use(authMiddleware);
// Users
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
// Students
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);

export default routes;
