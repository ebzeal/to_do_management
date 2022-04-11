import { Router } from 'express';
import ItemController from '../controllers/items/item.controller'

const { createItem, deleteItemFromList, updateItem } = ItemController;

const itemRoutes = Router();

itemRoutes.post('/item', createItem);
itemRoutes.delete('/item/:id', deleteItemFromList);
itemRoutes.patch('/item/:id', updateItem);

export default itemRoutes;
