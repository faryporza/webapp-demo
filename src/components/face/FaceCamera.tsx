import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { detectFace } from '../../utils/faceDetection';

interface FaceCameraProps {
  onFaceDetected?: (detections: faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }, faceapi.FaceLandmarks68>>[]) => void;
  onNoFaceDetected?: () => void;
  active: boolean;
  width?: number;
  height?: number;
}

const FaceCamera: React.FC<FaceCameraProps> = ({ 
  onFaceDetected, 
  onNoFaceDetected, 
  active, 
  width = 320, 
  height = 240 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Start camera when component mounts and active is true
  useEffect(() => {
    if (active) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => {
      stopCamera();
    };
  }, [active]);

  // Start the camera stream
  const startCamera = async () => {
    try {
      const constraints = { 
        video: { 
          width: { ideal: width }, 
          height: { ideal: height },
          facingMode: 'user' 
        } 
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setError(null);
        
        // Wait for video to be ready
        videoRef.current.addEventListener('loadeddata', () => {
          setIsReady(true);
        });
      }
    } catch (err) {
      setError('Could not access camera. Please enable camera access permissions.');
      console.error('Error accessing camera:', err);
    }
  };

  // Stop the camera stream
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsReady(false);
  };

  // Process video frames to detect faces
  useEffect(() => {
    let animationFrameId: number;
    let active = true;
    
    const detectFaces = async () => {
      if (!isReady || !videoRef.current || !canvasRef.current || !active) return;
      
      try {
        const detections = await detectFace(videoRef.current);
        
        // Draw detections on canvas
        const ctx = canvasRef.current.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(videoRef.current, 0, 0, width, height);
          
          // Draw face detection boxes
          faceapi.draw.drawDetections(canvasRef.current, detections.map(d => d.detection));
          faceapi.draw.drawFaceLandmarks(canvasRef.current, detections.map(d => d.landmarks));
          
          // Callback with detected faces
          if (detections.length > 0) {
            if (onFaceDetected) onFaceDetected(detections);
          } else {
            if (onNoFaceDetected) onNoFaceDetected();
          }
        }
      } catch (err) {
        console.error('Error processing video frame', err);
      }
      
      if (active) {
        animationFrameId = requestAnimationFrame(detectFaces);
      }
    };
    
    if (isReady) {
      detectFaces();
    }
    
    return () => {
      active = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isReady, onFaceDetected, onNoFaceDetected, width, height]);

  return (
    <div className="relative w-full">
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-100 text-red-700 text-sm p-2 rounded">
          {error}
        </div>
      )}
      <div className="relative" style={{ width, height }}>
        <video 
          ref={videoRef}
          className="absolute inset-0 z-0"
          width={width}
          height={height}
          autoPlay
          playsInline
          muted
          style={{ transform: 'scaleX(-1)' }} // Mirror effect
        />
        <canvas 
          ref={canvasRef}
          className="absolute inset-0 z-10"
          width={width}
          height={height}
          style={{ transform: 'scaleX(-1)' }} // Mirror effect
        />
      </div>
    </div>
  );
};

export default FaceCamera;
