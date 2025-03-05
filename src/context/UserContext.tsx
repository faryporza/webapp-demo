import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import { loadFaceDetectionModels, createFaceDescriptor, recognizeFace } from '../utils/faceDetection';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  faceDescriptor?: faceapi.LabeledFaceDescriptors;
}

interface UserContextProps {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isFaceAuthEnabled: boolean;
  faceDescriptors: faceapi.LabeledFaceDescriptors[];
  login: (email: string, password: string) => Promise<boolean>;
  loginWithFace: (detections: faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }, faceapi.FaceLandmarks68>>[]) => Promise<boolean>;
  logout: () => void;
  registerFace: (imageElement: HTMLVideoElement) => Promise<void>;
  setFaceAuthEnabled: (enabled: boolean) => void;
  toggleFaceAuthEnabled: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

// Demo users for testing
const demoUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  }
];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFaceAuthEnabled, setIsFaceAuthEnabled] = useState(false);
  const [faceDescriptors, setFaceDescriptors] = useState<faceapi.LabeledFaceDescriptors[]>([]);

  // Load face detection models on initialization
  useEffect(() => {
    const initFaceApi = async () => {
      try {
        await loadFaceDetectionModels();
        
        // Load stored face descriptors from localStorage if available
        const storedDescriptors = localStorage.getItem('faceDescriptors');
        if (storedDescriptors) {
          // In a real app, you would properly deserialize the face descriptors
          // This is a simplified example
          console.log('Face descriptors found in storage');
        }
        
      } catch (error) {
        console.error('Error initializing face API:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initFaceApi();
  }, []);

  // Check if user was previously logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing stored user:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Traditional login
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = demoUsers.find(u => u.email === email);
    
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  // Login with face detection
  const loginWithFace = async (detections: faceapi.WithFaceDescriptor<faceapi.WithFaceLandmarks<{ detection: faceapi.FaceDetection }, faceapi.FaceLandmarks68>>[]): Promise<boolean> => {
    if (!isFaceAuthEnabled || faceDescriptors.length === 0) {
      return false;
    }

    setIsLoading(true);
    
    try {
      // Create temporary canvas for the detection
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const detection = detections[0]; // Use the first detected face
      
      if (detection) {
        // Attempt to match the face
        const matches = faceDescriptors.map(desc => {
          const faceMatcher = new faceapi.FaceMatcher(desc, 0.6);
          return faceMatcher.findBestMatch(detection.descriptor);
        });
        
        // Find if there's a match with high confidence
        const bestMatch = matches.find(match => match.distance < 0.5);
        
        if (bestMatch && bestMatch.label !== 'unknown') {
          const userId = bestMatch.label;
          const user = demoUsers.find(u => u.id === userId);
          
          if (user) {
            setCurrentUser(user);
            setIsAuthenticated(true);
            localStorage.setItem('currentUser', JSON.stringify(user));
            setIsLoading(false);
            return true;
          }
        }
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('Face login error:', error);
      setIsLoading(false);
      return false;
    }
  };

  // Register a face for the current user
  const registerFace = async (videoElement: HTMLVideoElement): Promise<void> => {
    if (!currentUser) {
      throw new Error('No user is currently logged in');
    }

    try {
      setIsLoading(true);
      
      const faceDescriptor = await createFaceDescriptor(videoElement, currentUser.id);
      
      // Update face descriptors
      setFaceDescriptors(prev => {
        // Remove any existing descriptor for this user
        const filtered = prev.filter(desc => desc.label !== currentUser.id);
        return [...filtered, faceDescriptor];
      });
      
      // Enable face authentication
      setIsFaceAuthEnabled(true);
      
      // In a real app, you would store this server-side
      // For demo, we'll just log it
      console.log('Face registered for user:', currentUser.id);
      
    } catch (error) {
      console.error('Error registering face:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const toggleFaceAuthEnabled = () => {
    setIsFaceAuthEnabled(!isFaceAuthEnabled);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        isLoading,
        isFaceAuthEnabled,
        faceDescriptors,
        login,
        loginWithFace,
        logout,
        registerFace,
        setFaceAuthEnabled,
        toggleFaceAuthEnabled
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
