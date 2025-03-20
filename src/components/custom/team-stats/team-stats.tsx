import { FC } from 'react';
import { TTeam } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { StyleSheet } from 'react-native';
import { PlayersStatsList } from '../players-stats-list/players-stats-list';
import { CommandStats } from '../commands-stats';

type TeamStatsProps = {
  team: TTeam;
};

export const TeamStats: FC<TeamStatsProps> = ({ team }) => (
  <>
    <ThemedView style={styles.teamStats}>
      <PlayersStatsList players={team.players} />
      <CommandStats team={team} />
    </ThemedView>
  </>
);

const styles = StyleSheet.create({
  teamStats: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#0B0E12',
    gap: 8,
    flex: 1,
  },
});
