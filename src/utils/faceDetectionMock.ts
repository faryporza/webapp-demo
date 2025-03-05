// This is a mock implementation of face detection utilities
// for development purposes when face-api.js is not installed

// Mock face detection types to match face-api.js structure
export interface FaceDetection {
  box: { x: number; y: number; width: number; height: number };
  score: number;
}

export interface FaceLandmarks68 {
  positions: Array<{ x: number; y: number }>;
  shift: (point: { x: number; y: number }) => FaceLandmarks68;
}

export interface WithFaceLandmarks<T, U> {
  detection: T;
  landmarks: U;
  descriptor?: Float32Array;
}

export interface WithFaceDescriptor<T> {
  descriptor: Float32Array;
  detection: T extends { detection: any } ? T['detection'] : any;
  landmarks: T extends { landmarks: any } ? T['landmarks'] : any;
}

export class LabeledFaceDescriptors {
  constructor(public label: string, public descriptors: Float32Array[]) {}
}

// Mock implementations of face detection functions
export async function loadFaceDetectionModels(): Promise<void> {
  console.log('[MOCK] Face detection models loaded successfully');
  return Promise.resolve();
}

export async function detectFace(element: HTMLElement): Promise<WithFaceDescriptor<WithFaceLandmarks<{ detection: FaceDetection }, FaceLandmarks68>>[]> {
  // Return empty array for mock implementation
  console.log('[MOCK] Detecting faces (mock)');
  return Promise.resolve([]);
}

export async function createFaceDescriptor(element: HTMLElement, label: string): Promise<LabeledFaceDescriptors> {
  // Create a mock face descriptor
  console.log(`[MOCK] Created face descriptor for ${label}`);
  
  // Create a mock Float32Array with 128 random values (typical descriptor length)
  const mockDescriptor = new Float32Array(128);
  for (let i = 0; i < 128; i++) {
    mockDescriptor[i] = Math.random() - 0.5; // Random values between -0.5 and 0.5
  }
  
  return new LabeledFaceDescriptors(label, [mockDescriptor]);
}

export async function recognizeFace(
  element: HTMLElement, 
  labeledDescriptors: LabeledFaceDescriptors[]
): Promise<any[]> {
  console.log('[MOCK] Recognizing faces (mock)');
  return Promise.resolve([]);
}

// Mock draw utilities
export const draw = {
  drawDetections: () => {},
  drawFaceLandmarks: () => {},
  drawFaceExpressions: () => {},
};
