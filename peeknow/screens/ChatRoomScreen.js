import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Platform, BackHandler, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';

const INITIAL_MESSAGES = [
  { id: '1', text: 'Ready when you are!', sender: 'them' },
  { id: '2', text: 'Let\'s get to it.', sender: 'me' },
];

export default function ChatRoomScreen({ contactName, onBack }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);

  useEffect(() => {
    const backAction = () => {
      onBack();
      return true; 
    };
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    return () => backHandler.remove();
  }, [onBack]);

  const handleSend = (text) => {
    const newMessage = { id: Date.now().toString(), text, sender: 'me' };
    setMessages([...messages, newMessage]); 
  };

  return (
    <View style={styles.mainContainer}>
      
      {/* Copilot style minimal header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Ionicons name="menu" size={28} color="#c9d1d9" />
        </TouchableOpacity>
        <Text style={styles.headerName}>{contactName}</Text>
        <TouchableOpacity style={styles.backButton}>
           <Ionicons name="create-outline" size={24} color="#c9d1d9" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <KeyboardAwareFlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <MessageBubble text={item.text} isMine={item.sender === 'me'} />}
          contentContainerStyle={styles.messageList}
          extraScrollHeight={20} 
          enableOnAndroid={true}
        />
        <ChatInput onSend={handleSend} />
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { 
    flex: 1, 
    backgroundColor: '#0d1117', // Copilot deep dark theme
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 40 
  },
  container: { flex: 1, justifyContent: 'space-between' },
  
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    paddingHorizontal: 15, 
    paddingBottom: 15, 
  },
  backButton: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  headerName: { color: '#c9d1d9', fontSize: 18, fontWeight: '500' },
  
  messageList: { padding: 15, flexGrow: 1, justifyContent: 'flex-end' },
});