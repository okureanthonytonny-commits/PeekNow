import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PreviewControls({ photoUri, onRetake, onPost }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUri }} style={styles.previewImage} />
      
      {/* Top Left: Cancel / Retake */}
      <View style={styles.topControls}>
        <TouchableOpacity onPress={onRetake} style={styles.iconButton}>
          <Ionicons name="close-outline" size={36} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Bottom Right: Post Peek */}
      <View style={styles.bottomControls}>
        <TouchableOpacity style={styles.postButton} onPress={() => onPost(photoUri)}>
          <Text style={styles.buttonText}>Post Peek</Text>
          <Ionicons name="send" size={18} color="#000" style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  previewImage: { flex: 1, width: '100%', resizeMode: 'cover', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0 },
  
  topControls: { position: 'absolute', top: 40, left: 20, zIndex: 10 },
  iconButton: { backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 20, padding: 5 },
  
  // Adjusted to push the button to the right
  bottomControls: { position: 'absolute', bottom: 40, left: 20, right: 20, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' },
  
  postButton: { backgroundColor: '#25D366', flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 25 },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' }
});