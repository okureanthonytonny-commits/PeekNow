import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../constants/colors';

const INITIAL_CHATS = [
  { id: '1', name: 'Sarah', lastMessage: 'Sent a peek', time: '10:05 AM', avatar: 'https://i.pravatar.cc/150?img=47', hasNewPeek: true, isUnread: true },
  { id: '2', name: 'Mike', lastMessage: 'Are we still on for later?', time: '9:30 AM', avatar: 'https://i.pravatar.cc/150?img=12', hasNewPeek: false, isUnread: true },
  { id: '3', name: 'Emma', lastMessage: 'That was hilarious', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=5', hasNewPeek: false, isUnread: false },
  { id: '4', name: 'David', lastMessage: 'Bro check this out', time: 'Tuesday', avatar: 'https://i.pravatar.cc/150?img=33', hasNewPeek: true, isUnread: false },
];

export default function ChatsScreen({ onOpenChat, theme }) {
  const [chats, setChats] = useState(INITIAL_CHATS);
  const activeColors = COLORS[theme || 'dark'];

  // Clears the green ring when a user views the Peek
  const handleViewPeek = (id, name) => {
    setChats(chats.map(chat => chat.id === id ? { ...chat, hasNewPeek: false } : chat));
    Alert.alert('Public Peek', `Viewing ${name}'s public Peek!`);
  };
  
  // Marks chat as read and triggers the navigation up to App.js
  const handleOpenChat = (id, name) => {
    setChats(chats.map(chat => chat.id === id ? { ...chat, isUnread: false } : chat));
    onOpenChat(name);
  };

  const renderItem = ({ item }) => (
    <View style={styles.chatRow}>
      
      {/* Avatar & Peek Status */}
      <TouchableOpacity 
        onPress={() => handleViewPeek(item.id, item.name)} 
        style={[styles.avatarContainer, item.hasNewPeek && styles.unreadRing]}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </TouchableOpacity>
      
      {/* Chat Info */}
      <TouchableOpacity onPress={() => handleOpenChat(item.id, item.name)} style={styles.chatInfo}>
        <View style={styles.nameTimeRow}>
          <Text style={[
            styles.name, 
            { color: activeColors.textPrimary },
            item.isUnread && styles.unreadText
          ]}>
            {item.name}
          </Text>
          <Text style={[
            styles.time, 
            { color: activeColors.textSecondary },
            item.isUnread && styles.unreadTime
          ]}>
            {item.time}
          </Text>
        </View>
        <Text 
          style={[
            styles.lastMessage, 
            // Makes unread messages brighter so they stand out
            { color: item.isUnread ? activeColors.textPrimary : activeColors.textSecondary },
            item.isUnread && styles.unreadText
          ]} 
          numberOfLines={1}
        >
          {item.lastMessage}
        </Text>
      </TouchableOpacity>
      
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      <Text style={[styles.pageTitle, { color: activeColors.textPrimary }]}>Messages</Text>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  pageTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  chatRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  avatarContainer: { marginRight: 15, borderRadius: 32, padding: 2 },
  unreadRing: { borderWidth: 2, borderColor: '#25D366' }, // Accent green stays hardcoded
  avatar: { width: 56, height: 56, borderRadius: 28 },
  chatInfo: { flex: 1, paddingBottom: 15, justifyContent: 'center' },
  nameTimeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  name: { fontSize: 18, fontWeight: '400' },
  time: { fontSize: 12 }, // Removed hardcoded gray
  lastMessage: { fontSize: 15 }, // Removed hardcoded gray
  unreadText: { fontWeight: 'bold' },
  unreadTime: { color: '#25D366', fontWeight: 'bold' },
});