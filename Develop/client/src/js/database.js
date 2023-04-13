import { openDB } from 'idb';

const initDb = async () =>
// We are creating a new database named 'jate' which will be using version 1 of the database.
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized.
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
       // Create a new object store for the data and give it an key name of 'id' which needs to increment automatically.
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
// Export a function we will use to PUT to the database.
export const putDb = async (content) =>{
  // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);
   // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readwrite');
  //Open up the desired object store.
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
	const result = await request;
	console.log(result);
  
} 

// TODO: Add logic for a method that gets all the content from the database
// Export a function we will use to GET to the database.
export const getDb = async () =>{
  // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);
   // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
  // Use the .getAll() method to get all data in the database.
  const content = await store.getAll();
  // Get confirmation of the request.
  const result = await content;
  console.log('result.value', result);
  return result?.value;
  
 

} 

// Start the database.
initDb();
