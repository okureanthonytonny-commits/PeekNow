import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform, StatusBar } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Ionicons } from "@expo/vector-icons";

// Screens & Components
import BottomNav from './components/BottomNav';
import FeedScreen from './screens/FeedScreen';
import ChatsScreen from './screens/ChatsScreen';
import ProfileScreen from './screens/ProfileScreen';
import CameraScreen from './screens/CameraScreen';
import ChatRoomScreen from './screens/ChatRoomScreen'; 

// Constants
import { COLORS } from "./constants/colors";

export default function App() {
  // 1. App State
  const [activeScreen, setActiveScreen] = useState('feed'); 
  const [activeChat, setActiveChat] = useState(null); 
  
  // 2. Global Theme State
  const [theme, setTheme] = useState('dark'); 
  const activeColors = COLORS[theme]; 
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light'); 
  
  // 3. Feed Data State
  const [statuses, setStatuses] = useState([
    { id: '1', user: 'Tony', time: '1h ago', image: 'https://picsum.photos/400/500?random=1', avatar: 'https://i.pravatar.cc/150?img=68' }
  ]); 

  // Handles saving a new photo and pushing it to the feed
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

  // -----------------------------------------
  // FULL SCREEN OVERLAYS (Hides Navigation)
  // -----------------------------------------
  
  if (activeScreen === 'camera') {
    return <CameraScreen onClose={() => setActiveScreen('feed')} onPost={handlePostPeek} />;
  }

  if (activeChat) {
    return (
      <ChatRoomScreen 
        contactName={activeChat} 
        onBack={() => setActiveChat(null)} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
    );
  }

  // -----------------------------------------
  // MAIN APP INTERFACE
  // -----------------------------------------

  return (
    <View style={[styles.container, { backgroundColor: activeColors.background }]}>
      
      {/* Top Header */}
      <View style={[styles.header, { borderBottomColor: activeColors.border }]}>
        <Text style={[styles.logo, { color: activeColors.textPrimary }]}>PeekNow</Text>
        
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
          {/* Global Theme Toggle */}
          <TouchableOpacity onPress={toggleTheme}>
            <Ionicons name={theme === 'light' ? 'moon' : 'sunny'} size={24} color={activeColors.textPrimary} />
          </TouchableOpacity>

          {/* Profile Picture / Navigation */}
          <TouchableOpacity onPress={() => setActiveScreen('profile')}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=68' }} 
              style={[styles.profilePic, { borderColor: activeColors.border }]} 
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Dynamic Screen Content */}
      {activeScreen === 'feed' && <FeedScreen statuses={statuses} theme={theme} />}
      {activeScreen === 'chats' && <ChatsScreen onOpenChat={setActiveChat} theme={theme} />}
      {activeScreen === 'profile' && <ProfileScreen theme={theme} />}

      {/* Persistent Bottom Navigation */}
      <BottomNav activeScreen={activeScreen} setScreen={setActiveScreen} theme={theme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    // Dynamically clears the system notch on Android
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 50,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 15, 
    paddingBottom: 15,
    borderBottomWidth: 1,
  },
  logo: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    letterSpacing: 1 
  },
  profilePic: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    borderWidth: 2,
  },
});