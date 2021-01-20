import { storage } from '../firebase';

export const uploadFile = (file) => {
  const date = Date.now();
  const upload = storage.ref(`/images/${date + file.name}`).put(file);
  const promise = new Promise((resolve, reject) => {
    upload.on(
      'state_changed',
      (snapshot) => {},
      (err) => {
        console.log('ERROR', err);
        reject(null);
      },
      async () => {
        const url = await storage
          .ref(`images/`)
          .child(date + file.name)
          .getDownloadURL();
        if (url) {
          resolve(url);
        }
        reject(null);
      }
    );
  });
  return promise;
};

export const deleteFile = (file) => {
  return storage.refFromURL(file).delete();
};

export default {
  uploadFile,
  deleteFile,
};
