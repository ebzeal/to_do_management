import { ObjectId } from "mongodb";

export interface List {
  id?: ObjectId;
  name: string;
}


export interface Item {
  id?: ObjectId;
  description: string;
  checked: boolean;
  list_id: ObjectId
}
