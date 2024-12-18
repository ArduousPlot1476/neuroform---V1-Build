export interface UserFilters {
  email?: string;
  search?: string;
}

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  lastLoginDistribution: {
    today: number;
    thisWeek: number;
    thisMonth: number;
    older: number;
  };
}

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  avatarUrl?: string;
}

export interface UpdateUserData {
  name?: string;
  email?: string;
  password?: string;
  avatarUrl?: string;
}