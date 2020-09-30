import React, { useContext, useEffect, useState } from "react";
import FaceImageTaker from "../components/Face/FaceCamera";
import * as faceapi from "face-api.js";
import Cookies from "js-cookie";
import { firestore } from "../firebase/config";
import { Redirect } from "react-router-dom";
import AuthContext from "../contexts/authContext";

const FaceRecognition = () => {
  const [image, setImage] = useState(null);
  const [realFace, setRealFace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const auth = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    const collectionRef = firestore.collection("images");
    const face = Cookies.get("face");
    if (!redirect && face) {
      collectionRef.where("face", "==", face).onSnapshot((snap) => {
        snap.forEach((doc) => {
          setRealFace(doc.data().url);
          setId(doc.data().face);
        });
      });
      setLoading(false);
    }
    return () => {
      if (redirect) {
        auth.setAuth(true);
      }
    };
  }, [auth, redirect]);

  if (Cookies.get("face") === undefined) {
    return <Redirect to="/login" />;
  }

  const startProcess = () => {
    // console.log(image);
    // console.log(realFace);
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
    ]).then(start);
  };
  const start = async () => {
    setLoading(true);
    console.log(realFace);
    // Login
    const imageFace = await faceapi.bufferToImage(image);
    const detections = await faceapi
      .detectAllFaces(imageFace)
      .withFaceLandmarks()
      .withFaceDescriptors();
    if (!detections.length) {
      console.log("Wrong");
      return;
    }
    const faceMatcher = new faceapi.FaceMatcher(detections);
    // Real
    const realFaceFile = document.querySelector("#realFace");
    const singleResult = await faceapi
      .detectSingleFace(realFaceFile)
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (singleResult) {
      const bestMatch = faceMatcher.findBestMatch(singleResult.descriptor);
      console.log(bestMatch.toString());
      setLoading(false);
      let timeExpire = new Date(new Date().getTime() + 60 * 60 * 1000);
      Cookies.set("alias", id, {
        expires: timeExpire,
        sameSite: "strict",
      });
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <>
      {loading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      <div className="face-recognition-container">
        <FaceImageTaker image={image} setImage={setImage} />
        <img
          src={realFace}
          style={{ display: "none" }}
          id="realFace"
          alt="Real Face"
          crossOrigin="anonymous"
        />
        {image && (
          <div
            className="btn"
            style={{ cursor: "pointer", fontSize: "0.7rem", width: "150px" }}
            onClick={startProcess}
          >
            Start face recogition
          </div>
        )}
      </div>
    </>
  );
};

export default FaceRecognition;
