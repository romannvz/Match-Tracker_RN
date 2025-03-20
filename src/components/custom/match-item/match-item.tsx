import React, { FC, useEffect, useState } from 'react';
import { TMatch } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { LayoutAnimation, StyleSheet, TouchableOpacity } from 'react-native';
import { MatchInfo } from '../match-info';
import { MatchDetails } from '../match-details';

type MatchItemProps = {
  match: TMatch;
  index: string;
};

export const MatchItem: FC<MatchItemProps> = ({ match, index }) => {
  const [expanded, setExpanded] = useState<string>('');

  useEffect(() => {
    if (expanded)
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    else LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [expanded]);

  const handlePress = (index: string) => {
    if (expanded == index) setExpanded('');
    else setExpanded(index);
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handlePress(index)}
        style={styles.matchInfo}
      >
        <MatchInfo match={match} expanded={match.title === expanded} />
      </TouchableOpacity>
      {match.title === expanded && (
        <ThemedView
          style={[
            styles.matchDetails,
            match.title === expanded
              ? styles.matchDetailsShow
              : styles.matchDetailsHide,
          ]}
        >
          <MatchDetails match={match} />
        </ThemedView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  matchInfo: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#0b0e12',
    padding: 16,
    gap: 12,
  },
  matchDetails: {
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#0b0e12',
    padding: 16,
  },
  matchDetailsShow: {
    opacity: 1,
  },
  matchDetailsHide: {
    opacity: 0,
  },
});
