import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import BottomNav from './components/BottomNav';
import FeedScreen from './screens/FeedScreen';
import ChatsScreen from './screens/ChatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './screens/CameraScreen';
import ChatRoomScreen from './screens/ChatRoomScreen'; // <-- 1. Imported new screen

export default function App() {
  const [activeScreen, setActiveScreen] = useState('feed');
  const [activeChat, setActiveChat] = useState(null); // <-- 2. New state for active chat
  
  const [statuses, setStatuses] = useState([
    { id: '1', user: 'Tony', time: '1h ago', image: 'https://picsum.photos/400/500?random=1', avatar: 'https://i.pravatar.cc/150?img=68' }
  ]);

  const handlePostPeek = async (imageUri) => {
    try {
      const { granted } = await MediaLibrary.requestPermissionsAsync();
      if (granted) await MediaLibrary.saveToLibraryAsync(imageUri);
    } catch (error) {
      console.log("Gallery save skipped:", error);
    }

    const currentTime = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    const newPeek = {
      id: Date.now().toString(),
      user: 'Tony',
      time: currentTime,
      image: imageUri,
      avatar: 'https://i.pravatar.cc/150?img=68'
    };
    
    setStatuses([newPeek, ...statuses]); 
    setActiveScreen('feed'); 
  };

  if (activeScreen === 'camera') {
    return <CameraScreen onClose={() => setActiveScreen('feed')} onPost={handlePostPeek} />;
  }

  // 3. Render ChatRoom if a chat is selected
  if (activeChat) {
    return <ChatRoomScreen contactName={activeChat} onBack={() => setActiveChat(null)} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>PeekNow</Text>
        <TouchableOpacity onPress={() => setActiveScreen('profile')}>
          <Image source={{ uri: 'https://i.pravatar.cc/150?img=68' }} style={styles.profilePic} />
        </TouchableOpacity>
      </View>

      {activeScreen === 'feed' && <FeedScreen statuses={statuses} />}
      {/* 4. Pass the open function to ChatsScreen */}
      {activeScreen === 'chats' && <ChatsScreen onOpenChat={setActiveChat} />}
      {activeScreen === 'profile' && <ProfileScreen />}

      <BottomNav activeScreen={activeScreen} setScreen={setActiveScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B141A', paddingTop: 40 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingBottom: 15 },
  logo: { color: '#fff', fontSize: 24, fontWeight: 'bold', letterSpacing: 1 },
  profilePic: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#202C33' },
});