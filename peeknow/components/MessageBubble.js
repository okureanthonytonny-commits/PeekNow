import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function MessageBubble({ text, isMine }) {
  return (
    <View style={[styles.bubble, isMine ? styles.myBubble : styles.theirBubble]}>
      <Text style={styles.messageText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: { 
    maxWidth: '80%', 
    paddingHorizontal: 16, 
    paddingVertical: 12, 
    borderRadius: 16, 
    marginBottom: 12 
  },
  myBubble: { 
    backgroundColor: '#2b3139', // Copilot dark grey
    alignSelf: 'flex-end', 
    borderBottomRightRadius: 4 
  },
  theirBubble: { 
    backgroundColor: '#1c2128', // Slightly darker for contrast
    alignSelf: 'flex-start', 
    borderBottomLeftRadius: 4 
  },
  messageText: { color: '#e2e8f0', fontSize: 16, lineHeight: 22 },
});