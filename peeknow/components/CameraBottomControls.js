import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * CameraBottomControls
 * Renders the flash toggle, shutter button, and camera flip controls.
 * Sits over the live camera feed, so colors remain hardcoded for visibility.
 */
export default function CameraBottomControls({ 
  flashMode, 
  toggleFlash, 
  takePicture, 
  toggleCameraFacing 
}) {
  return (
    <View style={styles.bottomControls}>
      
      {/* Flash Toggle */}
      <TouchableOpacity onPress={toggleFlash} style={styles.sideButton}>
        <Ionicons 
          name={flashMode === 'on' ? "flash" : "flash-outline"} 
          size={28} 
          // Turns green when active, stays white when inactive
          color={flashMode === 'on' ? "#25D366" : "#fff"} 
        />
      </TouchableOpacity>

      {/* Main Shutter Button */}
      <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
        <View style={styles.shutterInner} />
      </TouchableOpacity>

      {/* Flip Camera Facing */}
      <TouchableOpacity onPress={toggleCameraFacing} style={styles.sideButton}>
        <Ionicons name="camera-reverse" size={32} color="#fff" />
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  bottomControls: { 
    flexDirection: 'row', 
    justifyContent: 'space-around', 
    alignItems: 'center', 
    paddingBottom: 40, 
    paddingHorizontal: 20 
  },
  sideButton: { 
    padding: 15 
  },
  shutterButton: { 
    width: 80, 
    height: 80, 
    borderRadius: 40, 
    backgroundColor: 'rgba(255,255,255,0.3)', // Translucent outer ring
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  shutterInner: { 
    width: 65, 
    height: 65, 
    borderRadius: 32.5, 
    backgroundColor: '#fff' // Solid white inner button
  },
});