import { ChevronLeft, ChevronRight, Clock3, ExternalLink, Play, Radio, Youtube } from 'lucide-react';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { YOUTUBE_CHANNEL_URL, useYouTubeFeed } from '../lib/youtube';
import type { YouTubeCategory, YouTubeVideo } from '../types/youtube';

const formatDate = (date: string) => new Intl.DateTimeFormat('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
const watchUrl = (video: YouTubeVideo) => `https://www.youtube.com/watch?v=${video.id}`;
const categories: YouTubeCategory[] = ['ALL', 'LIVE', 'SCRIMS', 'HIGHLIGHTS', 'SHORTS'];

const VideoCard = ({ video }: { video: YouTubeVideo }) => (
  <article className="media-card">
    <a href={watchUrl(video)} target="_blank" rel="noreferrer" className="media-thumb" aria-label={`Watch ${video.title} on YouTube`}>
      <img src={video.thumbnail} alt="" loading="lazy" />
      <span className="media-play"><Play size={16} fill="currentColor" /></span>
      {video.duration && <span className="media-duration"><Clock3 size={12} /> {video.duration}</span>}
      {video.isLive && <span className="media-live-badge"><span className="live-dot" /> LIVE</span>}
    </a>
    <div className="media-card-body">
      <p className="media-meta"><Youtube size={13} /> {formatDate(video.publishedAt)}</p>
      <h3>{video.title}</h3>
      <a href={watchUrl(video)} target="_blank" rel="noreferrer" className="media-watch">Watch on YouTube <ExternalLink size={13} /></a>
    </div>
  </article>
);

const EmptyMedia = () => (
  <div className="media-empty">
    <Youtube size={30} />
    <div><h3>WATCH ZEPTOR ESPORTS ON YOUTUBE</h3><p>Latest BGMI scrims, live matches and highlights are waiting on the official channel.</p></div>
    <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer" className="btn-primary px-5 py-3 text-xs">Open YouTube channel <ExternalLink size={14} /></a>
  </div>
);

const YouTubeHub = ({ compact = false }: { compact?: boolean }) => {
  const { feed, loading } = useYouTubeFeed();
  const [category, setCategory] = useState<YouTubeCategory>('ALL');
  const carouselRef = useRef<HTMLDivElement>(null);
  const live = feed.live;
  const featured = live || feed.videos[0];
  const filtered = feed.videos.filter((video) => category === 'ALL' || (category === 'LIVE' ? video.isLive : video.category === category));

  const moveCarousel = (direction: number) => carouselRef.current?.scrollBy({ left: direction * carouselRef.current.clientWidth * 0.82, behavior: 'smooth' });

  return (
    <section className={`youtube-hub ${compact ? 'youtube-hub-compact' : ''}`}>
      <div className="section-heading"><div><p className="eyebrow"><Youtube size={14} /> Watch Zeptor Esports</p><h2>{live ? 'ZEPTOR ESPORTS IS LIVE' : 'LATEST FROM ZEPTOR'}</h2><p>Catch our latest BGMI live streams, scrims, highlights and esports videos — all in one place.</p></div>{!compact && <Link to="/media" className="text-link">Open media hub <ExternalLink size={15} /></Link>}</div>

      {loading ? <div className="media-feature media-skeleton" aria-label="Loading YouTube content" /> : featured ? <div className="media-feature">
        <a href={watchUrl(featured)} target="_blank" rel="noreferrer" className="media-feature-image"><img src={featured.thumbnail} alt="" loading="lazy" /><span className="media-feature-play"><Play size={22} fill="currentColor" /></span>{live && <span className="media-live-badge"><span className="live-dot" /> LIVE NOW</span>}</a>
        <div className="media-feature-copy"><p className="eyebrow">{live ? <><Radio size={14} /> Live broadcast</> : 'Featured video'}</p><h3>{featured.title}</h3><p>{featured.description || 'Watch the latest Zeptor Esports action, straight from the official channel.'}</p><div className="media-feature-details"><span>{formatDate(featured.publishedAt)}</span>{featured.viewers !== undefined && <span>{featured.viewers.toLocaleString('en-IN')} watching</span>}</div><a href={watchUrl(featured)} target="_blank" rel="noreferrer" className="btn-primary mt-6 px-5 py-3 text-xs">{live ? 'Watch live' : 'Watch on YouTube'} <ExternalLink size={14} /></a></div>
      </div> : <EmptyMedia />}

      {feed.videos.length > 0 && <>
        <div className="media-toolbar"><div className="media-tabs">{categories.map((item) => <button key={item} type="button" className={category === item ? 'active' : ''} onClick={() => setCategory(item)}>{item}</button>)}</div><div className="media-arrows"><button type="button" onClick={() => moveCarousel(-1)} aria-label="Previous videos"><ChevronLeft size={18} /></button><button type="button" onClick={() => moveCarousel(1)} aria-label="Next videos"><ChevronRight size={18} /></button></div></div>
        <div className="media-carousel" ref={carouselRef}>{filtered.map((video) => <VideoCard key={video.id} video={video} />)}</div>
      </>}
      <div className="media-footer"><span>More from Zeptor Esports</span><span>Follow our channel for BGMI scrims, live matches and highlights.</span><a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noreferrer" className="text-link">Subscribe on YouTube <Youtube size={15} /></a></div>
    </section>
  );
};

export default YouTubeHub;
