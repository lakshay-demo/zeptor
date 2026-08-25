import { useEffect, useState } from 'react';
import type { YouTubeFeed, YouTubeVideo } from '../types/youtube';

export const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@zeptoresports';

const getFeedUrl = () => import.meta.env.VITE_YOUTUBE_API_URL as string | undefined;

const normalizeVideo = (video: YouTubeVideo): YouTubeVideo => ({
  ...video,
  thumbnail: video.thumbnail || `https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`,
});

export const useYouTubeFeed = () => {
  const [feed, setFeed] = useState<YouTubeFeed>({ videos: [] });
  const [loading, setLoading] = useState(Boolean(getFeedUrl()));

  useEffect(() => {
    const feedUrl = getFeedUrl();
    if (!feedUrl) return;

    const controller = new AbortController();
    fetch(feedUrl, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() as Promise<YouTubeFeed> : Promise.reject(new Error('YouTube feed unavailable'))))
      .then((data) => setFeed({ videos: (data.videos || []).map(normalizeVideo), live: data.live ? normalizeVideo(data.live) : null }))
      .catch(() => setFeed({ videos: [] }))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return { feed, loading, configured: Boolean(getFeedUrl()) };
};
