import {storage } from '../firebase'
export const uploadFile = ( file ) => {
  const upload = storage.ref(`/images/${file.name}`).put(file);
  const promise = new Promise((resolve, reject) => {
    upload.on(
      'state_changed' ,
      (snapshot) => {},
      (err) => {
        console.log('ERROR', err);
        reject(null);
      }
      ,
      async() => {
        const url = await storage
          .ref('images/')
          .child(file.name)
          .getDownloadURL();
        if (url) {
          resolve(url);
        }
        reject(null);
      }
    );
  })
  return promise;
};