import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import StatusCard from '../components/StatusCard';

export default function FeedScreen({ statuses }) {
  return (
    <FlatList
      data={statuses}
      renderItem={({ item }) => <StatusCard item={item} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.feed}
    />
  );
}

const styles = StyleSheet.create({
  feed: { paddingHorizontal: 15, paddingBottom: 20 },
});