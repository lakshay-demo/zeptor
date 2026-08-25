import YouTubeHub from '../components/YouTubeHub';

const LivePage = () => {
  return (
    <div className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
      <section className="media-page-header"><p className="eyebrow">Zeptor Esports live desk</p><h1>LIVE ACTIVITY</h1><p>Live status is read from the official YouTube feed. When there is no active broadcast, the latest channel content is shown instead.</p></section>
      <YouTubeHub />
    </div>
  );
};

export default LivePage;
