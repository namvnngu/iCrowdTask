import React, { useEffect } from "react";
// import { firestore } from "../firebase/config";

const FaceRecognition = () => {
  // const collectionRef = firestore.collection("images");
  // collectionRef
  //   .where("email", "==", "vnngu@deakin.edu.au")
  //   .onSnapshot((snap) => {
  //     snap.forEach((doc) => console.log(doc.data()));
  //   });
  const handleSuccess = (stream) => {
    let video = document.querySelector(".face-recognition-container video");
    window.stream = stream;
    video.srcObject = stream;
  };
  const handleError = (error) => {
    console.log(error);
  };
  useEffect(() => {
    navigator.getUserMedia({ video: true }, handleSuccess, handleError);
  }, []);
  return (
    <div className="face-recognition-container">
      <video height="560" width="720" autoPlay muted></video>
    </div>
  );
};

export default FaceRecognition;
