import { FC, useEffect, useRef } from 'react';
import { TMatch } from '@/src/utils/types';
import { Animated, Easing } from 'react-native';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { StyleSheet } from 'react-native';
import { TeamInfo } from '../team-info';
import { Scoreboard } from '../scoreboard';

type MatchInfoProps = {
  match: TMatch;
  expanded: boolean;
};

export const MatchInfo: FC<MatchInfoProps> = ({ match, expanded }) => {
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: expanded ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }, [expanded]);

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <>
      <ThemedView style={styles.matchesListItem}>
        <TeamInfo team={match.homeTeam} role={'home'} />
        <Scoreboard match={match} />
        <TeamInfo team={match.awayTeam} role={'away'} />
      </ThemedView>
      <Animated.Image
        style={[{ transform: [{ rotate: rotateInterpolate }] }]}
        source={require('@/src/assets/images/arrow-drop-list.svg')}
      />
    </>
  );
};

const styles = StyleSheet.create({
  matchesListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'inherit',
    flex: 1,
  },
});
