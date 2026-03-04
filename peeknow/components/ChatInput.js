import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Keyboard, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const showSub = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true));
    const hideSub = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false));
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = () => {
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <View style={[styles.container, { paddingBottom: isKeyboardVisible ? 15 : 100 }]}>
      <View style={styles.pillContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={24} color="#8b949e" />
        </TouchableOpacity>

        <TextInput
          style={styles.input}
          placeholder="Message..."
          placeholderTextColor="#8b949e"
          value={text}
          onChangeText={setText}
          multiline={true}
          maxLength={150}
        />

        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Ionicons name={text.trim() ? "send" : "mic-outline"} size={22} color={text.trim() ? "#58a6ff" : "#8b949e"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingTop: 10,
    backgroundColor: 'transparent',
  },
  pillContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161b22', 
    borderRadius: 30, 
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#30363d',
  },
  iconButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: '#c9d1d9',
    fontSize: 16,
    maxHeight: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlignVertical: 'top', 
  }
});