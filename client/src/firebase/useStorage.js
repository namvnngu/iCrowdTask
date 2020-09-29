import { storage } from "./config";

const saveStorage = async (file, setNumberProgress, setUrl, setError) => {
  const storageRef = storage.ref(file.name);
  let url;
  storageRef.put(file).on(
    "state_changed",
    (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setNumberProgress(percentage);
    },
    (err) => {
      setError(err);
    },
    async () => {
      url = await storageRef.getDownloadURL();
      setUrl(url);
    }
  );
  return url;
};

export default saveStorage;
