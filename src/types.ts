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

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  imageUrn: string;
  bannerUrn: string;
  username: string;
  posts: Post[];
  imageUrl: string;
  bannerUrl: string;
}
