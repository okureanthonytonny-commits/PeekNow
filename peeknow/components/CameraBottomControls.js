import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CameraBottomControls({ flashMode, toggleFlash, takePicture, toggleCameraFacing }) {
  return (
    <View style={styles.bottomControls}>
      <TouchableOpacity onPress={toggleFlash} style={styles.sideButton}>
        <Ionicons name={flashMode === 'on' ? "flash" : "flash-outline"} size={28} color={flashMode === 'on' ? "#25D366" : "#fff"} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
        <View style={styles.shutterInner} />
      </TouchableOpacity>

      <TouchableOpacity onPress={toggleCameraFacing} style={styles.sideButton}>
        <Ionicons name="camera-reverse" size={32} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomControls: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', paddingBottom: 40, paddingHorizontal: 20 },
  sideButton: { padding: 15 },
  shutterButton: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.3)', justifyContent: 'center', alignItems: 'center' },
  shutterInner: { width: 65, height: 65, borderRadius: 32.5, backgroundColor: '#fff' },
});