import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { COLORS } from "../constants/colors";

export default function ChatInput({ onSend, theme }) {
  const [text, setText] = useState("");
  const [keyboardPadding, setKeyboardPadding] = useState(
    Platform.OS === "android" ? 15 : 20,
  );
  const activeColors = COLORS[theme || "light"];

  useEffect(() => {
    const showSub = Keyboard.addListener("keyboardDidShow", (e) =>
      setKeyboardPadding(e.endCoordinates.height - 40),
    );
    const hideSub = Keyboard.addListener("keyboardDidHide", () =>
      setKeyboardPadding(Platform.OS === "android" ? 15 : 20),
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: keyboardPadding,
          backgroundColor: activeColors.background,
        },
      ]}>
      <View
        style={[
          styles.pillContainer,
          {
            backgroundColor: activeColors.surface,
            borderColor: activeColors.border,
          },
        ]}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={24} color={activeColors.textSecondary} />
        </TouchableOpacity>

        <TextInput
          style={[styles.input, { color: activeColors.textPrimary }]}
          placeholder="Message..."
          placeholderTextColor={activeColors.textSecondary}
          value={text}
          onChangeText={setText}
          multiline={true}
          maxLength={150}
        />

        <TouchableOpacity style={styles.iconButton} onPress={handleSend}>
          <Ionicons
            name={text.trim() ? "send" : "mic-outline"}
            size={22}
            color={
              text.trim() ? activeColors.primary : activeColors.textSecondary
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, paddingTop: 10 },
  pillContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 30,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
  },
  iconButton: { padding: 8, justifyContent: "center", alignItems: "center" },
  input: {
    flex: 1,
    fontSize: 16,
    maxHeight: 100,
    paddingHorizontal: 8,
    paddingVertical: 8,
    textAlignVertical: "top",
  },
});
