import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from "react-router-dom";
import IMovie from "../../interfaces/IMovie";


const Seriesmovie = () => {
    const sliderRef = useRef<Slider>(null);
    const [movienews, setMovies] = useState<IMovie[]>([]);
    const [isLoading,setLoading] = useState(true)
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
        slidesToShow: 6,
        slidesToScroll: 6,
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    initialSlide: 3,
                    arrows: false
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false
                }
            }
        ]
    };
    useEffect(() => {
        setLoading(true)
        fetch('https://phimapi.com/v1/api/danh-sach/phim-bo').then((response) => response.json())
            .then(data => {
                setMovies(data.data.items)
                setLoading(false)
            })
    }, []);
    if (isLoading) {
        return (
            <div>
                <div className="new-movie">
                    <h2>Phim Bộ</h2>
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
        <div className="phimle">
            <div className="new-movie">
                <h2>Phim Bộ</h2>
            </div>
            <div className="slide-movie">
                <Slider {...settings} ref={sliderRef}>
                    {
                        movienews.map((movie: IMovie, index) => {
                            return (
                                <div className="movie24" key={index}>
                                    <div className="movie24-image">
                                        <img src={`https://img.phimapi.com/${movie.poster_url}`} alt="" />
                                        <Link to={`phimbo/${movie.slug}`} className="movie-title-video">
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

export default Seriesmovie;
