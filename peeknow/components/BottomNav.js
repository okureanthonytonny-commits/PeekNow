import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function BottomNav({ activeScreen, setScreen }) {
  return (
    <View style={styles.bottomNav}>
      
      {/* Chats Button */}
      <TouchableOpacity style={styles.navItem} onPress={() => setScreen('chats')}>
        <Ionicons 
          name={activeScreen === 'chats' ? "chatbubble" : "chatbubble-outline"} 
          size={28} 
          color={activeScreen === 'chats' ? "#25D366" : "#8696a0"} 
        />
      </TouchableOpacity>
      
      {/* Camera Button */}
      <TouchableOpacity style={styles.cameraButton} onPress={() => setScreen('camera')}>
        <Ionicons name="camera" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Feed (Statuses) Button */}
      <TouchableOpacity style={styles.navItem} onPress={() => setScreen('feed')}>
        <Ionicons 
          name={activeScreen === 'feed' ? "albums" : "albums-outline"} 
          size={28} 
          color={activeScreen === 'feed' ? "#25D366" : "#8696a0"} 
        />
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center',
paddingTop: 15, 
paddingBottom: 30,
backgroundColor: '#0B141A', borderTopWidth: 1, borderTopColor: '#202C33' },
  navItem: { padding: 10 },
  cameraButton: { backgroundColor: '#25D366', width: 65, height: 65, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginBottom: 20, shadowColor: '#25D366', shadowOpacity: 0.3, shadowRadius: 10 },
});