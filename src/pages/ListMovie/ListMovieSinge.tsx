import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IMovie from "../../interfaces/IMovie";
import { HelmetProvider, Helmet } from "react-helmet-async";


const ListMovieSinge = () => {
    const [year, setYear] = useState<any | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number | null>(null);
    const [visiblePages, setVisiblePages] = useState<number[]>([]);

    const handleYear = (event: React.ChangeEvent<HTMLInputElement>) => {
        setYear(event.target.value);
    };
    const handleCountry = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(event.target.value);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            let url = `https://phimapi.com/v1/api/danh-sach/phim-le?page=${page}`;

            if (year !== null) url += `&year=${year}`;
            if (country !== null) url += `&country=${country}`;

            try {
                const response = await fetch(url);
                const data = await response.json();
                const filteredMovies = data.data.items.filter((item: IMovie) => {
                    return (!year || item.year == year) && (!country || item.country && item.country.some((countryItem: any) => countryItem.slug === country));
                });

                setMovies(filteredMovies);
                setTotalPages(data.data.params.pagination.totalPages);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [year, country, page]);

    useEffect(() => {
        if (totalPages !== null) {
            const pagesToShow = 7;
            let start = Math.max(0, page - Math.ceil(pagesToShow / 2));
            let end = start + pagesToShow;
            if (end > totalPages) {
                end = totalPages;
                start = Math.max(0, end - pagesToShow);
            }

            const visiblePages = Array.from({ length: end - start }, (_, i) => start + i + 1);
            setVisiblePages(visiblePages);
        }
    }, [page, totalPages]);

    const handleReset = () => {
        setYear(null);
        setCountry(null);
    }

    if (isLoading) {
        return (
            <div className="container">
                <div className="detail-movie-title">
                    <Link to={'/home'}>
                        KKPhim
                    </Link>
                    -
                    <p>
                        Phim lẻ
                    </p>
                </div>
                <div className="list-movies">
                    <div className="filter">
                        <div className="filter-chid">
                            <h3>Lọc kết quả</h3>
                            <p onClick={handleReset}>Đặt lại</p>
                        </div>
                        <div className="filter-year">
                            <div className="year-title">
                                <h3>Theo Năm</h3>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2024"
                                    checked={year === '2024'}
                                    onChange={handleYear}
                                />
                                <p>2024</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2023"
                                    checked={year === '2023'}
                                    onChange={handleYear}
                                />
                                <p>2023</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2022"
                                    checked={year === '2022'}
                                    onChange={handleYear}
                                />
                                <p>2022</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2021"
                                    checked={year === '2021'}
                                    onChange={handleYear}
                                />
                                <p>2021</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2020"
                                    checked={year === '2020'}
                                    onChange={handleYear}
                                />
                                <p>2020</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2019"
                                    checked={year === '2019'}
                                    onChange={handleYear}
                                />
                                <p>2019</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2018"
                                    checked={year === '2018'}
                                    onChange={handleYear}
                                />
                                <p>2018</p>
                            </div>
                        </div>
                        <div className="filter-country">
                            <div className="country-title">
                                <h3>Theo Quốc Gia</h3>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="han-quoc"
                                    checked={country === 'han-quoc'}
                                    onChange={handleCountry}
                                />
                                <p>Hàn Quốc</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="an-do"
                                    checked={country === 'an-do'}
                                    onChange={handleCountry}
                                />
                                <p>Ấn Độ</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="viet-nam"
                                    checked={country === 'viet-nam'}
                                    onChange={handleCountry}
                                />
                                <p>Việt Nam</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="au-my"
                                    checked={country === 'au-my'}
                                    onChange={handleCountry}
                                />
                                <p>Âu Mỹ</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="anh"
                                    checked={country === 'anh'}
                                    onChange={handleCountry}
                                />
                                <p>Anh</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="malaysia"
                                    checked={country === 'malaysia'}
                                    onChange={handleCountry}
                                />
                                <p>Malaysia</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="trung-quoc"
                                    checked={country === 'trung-quoc'}
                                    onChange={handleCountry}
                                />
                                <p>Trung Quốc</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="nhat-ban"
                                    checked={country === 'nhat-ban'}
                                    onChange={handleCountry}
                                />
                                <p>Nhật Bản</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="thai-lan"
                                    checked={country === 'thai-lan'}
                                    onChange={handleCountry}
                                />
                                <p>Thái Lan</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-movie-aside">
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                        <div className="movie-load">
                        </div>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div className="container">
            <HelmetProvider>
                <Helmet>
                    <title>KKPhim - Phim lẻ</title>
                    <meta name="description" content="KKPhim xem phim miễn phí, cập nhật phim nhanh chóng và mới nhất" />
                </Helmet>
                <div className="detail-movie-title">
                    <Link to={'/home'}>
                        KKPhim
                    </Link>
                    -
                    <p>
                        Phim lẻ
                    </p>
                </div>
                <div className="list-movies">
                    <div className="filter">
                        <div className="filter-chid">
                            <h3>Lọc kết quả</h3>
                            <p onClick={handleReset}>Đặt lại</p>
                        </div>
                        <div className="filter-year">
                            <div className="year-title">
                                <h3>Theo Năm</h3>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2024"
                                    checked={year === '2024'}
                                    onChange={handleYear}
                                />
                                <p>2024</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2023"
                                    checked={year === '2023'}
                                    onChange={handleYear}
                                />
                                <p>2023</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2022"
                                    checked={year === '2022'}
                                    onChange={handleYear}
                                />
                                <p>2022</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2021"
                                    checked={year === '2021'}
                                    onChange={handleYear}
                                />
                                <p>2021</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2020"
                                    checked={year === '2020'}
                                    onChange={handleYear}
                                />
                                <p>2020</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2019"
                                    checked={year === '2019'}
                                    onChange={handleYear}
                                />
                                <p>2019</p>
                            </div>
                            <div className="year">
                                <input
                                    type="radio"
                                    value="2018"
                                    checked={year === '2018'}
                                    onChange={handleYear}
                                />
                                <p>2018</p>
                            </div>
                        </div>
                        <div className="filter-country">
                            <div className="country-title">
                                <h3>Theo Quốc Gia</h3>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="han-quoc"
                                    checked={country === 'han-quoc'}
                                    onChange={handleCountry}
                                />
                                <p>Hàn Quốc</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="an-do"
                                    checked={country === 'an-do'}
                                    onChange={handleCountry}
                                />
                                <p>Ấn Độ</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="viet-nam"
                                    checked={country === 'viet-nam'}
                                    onChange={handleCountry}
                                />
                                <p>Việt Nam</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="au-my"
                                    checked={country === 'au-my'}
                                    onChange={handleCountry}
                                />
                                <p>Âu Mỹ</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="anh"
                                    checked={country === 'anh'}
                                    onChange={handleCountry}
                                />
                                <p>Anh</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="malaysia"
                                    checked={country === 'malaysia'}
                                    onChange={handleCountry}
                                />
                                <p>Malaysia</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="trung-quoc"
                                    checked={country === 'trung-quoc'}
                                    onChange={handleCountry}
                                />
                                <p>Trung Quốc</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="nhat-ban"
                                    checked={country === 'nhat-ban'}
                                    onChange={handleCountry}
                                />
                                <p>Nhật Bản</p>
                            </div>
                            <div className="country">
                                <input
                                    type="radio"
                                    value="thai-lan"
                                    checked={country === 'thai-lan'}
                                    onChange={handleCountry}
                                />
                                <p>Thái Lan</p>
                            </div>
                        </div>
                    </div>
                    <div className="list-movie-aside">
                        {movies.length > 0 ? (
                            movies.map((movie: IMovie, index: any) => (
                                <div className="item-movie" key={index}>
                                    <div className="item-movie-image">
                                        <img src={`https://img.phimapi.com/${movie.poster_url}`} alt="" />
                                    </div>
                                    <div className="item-movie-title">
                                        <p>{movie.name}</p>
                                    </div>
                                    <div className="item-movie-sub">
                                        <p>{movie.quality} - {movie.lang}</p>
                                    </div>
                                    <Link to={`${movie.slug}`} className="item-title-video">
                                        <i className="fa-regular fa-circle-play"></i>
                                    </Link>
                                </div>
                            ))
                        ) : (
                            <div className="load-movie-false">
                                <div className="chidren-load-movie-false">
                                    <img src="../logo/logoKKPhim.png" alt="" />
                                </div>
                                <p>Rất tiếc, KKPhim không tìm thấy kết quả phụ hợp</p>
                                <img className="mat-buon" src="../logo/mat-buon.png" alt="" />
                                <button onClick={handleReset}>Nhấn vào đây để quay lại</button>
                            </div>
                        )}
                    </div>
                </div>
                {totalPages && !country && !year && (
                    <div className="listpage">
                        <div className="pagination">
                            <button
                                className="pre-page"
                                onClick={() => handlePageChange(Math.max(1, page - 1))}
                                disabled={page === 1}
                            >
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                            {visiblePages.map(p => (
                                <button
                                    key={p}
                                    onClick={() => handlePageChange(p)}
                                    className={page === p ? "active page" : "page"}
                                >
                                    {p}
                                </button>
                            ))}
                            <button
                                className="next-page"
                                onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                                disabled={page === totalPages}
                            >
                                <i className="fa-solid fa-chevron-right"></i>
                            </button>
                        </div>
                        <div className="count-page">
                            <p>Trang  {page} / {totalPages}</p>
                        </div>
                    </div>
                )}
            </HelmetProvider>
        </div>
    );
}

export default ListMovieSinge