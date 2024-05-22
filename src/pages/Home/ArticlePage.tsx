import { useEffect, useState } from "react";
import IMovie from "../../interfaces/IMovie";
import { Link } from "react-router-dom";

const ArticlePage = () => {
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [displayedMovies, setLengMovie] = useState<number>(5);
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const [phimLeResponse, hoatHinhRespon] = await Promise.all([
                    fetch('https://phimapi.com/v1/api/danh-sach/phim-le').then(res => res.json()),
                    fetch('https://phimapi.com/v1/api/danh-sach/hoat-hinh').then(res => res.json())
                ]);
                const moviesPhimLe = phimLeResponse.data.items.filter((movie: IMovie) => movie.quality === "FHD");
                const moviesHoatHinh = hoatHinhRespon.data.items.filter((movie: IMovie) => movie.quality === "FHD");
                setMovies([...moviesPhimLe, ...moviesHoatHinh].slice(0, 8));
                setLoading(false)
            } catch (error) {
                console.error('Lấy dữ liệu Fail', error);
            }
        })();
    }, []);

    const handleShowMore = () => {
        setLengMovie(prev => prev + 5);
    };
    if (isLoading) {
        return (
            <div className="theater-screening">
                <div className="new-movie">
                    <h2>Phim Chiếu Rạp</h2>
                </div>
                <div className="list-movie">
                    <div className="movie-screen artice-loading"></div>
                    <div className="movie-screen artice-loading"></div>
                    <div className="movie-screen artice-loading"></div>
                    <div className="movie-screen artice-loading"></div>
                    <div className="movie-screen artice-loading"></div>
                </div>
            </div>
        )
    }
    return (
        <div className="theater-screening">
            <div className="new-movie">
                <h2>Phim Chiếu Rạp</h2>
            </div>
            <div className="list-movie">
                {movies.slice(0, displayedMovies).map((movie, index) => (
                    <Link to={`/phimchieurap/${movie.slug}`} className="movie-screen" key={index}>
                        <div className="screen-image">
                            <img src={`https://img.phimapi.com/${movie.poster_url}`} alt="" />
                        </div>
                        <div className="screen-content">
                            <div className="screen-content-name">
                                <p>{movie.name}</p>
                            </div>
                            <div className="screen-content-year">
                                <p>{movie.year}</p>
                            </div>
                            <div className="screen-content-minute">
                                <p>{movie.time}</p>
                            </div>
                        </div>
                    </Link>

                ))}
                {displayedMovies < movies.length && (
                    <button className="watch-new" onClick={handleShowMore}>Xem thêm</button>
                )}
            </div>
        </div>
    );
};

export default ArticlePage;
