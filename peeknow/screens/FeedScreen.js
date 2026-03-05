import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import StatusCard from '../components/StatusCard';
import { COLORS } from '../constants/colors';

export default function FeedScreen({ statuses, theme }) {
  const activeColors = COLORS[ theme || 'dark'];


  return (
    <FlatList
      data={statuses}
      renderItem={({ item }) => <StatusCard item={item} theme={theme} /> }
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.feed, { backgroundColor: activeColors.background } ]}/>
  );
}

const styles = StyleSheet.create({
  feed: { paddingHorizontal: 15,
    paddingBottom: 20
  },
});