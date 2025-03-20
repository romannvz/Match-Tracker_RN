import { FC, useEffect, useRef } from 'react';
import { TMatch } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { ThemedText } from '@/src/components/stock/ThemedText';
import { Animated, StyleSheet } from 'react-native';
import { Colors } from '@/src/utils/constants/colors';
import { AnimatedScore } from './animated-scoreboard';

type ScoreboardProps = {
  match: TMatch;
};

export const Scoreboard: FC<ScoreboardProps> = ({ match }) => {
  return (
    <>
      <ThemedView style={styles.tab}>
        <ThemedView style={styles.scores}>
          <AnimatedScore score={match.homeScore} textStyle={styles.text} />
          <ThemedText style={styles.text}> : </ThemedText>
          <AnimatedScore score={match.awayScore} textStyle={styles.text} />
        </ThemedView>
        <ThemedView
          style={[
            styles.cardStatus,
            styles[`cardStatus${match.status}` as keyof typeof styles] ||
              styles.cardStatusUnknown,
          ]}
        >
          <ThemedText style={[styles.text, styles.matchStatus]}>
            {match.status}
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'inherit',
  },
  matchStatus: {
    fontSize: 12,
  },
  cardStatus: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 92,
    minHeight: 27,
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 4,
    backgroundColor: 'inherit',
  },
  cardStatusScheduled: {
    backgroundColor: Colors.scheduled,
  },
  cardStatusOngoing: {
    backgroundColor: Colors.ongoing,
  },
  cardStatusFinished: {
    backgroundColor: Colors.finished,
  },
  cardStatusUnknown: {},
  scores: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 20,
    backgroundColor: 'inherit',
  },
  text: {
    fontWeight: 600,
    fontSize: 20,
    letterSpacing: 0,
    color: '#F2F6F6',
  },
});
