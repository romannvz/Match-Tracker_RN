import { FC } from 'react';
import { StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { TTeam } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { ThemedText } from '@/src/components/stock/ThemedText';

type TeamInfoProps = {
  team: TTeam;
  role: 'home' | 'away';
};

export const TeamInfo: FC<TeamInfoProps> = ({ team, role }) => (
  <>
    <ThemedView
      style={[
        styles.teamInfo,
        styles[`${role}` as keyof typeof styles] || styles.roleUnknown,
      ]}
    >
      <Image source={require('@/src/assets/images/illustrations-role.svg')} />
      <ThemedText style={[styles.teamName, styles.text]}>
        {team.name}
      </ThemedText>
    </ThemedView>
  </>
);

const styles = StyleSheet.create({
  teamInfo: {
    alignItems: 'center',
    gap: 14,
    backgroundColor: 'inherit',
  },
  teamName: {
    fontSize: 16,
  },
  text: {
    fontWeight: '600',
    fontFamily: 'Inter',
    letterSpacing: 0,
  },
  home: { flexDirection: 'row' },
  away: { flexDirection: 'row-reverse' },
  roleUnknown: {},
});
