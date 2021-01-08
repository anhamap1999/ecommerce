import { storage } from '../firebase';

export const uploadFile = (file) => {
  let fileUrl = '';
  const upload = storage.ref(`/images/${file.name}`).put(file);
  upload.on(
    'state_changed',
    (snapshot) => {},
    (err) => {
      console.log('ERROR', err);
    },
    () => {
      return storage
        .ref(`images/`)
        .child(file.name)
        .getDownloadURL()
        .then((url) => {
          fileUrl = url;
        })
        .catch((err) => console.log('ERROR', err));
    }
  );
  return fileUrl;
};
