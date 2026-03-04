import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ activeScreen, setScreen }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setScreen('chats')} style={styles.iconButton}>
        <Ionicons name="chatbubbles" size={28} color={activeScreen === 'chats' ? '#0a7ea4' : '#687076'} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('camera')} style={styles.cameraButton}>
        <Ionicons name="camera" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('feed')} style={styles.iconButton}>
        <Ionicons name="albums" size={28} color={activeScreen === 'feed' ? '#0a7ea4' : '#687076'} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#8f4c4c',
    paddingVertical: 10,
    paddingBottom: 30, 
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
  iconButton: { padding: 10 },
  cameraButton: {
    backgroundColor: '#25D366', 
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  }
});