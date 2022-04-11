import { Request, Response } from 'express';
import query from '../../config/psql_dbConnection'
import response from '../../utils/formatResponse';
import { addList, selectAListByParam, deleteAList, updateAList, selectAllLists } from '../../models/sqlQueries';
import ListService from './list.services';
import ItemServices from '../items/itemsServices';

/**
 * @class ListController
 */
class ListController {


  static async createList(req: Request, res: Response): Promise<Response> {
    try {
      const {
        name,
      } = req.body;

      const { status, message } = await ListService.createList(name);
      return response({res, code:201, status, message});
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
      const {status, message, payload} = await ListService.getList(id);
      return response({res, code:200, status, message, payload: payload.rows});

    } catch (error) {
      throw error;
    }
  }


  static async deleteList(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const {status, message} = await ListService.deleteList(id)
      return response({res, code: status==='failure' ? 404 : 200, status, message});
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
