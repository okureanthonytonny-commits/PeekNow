import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  BackHandler,
  FlatList,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ChatInput from "../components/ChatInput";
import MessageBubble from "../components/MessageBubble";
import { COLORS } from "../constants/colors";

const INITIAL_MESSAGES = [
  { id: "1", text: "Ready when you are!", sender: "them" },
  { id: "2", text: "Let's get to it.", sender: "me" },
];

/**
 * ChatRoomScreen
 * Handles individual chat threads.
 * Receives `theme` and `toggleTheme` globally from App.js.
 */
export default function ChatRoomScreen({
  contactName = "Mike",
  onBack = () => {},
  theme,
  toggleTheme,
}) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  
  // Applies the global theme prop. Defaults to 'dark' if undefined.
  const activeColors = COLORS[theme || "dark"];

  // Listens for the physical Android back button to close the chat safely
  useEffect(() => {
    const backAction = () => {
      onBack();
      return true;
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [onBack]);

  // Appends a new message to the local state
  const handleSend = (text) => {
    const newMessage = { id: Date.now().toString(), text, sender: "me" };
    setMessages([...messages, newMessage]);
  };

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: activeColors.background },
      ]}
    >
      {/* Dynamically adjusts the phone's system time/battery icons */}
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={activeColors.background}
      />

      {/* Top Header Row */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.iconButton}>
          <Ionicons
            name="chevron-back"
            size={28}
            color={activeColors.textPrimary}
          />
        </TouchableOpacity>

        <Text style={[styles.headerName, { color: activeColors.textPrimary }]}>
          {contactName}
        </Text>

        {/* Global Theme Toggle Button */}
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Ionicons
            name={theme === "light" ? "moon" : "sunny"}
            size={24}
            color={activeColors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      {/* Chat Messages and Input */}
      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              text={item.text}
              isMine={item.sender === "me"}
              theme={theme} // Passes global theme down to the message bubble
            />
          )}
          contentContainerStyle={styles.messageList}
        />
        <ChatInput onSend={handleSend} theme={theme} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // Dynamically calculates the perfect clearance for the phone's notch
    paddingTop: Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 40,
  },
  container: { flex: 1, justifyContent: "space-between" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  headerName: { fontSize: 18, fontWeight: "500" },
  messageList: { padding: 15, flexGrow: 1, justifyContent: "flex-end" },
});