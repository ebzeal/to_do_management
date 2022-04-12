import { addItem, selectItem, deleteItem, updateItem, updateItemWithMultipleParams, selectItemsFromList, selectItemFromList, selectItemById } from '../../models/sqlQueries';
import query from '../../config/psql_dbConnection'
import { ServiceResponseInterface, ItemServiceResponseInterface } from '../../utils/types';


class ItemServices {
  static async createItem(description: string, list_id: string):Promise<ServiceResponseInterface> {

    const { rows } = await query(selectItem, [description, list_id]);
    if (rows[0]) return {status:'failure', message:'This item already exists'};
    await query(addItem, [description, list_id]);
    return {status: 'success', message: 'New Item has been added to List successfully'}
  }
  
  static async getAllItems(listId: string):Promise<ItemServiceResponseInterface> {
    const {rows, rowCount} = await query(selectItemsFromList, [listId]);
    return {status: 'success', message:rowCount === 0  ? `No items from list ${listId}` :`All items from list ${listId}`, payload:{rows, rowCount}}
  }

  static async getAnItem( itemId: string, listId: string):Promise<ItemServiceResponseInterface> {
    const {rows, rowCount} = await query(selectItemFromList, [itemId, listId]);
    return {status: 'success', message: rowCount === 0  ? 'This item does not exist' :`Item retrieved from list ${listId}`, payload:{rows, rowCount}}
  }

  static async getAnItemById( itemId: string):Promise<ItemServiceResponseInterface> {
    const {rows, rowCount} = await query(selectItemById, [itemId]);
    return {status: 'success', message: rowCount === 0  ? 'This item does not exist' :'item returned', payload:{rows, rowCount}}
  }

  static async deleteItem( id: string):Promise<ServiceResponseInterface> {
    const {payload} = await this.getAnItemById(id);
    if(payload.rowCount === 0) {
    return {status: 'failure', message: 'item does not exist'}
    }
    await query(deleteItem, [id]);
    return {status: 'success', message: 'item has been deleted from List'}
  }

  static async updateItem( id:string, description: string, checked: boolean):Promise<ServiceResponseInterface> {
    const checkedVal = checked ? 'true' : 'false';
    if(description && checked !== undefined) {
      await query(updateItemWithMultipleParams('description' , 'checked'), [id, description, checkedVal])
    } else{
      const param = description ? description : checkedVal;
      const paramVal = description ? 'description' : 'checked';
      await query(updateItem(paramVal), [id, param]);
    }
    return {status: 'success', message: 'item has been updated in List'}
  }

}

export default ItemServices