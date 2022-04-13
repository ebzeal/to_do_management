import { Request, Response } from 'express';
import response from '../../utils/formatResponse';
import ListServicepg from './list.services';
import ListServiceMongo from './list.services.mongo';
import ItemServicespg from '../items/items.services';
import ItemServicesMongo from '../items/items.services.mongo';

const ListService = process.env.DB_TYPE === 'mongo' ? ListServiceMongo : ListServicepg;
const ItemServices = process.env.DB_TYPE === 'mongo' ? ItemServicesMongo : ItemServicespg;

/**
 * @class ListController
 */
class ListController {


  static async createList(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
      } = req.body;

      const { status, message, code } = await ListService.createList(name);
      return response({res, code: code || 201, status, message});
    } catch (error) {
      throw error;
    }
  }

  static async getAllLists(req: Request, res: Response): Promise<Response> {
    try {
      const {status, message, payload} = await ListService.getLists();
      return response({res, code:200, status, message, payload: {count:payload.rowCount, lists:payload.rows}});
    } catch (error) {
      throw error;
    }
  }


  static async getAList(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const {status, message, payload, code} = await ListService.getList(id);
      return response({res, code:code||200, status, message, payload: payload.rows});

    } catch (error) {
      throw error;
    }
  }


  static async deleteList(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const {status, message, code} = await ListService.deleteList(id)
      return response({res, code: code||200, status, message});
    } catch (error) {
      throw error;
    }
  }


  static async updateList(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const {status, message} = await ListService.updateList(id, name);

      return response({res, code:200, status, message});
    } catch (error) {
      throw error;
    }
  }

  static async getAllItemsInList(req: Request, res: Response): Promise<Response> {
    try {
      const {
        listId
      } = req.params;
      const {status, message, payload} = await ItemServices.getAllItems(listId);
      return response({res, code:200, status, message, payload: {count: payload.rowCount, items:payload.rows}});

    } catch (error) {
      throw error;
    }
  }

  static async getAnItemInList(req: Request, res: Response): Promise<Response> {
    try {
      const {
        itemId,
        listId,
      } = req.params;
      const {status, message, payload} = await ItemServices.getAnItem(itemId, listId);
      return response({res, code:200, status, message, payload: payload.rows});

    } catch (error) {
      throw error;
    }
  }
  
}

export default ListController;
