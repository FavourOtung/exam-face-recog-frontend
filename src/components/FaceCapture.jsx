import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
import { loadModels } from "../lib/face/loadModels";

export default function FaceCapture({ onDescriptor }) {
  const webcamRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [lastMsg, setLastMsg] = useState("");

  useEffect(() => {
    (async () => {
      await loadModels();
      setReady(true);
    })();
  }, []);

  const capture = async () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (!imageSrc) return setLastMsg("Camera not ready");

    setLastMsg("Processing face...");
    const img = await faceapi.fetchImage(imageSrc);

    const det = await faceapi
      .detectSingleFace(img, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!det) {
      setLastMsg("No face detected. Adjust lighting, center your face, remove glasses/caps if possible, and try again.");
      onDescriptor?.(null);
      return;
    }

    const descriptor = Array.from(det.descriptor);
    onDescriptor?.(descriptor);
    setLastMsg("Face captured successfully ✅");
  };

  return (
    <div className="space-y-2">
      <p className="text-sm text-gray-600">
        Tips: Sit in good lighting, keep your face centered, look straight, keep a neutral expression.
      </p>
      <Webcam
        ref={webcamRef}
        audio={false}
        screenshotFormat="image/png"
        className="w-full max-w-sm rounded border"
        videoConstraints={{ facingMode: "user" }}
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={capture}
          disabled={!ready}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          {ready ? "Capture Face" : "Loading models..."}
        </button>
      </div>
      {lastMsg && <p className="text-xs text-gray-700">{lastMsg}</p>}
    </div>
  );
}
