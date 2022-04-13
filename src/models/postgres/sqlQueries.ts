const addList = 'INSERT INTO list(name)VALUES($1)';
const selectAllLists = 'SELECT * FROM list';
const selectAListByParam = (param:string): string => `SELECT * FROM list WHERE ${param}=$1`;
const deleteAList = 'DELETE FROM list WHERE id=$1';
const updateAList = 'UPDATE list SET name =$2 WHERE id=$1';

const addItem = 'INSERT INTO item(description, list_id)VALUES($1, $2)';
const selectItem = 'SELECT * FROM item WHERE description=$1 AND list_id=$2';
const selectItemsFromList = 'SELECT * FROM item WHERE list_id=$1';
const selectItemFromList = 'SELECT * FROM item WHERE id=$1 AND list_id=$2';
const selectItemById = 'SELECT * FROM item WHERE id=$1';
const deleteItem = 'DELETE FROM item WHERE id=$1';
const updateItem = (param:string): string => `UPDATE item SET ${param}=$2 WHERE id=$1`;
const updateItemWithMultipleParams = (param1:string, param2:string): string => `UPDATE item SET ${param1}=$2, ${param2}=$3 WHERE id=$1`;

export {addList, selectAllLists, selectAListByParam, deleteAList, updateAList, addItem, selectItem, selectItemsFromList, selectItemFromList, deleteItem, selectItemById, updateItem, updateItemWithMultipleParams}
