import Router from 'express';
import CardController from "../Cards/CardController.js";

const cardRouter = new Router();

cardRouter.post('/', CardController.create);
cardRouter.get('/', CardController.getAll);
cardRouter.get('/:id', CardController.getById);
cardRouter.get('/search', CardController.searchCards);
cardRouter.put('/', CardController.update);
cardRouter.delete('/:id', CardController.delete);

export default cardRouter;