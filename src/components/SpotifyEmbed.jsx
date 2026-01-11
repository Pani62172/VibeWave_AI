export default function SpotifyEmbed({ playlistId }) {
  return (
    <iframe
      src={`https://open.spotify.com/embed/playlist/${playlistId}`}
      width="100%"
      height="380"
      frameBorder="0"
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
      className="rounded-xl mt-4"
    />
  )
}
