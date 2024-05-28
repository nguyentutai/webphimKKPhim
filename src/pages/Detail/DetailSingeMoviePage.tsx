import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ArticlePage from "../Home/ArticlePage";


const DetailSingeMoviePage = () => {
    const { tenphim } = useParams();
    const [movies, setMovies] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        fetch(`https://phimapi.com/phim/${tenphim}`)
            .then(res => res.json())
            .then(data => {
                setMovies(data);
                setLoading(false);
            });
    }, [tenphim]);

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
            <div className="detail-movie-title">
                <Link to={'/home'}>
                    KKPhim
                </Link>
                -
                <p>{movies?.movie?.name}</p>
            </div>
            <div className="watch-movie-singe">
                <iframe src={movies?.episodes[0].server_data[0].link_embed} allowFullScreen></iframe>
            </div>
            <div className="detail-movie-chidrent">
                <div className="detail-movie-aside">
                    <div className="detail-movie-chidren-aside">
                        <div className="detail-movie-image">
                            <img src={movies?.movie?.poster_url} alt={movies?.movie?.name} />
                        </div>
                        <div className="detail-movie-content">
                            <div className="detail-movie-name">
                                <h1>{movies?.movie?.name}</h1>
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
        </div>
    );
};

export default DetailSingeMoviePage;
