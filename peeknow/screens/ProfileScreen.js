import React from 'react';
import { StyleSheet, FlatList } from 'react-native';

// Components & Constants
import StatusCard from '../components/StatusCard';
import { COLORS } from '../constants/colors';

/**
 * FeedScreen
 * Displays the main feed of user Peeks.
 * Passes the global theme down to individual StatusCards.
 */
export default function FeedScreen({ statuses, theme }) {
  // Applies the global theme. Defaults to 'dark' if undefined.
  const activeColors = COLORS[theme || 'dark'];

  return (
    <FlatList
      data={statuses}
      // Passes the global theme prop directly to the card
      renderItem={({ item }) => <StatusCard item={item} theme={theme} />}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      // Applies dynamic background color to the list container
      contentContainerStyle={[styles.feed, { backgroundColor: activeColors.background }]}
    />
  );
}

const styles = StyleSheet.create({
  feed: { 
    paddingHorizontal: 15,
    paddingBottom: 20 
  },
});