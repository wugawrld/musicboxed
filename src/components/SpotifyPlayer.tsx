interface SpotifyPlayerProps {
  playlistUrl: string;
}

const SpotifyPlayer: React.FC<SpotifyPlayerProps> = ({ playlistUrl }) => {
  return (
    <div style={{ width: '100%', height: '352px', borderRadius: '12px', overflow: 'hidden' }}>
      <iframe
        style={{ borderRadius: '12px' }}
        src={playlistUrl}
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Spotify Player"
      ></iframe>
    </div>
  );
};

export default SpotifyPlayer;
