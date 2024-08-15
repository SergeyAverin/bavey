export interface ICommunity {
  title: string;
  description: string;
  creation_date: string;
  community_avatar: string;
}

export interface ICommunityStatistic {
  subscribers: number;
  publications: number;
}
