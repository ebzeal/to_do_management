import { ObjectId } from "mongodb";
import { collections } from '../../config/mongo';
import { ListServiceResponseInterface, ServiceResponseInterface } from '../../utils/types';


class ListServiceMongo {
  static async createList(name: string): Promise<ServiceResponseInterface> {
    const isExist = await collections?.list?.findOne({name});
      if (isExist) return {status:'failure', message:'This list already exists', code:409};
      const result = await collections.list?.insertOne({name});
      return result ? {status: 'success', message: 'New List has been added successfully'} : {status:'failure', message:'This list cannot be created', code:500}
    }

  static async getLists(): Promise<ListServiceResponseInterface> {
    const lists = await collections.list?.find({}).toArray();
      return {status: 'success', message:lists?.length === 0  ? 'No list found' :'All lists', payload: {rows:lists || Object.assign([]), rowCount:lists?.length}}
    }

  static async getList(id: string): Promise<ListServiceResponseInterface> {
      const query = { _id: new ObjectId(id) };
    const list = await await collections.list?.findOne(query);
      return {status: 'success', message: !list  ? 'This list does not exist' :`List ${id} returned`, payload: {rows: list  || Object.assign([]), rowCount:1}}
    }

  static async deleteList(id: string): Promise<ServiceResponseInterface> {
      const query = { _id: new ObjectId(id) };
      const result = await collections.list?.deleteOne(query);
      let status, message, code;
      if (result && result.deletedCount) {
       code=200, status='success'; message='List has been deleted'
    } else if (!result) {
       code=500; status='failure'; message=`Failed to delete List with id ${id}`
    } else if (!result.deletedCount) {
      code=404; status= 'failure'; message= 'list does not exist'
    }
      return {status: status || 'success', message: message || 'List has been deleted', code}
    }
    
  static async updateList(id: string, name: string): Promise<ServiceResponseInterface> {

    const query = { _id: new ObjectId(id) };
    const result = await collections.list?.updateOne(query, { $set: {name} });
    return  result ? {status:'success', message:'updated successfully'} : {status:'failure', message:'update not done', code: 500}
  }
    
}

export default ListServiceMongo;