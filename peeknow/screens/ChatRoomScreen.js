import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
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

export default function ChatRoomScreen({
  contactName = "Mike",
  onBack = () => {},
}) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [theme, setTheme] = useState("light");
  const activeColors = COLORS[theme];

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

  const handleSend = (text) => {
    const newMessage = { id: Date.now().toString(), text, sender: "me" };
    setMessages([...messages, newMessage]);
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <View
      style={[
        styles.mainContainer,
        { backgroundColor: activeColors.background },
      ]}>
      <StatusBar
        barStyle={theme === "light" ? "dark-content" : "light-content"}
        backgroundColor={activeColors.background}
      />

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

        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Ionicons
            name={theme === "light" ? "moon" : "sunny"}
            size={24}
            color={activeColors.textPrimary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble
              text={item.text}
              isMine={item.sender === "me"}
              theme={theme}
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
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) + 10 : 40,
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
