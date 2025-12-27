export interface DailyData {
  day: string;
  amount: number; // in Liters
}

export interface HydrationState {
  current: number;
  goal: number;
}
