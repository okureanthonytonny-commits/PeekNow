import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function BottomNav({ activeScreen, setScreen, theme }) {
  const activeColors = COLORS[theme || 'dark'];

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background, borderTopColor: activeColors.border }]}>
      <TouchableOpacity onPress={() => setScreen('chats')} style={styles.iconButton}>
        <Ionicons name="chatbubbles" size={28} color={activeScreen === 'chats' ? activeColors.primary : activeColors.textSecondary} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('camera')} style={styles.cameraButton}>
        <Ionicons name="camera" size={32} color="#fff" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setScreen('feed')} style={styles.iconButton}>
        <Ionicons name="albums" size={28} color={activeScreen === 'feed' ? activeColors.primary : activeColors.textSecondary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingBottom: 30, 
    borderTopWidth: 1,
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
    elevation: 5,
  }
});