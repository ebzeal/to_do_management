import { Router } from 'express';
import ListController from '../controllers/lists/list.controller'

const { createList, getAllLists, getAList, deleteList, updateList, getAllItemsInList, getAnItemInList } = ListController;

const listRoutes = Router();

listRoutes.post('/list', createList);
listRoutes.get('/list/:id', getAList);
listRoutes.get('/lists', getAllLists);
listRoutes.delete('/list/:id', deleteList);
listRoutes.patch('/list/:id', updateList);

listRoutes.get('/list/:listId/items', getAllItemsInList)
listRoutes.get('/list/:listId/item/:itemId', getAnItemInList)

export default listRoutes;
