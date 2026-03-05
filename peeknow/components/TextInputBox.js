import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { COLORS } from '../constants/colors';

/**
 * TextInputBox
 * The typing area for new messages.
 * Now fully responsive to the global light/dark theme.
 */
export default function TextInputBox({ value, onChangeText, theme }) {
  const activeColors = COLORS[theme || 'dark'];

  return (
    <TextInput
      style={[
        styles.input, 
        { 
          backgroundColor: activeColors.surface, 
          color: activeColors.textPrimary 
        }
      ]}
      placeholder="Message..."
      placeholderTextColor={activeColors.textSecondary}
      value={value}
      onChangeText={onChangeText}
      multiline={true}
      maxLength={150}
    />
  );
}

const styles = StyleSheet.create({
  input: { 
    flex: 1, 
    borderRadius: 25, 
    paddingHorizontal: 20, 
    paddingTop: 14, 
    paddingBottom: 14, 
    fontSize: 16, 
    marginRight: 12, 
    maxHeight: 120, 
    elevation: 3 
  },
});