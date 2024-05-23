import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";
import IMovie from "../../interfaces/IMovie";


const Hotmovies = () => {
    const sliderRef = useRef<Slider>(null);
    const [movienews, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setLoading] = useState(true)
    const next = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };
    const previous = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };
    const settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1170,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true,
                    arrows: false
                }
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false
                }
            }
        ]
    };

    useEffect(() => {
        (async () => {
            try {
                setLoading(true)
                const [phimBoResponse] = await Promise.all([
                    fetch('https://phimapi.com/v1/api/danh-sach/phim-le').then(res => res.json()),
                ]);
                const movies2024PhimBo = phimBoResponse.data.items.filter((movie: IMovie) => movie.year === 2024);
                setMovies([...movies2024PhimBo]);
                setLoading(false)
            } catch (error) {
                console.error('Failed to fetch movies', error);
            }
        })();
    }, []);
    if (isLoading) {
        return (
            <div>
                <div className="new-movie">
                    <h2>Phim Hot</h2>
                </div>
                <div className="slide-movie">
                    <Slider {...settings} ref={sliderRef}>
                        <div className="movie24 slide-loading"></div>
                        <div className="movie24 slide-loading"></div>
                        <div className="movie24 slide-loading"></div>
                        <div className="movie24 slide-loading"></div>
                        <div className="movie24 slide-loading"></div>
                    </Slider>
                    <div className="banner-np" style={{ textAlign: "center" }}>
                        <div className="button-pree" onClick={previous}>
                            <i className="fa-solid fa-chevron-left"></i>
                        </div>
                        <div className="button-next" onClick={next}>
                            <i className="fa-solid fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div>
            <div className="new-movie">
                <h2>Phim Hot</h2>
            </div>
            <div className="slide-movie">
                <Slider {...settings} ref={sliderRef}>
                    {
                        movienews.map((movie: IMovie, index) => {
                            return (
                                <div className="movie24" key={index}>
                                    <div className="movie24-image">
                                        <img src={`https://img.phimapi.com/${movie.poster_url}`} alt="" />
                                        <Link to={`phimhot/${movie.slug}`} className="movie-title-video">
                                            <i className="fa-regular fa-circle-play"></i>
                                        </Link>
                                    </div>
                                    <div className="movie-title">
                                        <p>{movie.name}</p>
                                    </div>
                                    <div className="movie-sub">
                                        <p>{movie.quality} - {movie.lang}</p>
                                    </div>

                                </div>
                            )
                        })
                    }
                </Slider>
                <div className="banner-np" style={{ textAlign: "center" }}>
                    <div className="button-pree" onClick={previous}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </div>
                    <div className="button-next" onClick={next}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hotmovies;
