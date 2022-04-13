
import { Response } from 'express';



interface rowList {
  id: number;
  name: string;
  datecreated?:Date;
  datemodified?:Date;
}
interface rowItem {
  id: number;
  description:string;
  checked: boolean;
  list_id: number;
  datecreated?:string;
  datemodified?:string;
}


interface ListPayload {
  rowCount?: number;
  rows: rowList[]
}

interface ItemPayload {
rowCount?: number;
rows: rowItem[]
}
interface ReturnedData {
  statusCode: number;
  message: string;
  error?: unknown;
  payload?:ListPayload | ItemPayload;
}

export interface ResponseInterfaceDto {
  res: Response; 
  code: number; 
  status: string; 
  message: string; 
  error?: string; 
  payload?: unknown;
}

export interface ServiceResponseInterface {
  status: string; 
  message: string; 
  code?: number
}

export interface ListServiceResponseInterface extends ServiceResponseInterface {
  payload : ListPayload
}

export interface ItemServiceResponseInterface extends ServiceResponseInterface {
  payload : ItemPayload
}