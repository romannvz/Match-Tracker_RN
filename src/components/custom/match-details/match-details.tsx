import { FC } from 'react';
import { TMatch } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { StyleSheet } from 'react-native';
import { TeamStats } from '../team-stats';

type MatchDetailsProps = {
  match: TMatch;
};

export const MatchDetails: FC<MatchDetailsProps> = ({ match }) => (
  <>
    <ThemedView style={styles.matchDetails}>
      <ThemedView style={styles.command}>
        <TeamStats team={match.homeTeam} />
      </ThemedView>
      <ThemedView style={styles.command}>
        <TeamStats team={match.awayTeam} />
      </ThemedView>
    </ThemedView>
  </>
);

const styles = StyleSheet.create({
  matchDetails: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'inherit',
    gap: 32,
    padding: 12,
    flex: 1,
  },
  command: {
    flex: 1,
    alignItems: 'center',
  },
});
