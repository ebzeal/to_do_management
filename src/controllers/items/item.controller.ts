import { Request, Response } from "express";
import response from "../../utils/formatResponse";
import ItemServicespg from "./items.services";
import ItemServicesMongo from "./items.services.mongo";

const ItemServices = process.env.DB_TYPE === "mongo" ? ItemServicesMongo : ItemServicespg;

/**
 * @class ItemController
 */
class ItemController {
  static async createItem(req: Request, res: Response): Promise<Response> {
    try {
      const { description, list_id } = req.body;
      if(list_id === undefined || description === undefined) {
        return response({ res, code: 406, status: "failure", message: "description and list_id cannot be empty" });
      }
      const { status, message, code } = await ItemServices.createItem(description, list_id);
      return response({ res, code: code || 201, status, message });
    } catch (error) {
      throw error;
    }
  }

  static async deleteItemFromList(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { status, message, code } = await ItemServices.deleteItem(id);
      return response({ res, code: code || 200, status, message });
    } catch (error) {
      throw error;
    }
  }

  static async updateItem(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { description, checked } = req.body;

      const { status, message } = await ItemServices.updateItem(id, description, checked);
      return response({ res, code: 200, status, message });
    } catch (error) {
      throw error;
    }
  }
}

export default ItemController;
