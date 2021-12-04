export type Day = {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  adjusted_close: number;
  volume: number;
};

export type Position = {
  name: string;
  borrow_fee: number;
  borrow_value: number;
  cash: number;
  current_week: number;
  days_to_ftd: number;
  float: number;
  ftd_shares: number;
  gamma: number;
  last_naked: number;
  last_reduce: number;
  investor_rank: string;
  investor_suspicion: number;
  is_call: boolean;
  is_fail: boolean;
  is_set: boolean;
  naked_short_position: number;
  naked_value: number;
  news: number;
  prev_borrow_fee: number;
  prev_borrow_value: number;
  prev_cash: number;
  prev_investor_rank: string;
  prev_investor_suspicion: number;
  prev_naked_short_position: number;
  prev_naked_value: number;
  prev_price: number;
  prev_price_support: number;
  prev_reported_position: number;
  prev_short_position: number;
  price: number;
  price_support: number;
  reported_position: number;
  short_position: number;
  strategies: Strategy[];
  streak: number;
  symbol: string;
};

export type Strategy = {
  cost: number;
  info: string;
  is_used: boolean;
  name: string;
  times_used: number;
};
