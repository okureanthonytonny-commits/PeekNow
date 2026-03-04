import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Alert } from 'react-native';

const INITIAL_CHATS = [
  { id: '1', name: 'Sarah', lastMessage: 'Sent a peek', time: '10:05 AM', avatar: 'https://i.pravatar.cc/150?img=47', hasNewPeek: true, isUnread: true },
  { id: '2', name: 'Mike', lastMessage: 'Are we still on for later?', time: '9:30 AM', avatar: 'https://i.pravatar.cc/150?img=12', hasNewPeek: false, isUnread: true },
  { id: '3', name: 'Emma', lastMessage: 'That was hilarious', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=5', hasNewPeek: false, isUnread: false },
  { id: '4', name: 'David', lastMessage: 'Bro check this out', time: 'Tuesday', avatar: 'https://i.pravatar.cc/150?img=33', hasNewPeek: true, isUnread: false },
];

export default function ChatsScreen({ onOpenChat }) {
  const [chats, setChats] = useState(INITIAL_CHATS);

  const handleViewPeek = (id, name) => {
    setChats(chats.map(chat => chat.id === id ? { ...chat, hasNewPeek: false } : chat));
    Alert.alert('Public Peek', `Viewing ${name}'s public Peek!`);
  };

  const handleOpenChat = (id, name) => {
    setChats(chats.map(chat => chat.id === id ? { ...chat, isUnread: false } : chat));
    // navigation function
    onOpenChat(name);
  };

  const renderItem = ({ item }) => (
    <View style={styles.chatRow}>
      
      <TouchableOpacity 
        onPress={() => handleViewPeek(item.id, item.name)} 
        style={[styles.avatarContainer, item.hasNewPeek && styles.unreadRing]}
      >
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => handleOpenChat(item.id, item.name)} style={styles.chatInfo}>
        <View style={styles.nameTimeRow}>
          <Text style={[styles.name, item.isUnread && styles.unreadText]}>{item.name}</Text>
          <Text style={[styles.time, item.isUnread && styles.unreadTime]}>{item.time}</Text>
        </View>
        <Text style={[styles.lastMessage, item.isUnread && styles.unreadText]} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </TouchableOpacity>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Messages</Text>
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
  container: { flex: 1, backgroundColor: '#0B141A', paddingHorizontal: 20 },
  pageTitle: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginBottom: 20 },
  chatRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 25 },
  avatarContainer: { marginRight: 15, borderRadius: 32, padding: 2 },
  unreadRing: { borderWidth: 2, borderColor: '#25D366' },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  chatInfo: { flex: 1, borderBottomWidth: 1, borderBottomColor: '#202C33', paddingBottom: 15, justifyContent: 'center' },
  nameTimeRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  name: { color: '#fff', fontSize: 18, fontWeight: '400' },
  time: { color: '#8696a0', fontSize: 12 },
  lastMessage: { color: '#8696a0', fontSize: 15 },
  unreadText: { color: '#fff', fontWeight: 'bold' },
  unreadTime: { color: '#25D366', fontWeight: 'bold' },
});