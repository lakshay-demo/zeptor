export type YouTubeCategory = 'ALL' | 'LIVE' | 'SCRIMS' | 'HIGHLIGHTS' | 'SHORTS';

export type YouTubeVideo = {
  id: string;
  title: string;
  description?: string;
  publishedAt: string;
  thumbnail: string;
  duration?: string;
  category?: Exclude<YouTubeCategory, 'ALL' | 'LIVE'>;
  isLive?: boolean;
  viewers?: number;
};

export type YouTubeFeed = {
  videos: YouTubeVideo[];
  live?: YouTubeVideo | null;
};
