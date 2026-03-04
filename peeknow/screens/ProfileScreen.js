import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      
      {/* Profile Info */}
      <View style={styles.headerInfo}>
        <Image source={{ uri: 'https://i.pravatar.cc/150?img=68' }} style={styles.avatar} />
        <Text style={styles.name}>Tony</Text>
        <Text style={styles.username}>@tony_peek</Text>
      </View>

      {/* Stats */}
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>142</Text>
          <Text style={styles.statLabel}>Peeks</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>Friends</Text>
        </View>
      </View>

      {/* Settings Button */}
      <TouchableOpacity style={styles.settingsButton}>
        <Ionicons name="settings-outline" size={24} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0B141A', paddingHorizontal: 20, paddingTop: 20 },
  headerInfo: { alignItems: 'center', marginBottom: 30 },
  avatar: { width: 100, height: 100, borderRadius: 50, borderWidth: 3, borderColor: '#25D366', marginBottom: 15 },
  name: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  username: { color: '#8696a0', fontSize: 16, marginTop: 5 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#202C33', borderRadius: 15, paddingVertical: 20, marginBottom: 30 },
  statBox: { alignItems: 'center' },
  statNumber: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#8696a0', fontSize: 14, marginTop: 5 },
  settingsButton: { flexDirection: 'row', backgroundColor: '#202C33', padding: 15, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  settingsText: { color: '#fff', fontSize: 18, fontWeight: '600' }
});