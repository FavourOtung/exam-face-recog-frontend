import * as faceapi from "face-api.js";

let loaded = false;

export async function loadModels() {
  if (loaded) return true;
  // const URL = "/models"; // served from public/models
  try{
    const MODEL_URL = 'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights';
  
  await Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
    faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
    faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
  ]);
    loaded = true;
    console.log("All models loaded");
    return true;
  } catch(error) {
    console.log("Model load error:", error);
    return false;
  };


}

