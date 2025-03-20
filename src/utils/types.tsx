export type TResponceMatches = {
  data: TMatch[];
  ok: boolean;
};

export type TMatch = {
  awayScore: number;
  awayTeam: TTeam;
  homeScore: number;
  homeTeam: TTeam;
  status: string;
  time: Date;
  title: string;
};

export type TTeam = {
  name: string;
  place: number;
  players: TPlayers[];
  points: number;
  total_kills: number;
};

export type TPlayers = {
  kills: number;
  username: string;
};

export type TMatchesListProps = {
  matches: TMatch[];
};
