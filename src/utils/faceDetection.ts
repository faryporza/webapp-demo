import * as faceapi from 'face-api.js';

let modelsLoaded = false;
let faceDetectionNet: faceapi.SsdMobilenetv1;
let faceLandmarkNet: faceapi.FaceLandmark68Net;
let faceRecognitionNet: faceapi.FaceRecognitionNet;

export async function loadFaceDetectionModels() {
  if (modelsLoaded) {
    return;
  }
  
  // Load models from public directory
  const MODEL_URL = '/models';
  
  // Initialize the face API models
  faceDetectionNet = new faceapi.SsdMobilenetv1();
  faceLandmarkNet = new faceapi.FaceLandmark68Net();
  faceRecognitionNet = new faceapi.FaceRecognitionNet();

  // Load the models
  await Promise.all([
    faceDetectionNet.loadFromUri(MODEL_URL),
    faceLandmarkNet.loadFromUri(MODEL_URL),
    faceRecognitionNet.loadFromUri(MODEL_URL)
  ]);
  
  modelsLoaded = true;
  console.log('Face detection models loaded successfully');
}

export async function detectFace(imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement) {
  if (!modelsLoaded) {
    await loadFaceDetectionModels();
  }
  
  // Detect faces with higher confidence threshold for better accuracy
  const detections = await faceapi.detectAllFaces(imageElement, new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 }))
    .withFaceLandmarks()
    .withFaceDescriptors();
  
  return detections;
}

export async function recognizeFace(
  imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement, 
  labeledDescriptors: faceapi.LabeledFaceDescriptors[]
) {
  const detections = await detectFace(imageElement);
  
  // Create a face matcher with the descriptors
  const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors, 0.6);
  
  // Try to match each detected face with the labeled descriptors
  return detections.map(detection => {
    const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
    return {
      detection,
      match: bestMatch
    };
  });
}

export async function createFaceDescriptor(
  imageElement: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
  label: string
) {
  const detections = await detectFace(imageElement);
  
  if (detections.length === 0) {
    throw new Error('No face detected');
  }

  if (detections.length > 1) {
    throw new Error('Multiple faces detected. Please use an image with only one face.');
  }
  
  // Create labeled descriptor
  return new faceapi.LabeledFaceDescriptors(
    label, 
    [detections[0].descriptor]
  );
}
