import { Router } from "express";
import ItemController from "../controllers/items/item.controller";
import handleValidationErrors from "../utils/handleValidationsErrors";
import { createItemSchema } from "../utils/validations.middleware";

const { createItem, deleteItemFromList, updateItem } = ItemController;

const itemRoutes = Router();

itemRoutes.post("/item", createItemSchema, handleValidationErrors, createItem);
itemRoutes.delete("/item/:id", deleteItemFromList);
itemRoutes.patch("/item/:id", updateItem);

export default itemRoutes;
