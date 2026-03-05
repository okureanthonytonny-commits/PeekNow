import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

/**
 * PreviewControls
 * Shown immediately after taking a photo. 
 * Allows the user to retake, save to gallery, or post the image.
 */
export default function PreviewControls({ photoUri, onRetake, onPost, onSave }) {
  return (
    <View style={styles.container}>
      {/* Full Screen Image Preview */}
      <Image source={{ uri: photoUri }} style={styles.previewImage} />
      
      {/* Top Left: Cancel / Retake */}
      <View style={styles.topControls}>
        <TouchableOpacity onPress={onRetake} style={styles.iconButton}>
          <Ionicons name="close-outline" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Controls: Save (Left) and Post (Right) */}
      <View style={styles.bottomControls}>
        
        {/* NEW: Save to Gallery Button */}
        <TouchableOpacity style={styles.iconButton} onPress={onSave}>
          <Ionicons name="download-outline" size={28} color="#fff" />
        </TouchableOpacity>

        {/* Post Peek Button */}
        <TouchableOpacity style={styles.postButton} onPress={() => onPost(photoUri)}>
          <Text style={styles.buttonText}>Post Peek</Text>
          <Ionicons name="send" size={18} color="#000" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#000' 
  },
  previewImage: { 
    flex: 1, 
    width: '100%', 
    resizeMode: 'cover', 
    position: 'absolute', 
    top: 0, 
    bottom: 0, 
    left: 0, 
    right: 0 
  },
  topControls: { 
    position: 'absolute', 
    top: 40, 
    left: 20, 
    zIndex: 10 
  },
  iconButton: { 
    backgroundColor: 'rgba(0,0,0,0.5)', 
    borderRadius: 20, 
    padding: 10 // Slightly increased padding for easier tapping
  },
  bottomControls: { 
    position: 'absolute', 
    bottom: 40, 
    left: 20, 
    right: 20, 
    flexDirection: 'row', 
    justifyContent: 'space-between', // Pushes buttons to opposite sides
    alignItems: 'center' 
  },
  postButton: { 
    backgroundColor: '#25D366', 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingVertical: 15, 
    paddingHorizontal: 25, 
    borderRadius: 25 
  },
  buttonText: { 
    color: '#000', 
    fontSize: 16, 
    fontWeight: 'bold' 
  }
});