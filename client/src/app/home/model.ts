export interface MatchWithUserType {
  match: Match,
  type?: Type
}

export interface Match {
  id: number,
  time: string,
  label: string,
  team1: string,
  team2: string,
  resultAdded: boolean
  goals1?: number,
  goals2?: number,
}

export interface Type {
  goals1: number,
  goals2: number
  calculated: boolean,
  pointsForType?: number
}

export interface MatchResult {
  matchId: number,
  goals1: number,
  goals2: number
}
