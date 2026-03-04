import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SendButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Ionicons name="send" size={18} color="#0B141A" style={{ marginLeft: 3 }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: { backgroundColor: '#25D366', width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', elevation: 3 },
});