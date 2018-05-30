export interface User {
  id: number;
  login: string;
  email: string;
  firstName: string;
  fullName: string;
  role: UserRole;
  enabled: boolean;
}

export class UserRole {
  static REGULAR = "REGULAR";
  static ADMIN = "ADMIN";
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

export interface MatchResult {
  matchId: number,
  goals1: number,
  goals2: number
}

export interface MatchWithUserType {
  match: Match,
  type?: Type
}

export interface NewMatch {
  label: string;
  time: string;
  team1: string;
  team2: string;
}

export interface Type {
  goals1: number,
  goals2: number
  calculated: boolean,
  pointsForType?: number
}

export interface NewType {
  matchId: number,
  goals1: number,
  goals2: number
}

export interface AllResultsForUser {
  fullUserName: string,
  place: number,
  resultsForMatches: ResultForMatch[],
  summaryPoints: number
}

export interface ResultForMatch{
  matchLabel: string,
  pointsForMatch?: number
}
