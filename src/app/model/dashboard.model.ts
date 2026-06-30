export interface DashboardMetricCard {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  colorClass: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

export interface RecentActivity {
  id: number;
  time: string;
  module: string;
  description: string;
  user: string;
  status: string;
}

export interface Announcement {
  id: number;
  date: string;
  title: string;
  content: string;
  priority: 'high' | 'normal' | 'low';
}
