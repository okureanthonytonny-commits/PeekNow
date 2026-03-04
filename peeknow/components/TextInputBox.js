import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function TextInputBox({ value, onChangeText }) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Message..."
      placeholderTextColor="#8696a0"
      value={value}
      onChangeText={onChangeText}
      multiline={true}
      maxLength={150}
    />
  );
}

const styles = StyleSheet.create({
  input: { flex: 1, backgroundColor: '#202C33', color: '#fff', borderRadius: 25, paddingHorizontal: 20, paddingTop: 14, paddingBottom: 14, fontSize: 16, marginRight: 12, maxHeight: 120, elevation: 3 },
});