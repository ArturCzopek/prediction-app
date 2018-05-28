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
