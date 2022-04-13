import { ObjectId } from "mongodb";
import { collections } from '../../config/mongo';
import { ServiceResponseInterface, ItemServiceResponseInterface } from '../../utils/types';


class ItemServicesMongo {
  static async createItem(description: string, list_id: string):Promise<ServiceResponseInterface> {

    const isExist = await collections?.item?.findOne({description, list_id:new ObjectId(list_id)});
      if (isExist) return {status:'failure', message:'This item already exists', code:409};
    const result = await collections.item?.insertOne({description, list_id:new ObjectId(list_id), checked: false});
    return {status: 'success', message: 'New Item has been added to List successfully'}
  }
  
  static async getAllItems(listId: string):Promise<ItemServiceResponseInterface> {
    const items = await collections.item?.find({}).toArray();
    return {status: 'success', message:items?.length === 0  ? `No items from list ${listId}` :`All items from list ${listId}`, payload:{rows: items || Object.assign([]), rowCount:items?.length}}
  }

  static async getAnItem( itemId: string, listId: string):Promise<ItemServiceResponseInterface> {
    const query = { _id: new ObjectId(itemId) , list_id: new ObjectId(listId) };
  const item =  await collections.item?.findOne(query);
    return {status: 'success', message: !item  ? 'This item does not exist' :`Item retrieved from list ${listId}`, payload:{rows:item  || Object.assign([]), rowCount:1}}
  }

  static async deleteItem( id: string):Promise<ServiceResponseInterface> {
    const query = { _id: new ObjectId(id) };
    const result = await collections.item?.deleteOne(query);
    let status, message, code;
    if (result && result.deletedCount) {
     code=200, status='success'; message='item has been deleted'
  } else if (!result) {
     code=500; status='failure'; message=`Failed to delete item with id ${id}`
  } else if (!result.deletedCount) {
    code=404; status= 'failure'; message= 'item does not exist'
  }
    return {status: status || 'success', message: message || 'item has been deleted', code}
  }

  static async updateItem( id:string, description: string, checked: boolean):Promise<ServiceResponseInterface> {
    const query = { _id: new ObjectId(id) };
    const checkedVal = checked ? 'true' : 'false';
    let result;
    if(description && checked !== undefined) {
      result = await collections.item?.updateOne(query, { $set: {description, checked} });
    } else if(description === undefined){
      result = await collections.item?.updateOne(query, { $set: {checked} });
    } else {
      result = await collections.item?.updateOne(query, { $set: {description} });
    }
    return result ? {status: 'success', message: 'item has been updated in List'} : {status:'failure', message:'update not done', code: 500}
  }

}

export default ItemServicesMongo