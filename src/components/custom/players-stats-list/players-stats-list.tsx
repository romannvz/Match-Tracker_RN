import { FC } from 'react';
import { TPlayers } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { StyleSheet } from 'react-native';
import { PlayerStats } from '../player-stats';

type TPlayersListProps = {
  players: TPlayers[];
};

export const PlayersStatsList: FC<TPlayersListProps> = ({ players }) => (
  <ThemedView style={styles.playersList}>
    {players.map((item, index) => (
      <PlayerStats key={index} player={item} />
    ))}
  </ThemedView>
);

const styles = StyleSheet.create({
  playersList: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    flexGrow: 1,
    flex: 1,
    width: '100%',
    backgroundColor: 'inherit',
  },
});
