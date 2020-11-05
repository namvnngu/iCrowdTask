import { fireStorage } from "./config";

const UploadImage = (file, setProgress, setError, urls, setUrls, urlArr) => {
  // References
  let url;
  const storageRef = fireStorage.ref(file.name);
  storageRef.put(file).on(
    "state_changed",
    (snap) => {
      let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
      setProgress(percentage);
    },
    (err) => setError(err),
    async () => {
      url = await storageRef.getDownloadURL();
      setUrls((urls) => [...urls, url]);
      urlArr.urls.push(url);
    }
  );
};

export default UploadImage;
