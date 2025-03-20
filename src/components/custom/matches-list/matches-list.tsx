import { FC, useEffect } from 'react';
import { TMatchesListProps } from '@/src/utils/types';
import { MatchItem } from '../match-item';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { StyleSheet, FlatList } from 'react-native';

export const MatchesList: FC<TMatchesListProps> = ({ matches }) => {
  return (
    <FlatList
      data={matches}
      renderItem={({ item }) => (
        <ThemedView style={styles.matchesList}>
          <MatchItem match={item} index={item.title} />
        </ThemedView>
      )}
    ></FlatList>
  );
};

const styles = StyleSheet.create({
  matchesList: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 8,
  },
});
