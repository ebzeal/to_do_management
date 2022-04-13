import { ServiceResponseInterface } from './../../../utils/types';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import ItemServices from '../../../controllers/items/items.services';
import app from '../../../index';
import ListService from '../../../controllers/lists/list.services';
import ListController from '../../../controllers/lists/list.controller';
import { singleList, stubList, stubListResponse } from '../../mockfiles';


chai.use(chaiHttp);
chai.should();

describe("ListController", ()=>{
describe('createList', ()=>{

  it('should create a List in the db', async()=>{
    const response = await chai
    .request(app)
    .post('/api/v1/list')
    .send(stubList);

    expect(response.status).to.eqls(201);
    expect(response.body.status).to.eqls(stubListResponse.status);
    expect(response.body.data.message).to.eqls(stubListResponse.data.message);

});

  it('should return error for when creating an existing list', async()=>{
    const response = await chai
    .request(app)
    .post('/api/v1/list')
    .send(stubList);

    expect(response.status).to.eqls(409);
    expect(response.body.status).to.eqls('failure');
    expect(response.body.data.message).to.eqls('This list already exists');
  })
})

describe('getAllLists', ()=>{

  it('should get all Lists in the db', async()=>{
    const response = await chai
    .request(app)
    .get('/api/v1/lists')

    expect(response.status).to.eqls(200);
    expect(response.body.status).to.eqls("success");
    expect(response.body.data.message).to.eqls('All lists');
    expect(response.body.data.payload.count).to.be.a('number');
    expect(response.body.data.payload.count).to.equal(3);
    expect(response.body.data.payload.lists).to.be.an('array');
});
})

describe('getAList', ()=> {

it('should get a single List in the db', async()=>{
  const response = await chai
  .request(app)
  .get('/api/v1/list/2')

  expect(response.status).to.eqls(200);
  expect(response.body.status).to.eqls("success");
  expect(response.body.data.message).to.deep.equals('List 2 returned');
  expect(response.body.data.payload).to.not.have.property('count');
  expect(response.body.data.payload).to.not.have.property('lists');
  expect(response.body.data.payload[0].name).to.eqls('Sunday routine');
});
})

describe('updateList', ()=> {

  it('should update a single List in the db', async()=>{
    const response = await chai
    .request(app)
    .patch('/api/v1/list/3')
    .send({
      "name": "Work Schedule and tasks" 
  })
  
    expect(response.status).to.eqls(200);
    expect(response.body.status).to.eqls("success");
    expect(response.body.data.message).to.deep.equals('updated successfully');
    expect(response.body.data).to.not.have.property('payload');
  });
  })
   
describe('deleteList', ()=> {

  it('should delete a single List in the db', async()=>{
    const response = await chai
    .request(app)
    .delete('/api/v1/list/3')

    expect(response.status).to.eqls(200);
    expect(response.body.status).to.eqls("success");
    expect(response.body.data.message).to.deep.equals('List has been deleted');
    expect(response.body.data).to.not.have.property('payload');
  });

  it('return error for not found list', async()=>{
    const response = await chai
    .request(app)
    .delete('/api/v1/list/30')

    expect(response.status).to.eqls(404);
    expect(response.body.status).to.eqls("failure");
    expect(response.body.data.message).to.deep.equals('list does not exist');
    expect(response.body.data).to.not.have.property('payload');
  });
  })
 
describe('getAllItemsInList', ()=> {

  it('should get all items from a list', async()=>{
    const response = await chai
    .request(app)
    .get('/api/v1/list/1/items')

    expect(response.status).to.eqls(200);
    expect(response.body.status).to.eqls("success");
    expect(response.body.data.message).to.deep.equals('All items from list 1');
    expect(response.body.data.payload.count).to.be.a('number');
    expect(response.body.data.payload.items).to.be.an('array');
  });

  })

describe('getAnItemInAList', ()=> {

  it('should get a single List in the db', async()=>{
    const response = await chai
    .request(app)
    .get('/api/v1/list/2/item/4')

    expect(response.status).to.eqls(200);
    expect(response.body.status).to.eqls("success");
    expect(response.body.data.message).to.deep.equals('Item retrieved from list 2');
    expect(response.body.data.payload).to.not.have.property('count');
    expect(response.body.data.payload).to.not.have.property('items');
    expect(response.body.data.payload[0]).to.have.property('description');
    expect(response.body.data.payload[0]).to.have.property('checked');
    expect(response.body.data.payload[0].checked).to.equals(false);
    expect(response.body.data.payload[0].id).to.eqls(4);
  });

  })
})