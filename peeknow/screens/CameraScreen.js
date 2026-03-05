import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from '@expo/vector-icons';

// Components
import PreviewControls from '../components/PreviewControls';
import CameraBottomControls from '../components/CameraBottomControls';

/**
 * CameraScreen
 * Handles camera permissions, capturing photos, and saving to the device gallery.
 * Renders a full-screen camera viewfinder and swaps to PreviewControls after a photo is taken.
 */
export default function CameraScreen({ onClose, onPost }) {
  // 1. Permissions State
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  
  // 2. Camera Controls State
  const [capturedImage, setCapturedImage] = useState(null);
  const [facing, setFacing] = useState('back');
  const [flashMode, setFlashMode] = useState('off');
  const cameraRef = useRef(null);

  // Loading state while checking permissions
  if (!permission) return <View style={styles.container} />;

  // Permission Denied UI
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>PeekNow needs your camera.</Text>
        <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
          <Text style={styles.permissionText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // -----------------------------------------
  // CAMERA ACTIONS
  // -----------------------------------------

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setCapturedImage(photo.uri); 
    }
  };

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode(current => (current === 'off' ? 'on' : 'off'));
  };

  // Requests media permissions and saves the image to the local phone gallery
  const saveToGallery = async () => {
    if (!mediaPermission?.granted) {
      const newPermission = await requestMediaPermission();
      if (!newPermission.granted) {
        Alert.alert('Permission needed', 'Allow PeekNow to save photos.');
        return;
      }
    }
    await MediaLibrary.saveToLibraryAsync(capturedImage);
    Alert.alert('Saved!', 'Peek saved to your gallery.');
  };

  // -----------------------------------------
  // RENDER UI
  // -----------------------------------------

  // If a photo was just taken, show the preview screen instead of the live camera
  if (capturedImage) {
    return (
      <PreviewControls 
        photoUri={capturedImage} 
        onRetake={() => setCapturedImage(null)} 
        onPost={onPost} 
        onSave={saveToGallery} 
      />
    );
  }

  // Active Camera Viewfinder
  return (
    <View style={styles.container}>
      <CameraView 
        style={styles.camera} 
        facing={facing} 
        flash={flashMode} 
        ref={cameraRef} 
        mirror={true}
      >
        
        {/* Top Header Controls */}
        <View style={styles.topControls}>
          <TouchableOpacity onPress={onClose} style={styles.iconButton}>
            <Ionicons name="close" size={32} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Bottom Shutter & Settings Controls */}
        <CameraBottomControls 
          flashMode={flashMode} 
          toggleFlash={toggleFlash} 
          takePicture={takePicture} 
          toggleCameraFacing={toggleCameraFacing} 
        />

      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000', // Pitch black for camera frame
    justifyContent: 'center' 
  },
  message: { 
    color: '#fff', 
    textAlign: 'center', 
    marginBottom: 20, 
    fontSize: 16 
  },
  permissionButton: { 
    backgroundColor: '#25D366', 
    padding: 15, 
    borderRadius: 10, 
    alignSelf: 'center' 
  },
  permissionText: { 
    color: '#000', 
    fontWeight: 'bold' 
  },
  camera: { 
    flex: 1, 
    justifyContent: 'space-between' 
  },
  topControls: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20, 
    marginTop: 40 
  },
  iconButton: { 
    padding: 10 
  }
});