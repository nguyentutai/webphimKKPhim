import { Link, useParams } from "react-router-dom";
import ArticlePage from "../Home/ArticlePage";
import { useEffect, useState } from "react";
import { HelmetProvider, Helmet } from "react-helmet-async";

const DetailSeriesMovie = () => {
    const { tenphim } = useParams();
    const [movies, setMovies] = useState<any | null>(null);
    const [currentEpisode, setCurrentEpisode] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetch(`https://phimapi.com/phim/${tenphim}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                setLoading(false)
            });
    }, [tenphim]);

    const formatTrailerUrl = (url: any) => {
        if (!url) return false;
        const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/);
        if (videoIdMatch && videoIdMatch[1]) {
            return `https://www.youtube.com/embed/${videoIdMatch[1]}`;
        }
        return url;
    };

    const trailerUrl = formatTrailerUrl(movies?.movie?.trailer_url);
    const currentVideoUrl = currentEpisode ? currentEpisode.link_embed : trailerUrl;
    if (loading) {
        return (
            <div className="loading-spinner">
                <div className="loading-circle">
                </div>
            </div>
        );
    }
    return (
        <div className="container">
            <HelmetProvider>
                <Helmet>
                    <title>KKPhim - {movies?.movie?.name || "Loading..."}</title>
                    <meta name="description" content={movies?.movie?.name} />
                </Helmet>
                <div className="detail-movie-title">
                    <Link to={'/home'}>
                        KKPhim
                    </Link>
                    -
                    <p>
                        {movies?.movie?.name} - {currentEpisode ? currentEpisode.name : "Trailer"}
                    </p>
                </div>
                <div className="watch-movie-singe">
                    <iframe name="movie" src={currentVideoUrl} allowFullScreen></iframe>
                </div>
                <div className="episode-list">
                    {movies?.episodes[0]?.server_data?.map((item: any, index: any) => (
                        <button
                            key={index}
                            className={`episode ${currentEpisode === item ? 'active' : ''}`}
                            onClick={() => setCurrentEpisode(item)}
                        >
                            <p>{item.name}</p>
                        </button>
                    ))}
                </div>
                <div className="detail-movie-chidrent">
                    <div className="detail-movie-aside">
                        <div className="detail-movie-chidren-aside">
                            <div className="detail-movie-image">
                                <img src={movies?.movie?.poster_url} alt="" />
                            </div>
                            <div className="detail-movie-content">
                                <div className="detail-movie-name">
                                    <h3>{movies?.movie?.name}</h3>
                                </div>
                                <div className="detail-movie-status">
                                    <p>Trạng thái: {movies?.movie?.lang}</p>
                                </div>
                                <div className="detail-movie-contry">
                                    <p>Quốc gia: {movies?.movie?.country[0].name}</p>
                                </div>
                                <div className="detail-movie-time">
                                    <p>Thời gian: {movies?.movie?.time}</p>
                                </div>
                                <div className="detail-movie-year">
                                    <p>Năm: {movies?.movie?.year}</p>
                                </div>
                                <div className="detail-movie-cate">
                                    <p>Thể loại: {movies?.movie?.category.map((item: any) => (
                                        item.name
                                    )).join(' - ')}</p>
                                </div>
                                <div className="detail-movie-actor">
                                    <p>Diễn viên: {movies?.movie?.actor.map((item: any) => (
                                        item
                                    )).join(', ')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="content-movie">
                            <h3>Nội dung phim: </h3>
                            <p>- {movies?.movie?.content}</p>
                        </div>
                    </div>
                    <ArticlePage />
                </div>
            </HelmetProvider>
        </div>
    );
}

export default DetailSeriesMovie;
