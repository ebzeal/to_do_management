import query from '../../config/psql_dbConnection'
import { addList, selectAListByParam, deleteAList, updateAList, selectAllLists } from '../../models/sqlQueries';
import { ListServiceResponseInterface, ServiceResponseInterface } from '../../utils/types';

class ListService{
  static async createList(name: string): Promise<ServiceResponseInterface> {
    const { rows } = await query(selectAListByParam('name'), [name]);
      if (rows[0]) return {status:'failure', message:'This list already exists'};
      await query(addList, [name]); 
      return {status: 'success', message: 'New List has been added successfully'}
    }

  static async getLists(): Promise<ListServiceResponseInterface> {
    const {rows, rowCount} = await query(selectAllLists);
      return {status: 'success', message:rowCount === 0  ? 'No list found' :'All lists', payload: {rows, rowCount}}
    }

  static async getList(id: string): Promise<ListServiceResponseInterface> {
    const {rows, rowCount} = await query(selectAListByParam('id'), [id]);
      return {status: 'success', message: rowCount === 0  ? 'This list does not exist' :`List ${id} returned`, payload: {rows, rowCount}}
    }

  static async deleteList(id: string): Promise<ServiceResponseInterface> {
    const {payload} = await this.getList(id);
    if(payload.rowCount === 0) {
    return {status: 'failure', message: 'list does not exist'}
    }
      await query(deleteAList, [id]);
      return {status:'success', message:'List has been deleted'}
    }
    
  static async updateList(id: string, name: string): Promise<ServiceResponseInterface> {
    await query(updateAList, [id, name]);
    return {status:'success', message:'updated successfully'}
  }
    
}

export default ListService;