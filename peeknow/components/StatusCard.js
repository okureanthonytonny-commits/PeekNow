import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function StatusCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.statusImage} />
      
      <View style={styles.cardOverlay}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { marginBottom: 20, borderRadius: 20, overflow: 'hidden', backgroundColor: '#202C33' },
  statusImage: { width: '100%', height: 450 },
  cardOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: 'rgba(0,0,0,0.5)' },
  avatar: { width: 45, height: 45, borderRadius: 25, marginRight: 15, borderWidth: 2, borderColor: '#25D366' },
  userName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  time: { color: '#ccc', fontSize: 12, marginTop: 2 },
});