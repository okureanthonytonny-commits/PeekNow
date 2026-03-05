import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/colors";

/**
 * MessageBubble
 * Renders individual chat messages.
 * Adapts colors based on sender (me vs. them) and global theme.
 */
export default function MessageBubble({ text, isMine, theme }) {
  // Defaults to dark if no theme is passed
  const activeColors = COLORS[theme || "dark"];

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
          // Keeps your messages white for contrast, adapts their messages to the theme
          { color: isMine ? "#fff" : activeColors.textPrimary }
        ]}
      >
        {text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubble: { maxWidth: "80%", padding: 12, borderRadius: 20, marginBottom: 10 },
  myBubble: { alignSelf: "flex-end", borderBottomRightRadius: 4 },
  theirBubble: { alignSelf: "flex-start", borderBottomLeftRadius: 4 },
  text: { fontSize: 16 },
});