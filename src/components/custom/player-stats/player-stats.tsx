import { FC } from 'react';
import { TPlayers } from '@/src/utils/types';
import { Image } from 'react-native';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { ThemedText } from '@/src/components/stock/ThemedText';
import { StyleSheet } from 'react-native';
import { AnimatedScore } from '../scoreboard/animated-scoreboard';

type PlayerStatsProps = {
  player: TPlayers;
};

export const PlayerStats: FC<PlayerStatsProps> = ({ player }) => (
  <>
    <ThemedView style={styles.player}>
      <ThemedView style={styles.playerInfo}>
        <Image
          style={styles.avatar}
          source={require('@/src/assets/images/avatar_global.svg')}
        />
        <ThemedText style={styles.name}>{player.username}</ThemedText>
      </ThemedView>
      <ThemedView style={styles.playerStats}>
        <ThemedText style={styles.text}>Убийств: </ThemedText>
        <AnimatedScore score={player.kills} textStyle={styles.count} />
      </ThemedView>
    </ThemedView>
  </>
);

const styles = StyleSheet.create({
  player: {
    flexDirection: 'row',
    backgroundColor: '#101318',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
    borderRadius: 4,
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  playerInfo: {
    flexDirection: 'row',
    backgroundColor: 'inherit',
    alignItems: 'center',
    gap: 8,
  },
  playerStats: {
    flexDirection: 'row',
    backgroundColor: 'inherit',
    borderRadius: 4,
    gap: 8,
  },
  avatar: { gap: 5 },
  name: {
    fontWeight: 600,
    fontSize: 16,
    letterSpacing: 0,
    color: '#FAFAFA',
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
