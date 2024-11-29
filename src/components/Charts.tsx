
import { Song } from '../types/types'
import { useEffect, useState } from "react";


const Charts = () => {
    const [songs, setSongs] = useState<Song[]>([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

const clientID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;


useEffect(() => {
    const fetchTrendingSongs = async () => {
        try {
            console.log('clientID:', clientID);
            console.log('clientSecret:', clientSecret);
            // see access token
            const authResponse = await fetch('http://localhost:3000/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Basic ${btoa(`${clientID}:${clientSecret}`)}`,
                },
                body : new URLSearchParams({
                    grant_type : 'client_credentials',
                }).toString(),
        });
        

        // error check
        if (!authResponse.ok) {
            const errorData = await authResponse.json();
            console.error('Authentication Error', errorData);
            return;
        }
            const authData = await authResponse.json()
            const accessToken = authData.access_token;

            // fetch songs
            const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error fetching songs:', errorData);
                return;
            }


            const data = await response.json();
            console.log('Spotify data:', data);

            // format data
            const formattedSongs: Song[] = data.tracks.items.slice(0, 10).map((item: any) => ({
                title: item.track.name,
                artist: item.track.artists[0].name,
                coverUrl: item.track.album.images[0].url,
                listens: item.track.popularity,
            }));
            setSongs(formattedSongs);
        } catch (error) {
            console.error('Error fetching song data.', error);
        } finally {
            setIsLoading(false);
        }
    };
        fetchTrendingSongs();
        }, [clientID, clientSecret]);
        return (
            <div id="top-songs" className="main-chart-container">
                <div className="container">
                    <h2>Top 10 Trending Now</h2>
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="song-list">
                            {songs.map((song, index) => (
                                <div className="chart-item" key={index}>
                                    <img
                                        className="song-cover"
                                        src={song.coverUrl || 'default-image-url.jpg'}
                                        alt={song.title}
                                    />
                                    <div className="song-details">
                                        <h4 className="song-title">{song.title}</h4>
                                        <p className="artist-title">{song.artist}</p>
                                        <p className="song-listens">{song.listens} plays</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
};

export default Charts