import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import RegistrationController from './app/controllers/RegistrationController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import UnansweredOrderController from './app/controllers/UnansweredOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

/** Rotas Abertas */
routes.post('/sessions', SessionController.store);
routes.post('/students/:id/checkins', CheckinController.store);
routes.post('/students/:id/help-orders', HelpOrderController.store);
routes.get('/students/:id', StudentController.show);

/** Rotas Protegidas */
routes.use(authMiddleware);
// Users
routes.post('/users', UserController.store);
routes.put('/users', UserController.update);
// Students
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.delete('/students/:id', StudentController.delete);
// Plans
routes.get('/plans', PlanController.index);
routes.get('/plans/:id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);
// Registrations
routes.get('/registrations', RegistrationController.index);
routes.get('/registrations/:id', RegistrationController.show);
routes.post('/registrations', RegistrationController.store);
routes.put('/registrations/:id', RegistrationController.update);
routes.delete('/registrations/:id', RegistrationController.delete);
// Help Orders
routes.get('/unansweredOrders', UnansweredOrderController.index);
routes.get('/students/:id/help-orders', HelpOrderController.index);
routes.get('/help-orders/:id', HelpOrderController.show);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

export default routes;
