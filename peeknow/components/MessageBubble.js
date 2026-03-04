import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

export default function MessageBubble({ text, isMine, theme }) {
  const activeColors = COLORS[theme || "light"];

  return (
    <View
      style={[
        styles.bubble,
        isMine ? styles.myBubble : styles.theirBubble,
        isMine 
          ? { backgroundColor: activeColors.primary } 
          : { backgroundColor: activeColors.surface },
      ]}
    >
      <Text 
        style={[
          styles.text, 
          { color: isMine ? "#fff" : activeColors.textPrimary }
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  myBubble: {
    alignSelf: "flex-end",
    borderBottomRightRadius: 4,
  },
  theirBubble: {
    alignSelf: "flex-start",
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
  },
});
