import { FC } from 'react';
import { TTeam } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { ThemedText } from '@/src/components/stock/ThemedText';
import { StyleSheet } from 'react-native';
import { AnimatedScore } from '../scoreboard/animated-scoreboard';

type CommandStatsProps = {
  team: TTeam;
};

export const CommandStats: FC<CommandStatsProps> = ({ team }) => (
  <>
    <ThemedView style={styles.stats}>
      <ThemedView style={styles.statsItem}>
        <ThemedText style={styles.text}>Points: </ThemedText>
        <AnimatedScore score={team.points} textStyle={styles.count} />
      </ThemedView>
      <ThemedView style={styles.statsItem}>
        <ThemedText style={styles.text}>Место: </ThemedText>
        <AnimatedScore score={team.place} textStyle={styles.count} />
      </ThemedView>
      <ThemedView style={styles.statsItem}>
        <ThemedText style={styles.text}>Всего убийств: </ThemedText>
        <AnimatedScore score={team.total_kills} textStyle={styles.count} />
      </ThemedView>
    </ThemedView>
  </>
);

const styles = StyleSheet.create({
  stats: {
    flexDirection: 'row',
    backgroundColor: '#101318',
    justifyContent: 'space-around',
    width: '100%',
    borderRadius: 4,
    paddingVertical: 14,
    paddingHorizontal: 24,
    gap: 8,
  },
  statsItem: {
    flexDirection: 'row',
    // alignItems: 'center',
    gap: 8,
    borderRadius: 4,
    backgroundColor: 'inherit',
  },
  text: {
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: 0,
    color: '#FAFAFA',
    opacity: 0.4,
  },
  count: {
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 0,
    color: '#F2F6F6',
  },
});
