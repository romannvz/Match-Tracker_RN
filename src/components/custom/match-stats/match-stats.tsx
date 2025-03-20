import { FC } from 'react';
import { TMatch } from '@/src/utils/types';
import { ThemedView } from '@/src/components/stock/ThemedView';
import { TeamStats } from '../team-stats/team-stats';
import { CommandStats } from '../commands-stats';

type MatchStatsProps = {
  match: TMatch;
};

export const MatchStats: FC<MatchStatsProps> = ({ match }) => (
  <>
    <ThemedView>
      <ThemedView>
        <TeamStats team={match.homeTeam} />
        <CommandStats team={match.homeTeam} />
      </ThemedView>
      <ThemedView>
        <TeamStats team={match.awayTeam} />
        <CommandStats team={match.awayTeam} />
      </ThemedView>
    </ThemedView>
  </>
);
