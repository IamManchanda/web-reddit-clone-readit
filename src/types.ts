export interface Post {
  identifier: string;
  title: string;
  slug: string;
  body?: string;
  username: string;
  subName: string;
  createdAt: string;
  updatedAt: string;
  url: string;
  commentCount?: number;
  voteScore?: number;
  userVote?: number;
}
