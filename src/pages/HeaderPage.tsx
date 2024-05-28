import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import IMovie from "../interfaces/IMovie";

const Header = () => {
    const [query, setQuery] = useState('');
    const [filteredMovies, setFilteredMovies] = useState<IMovie[]>([]);
    const [searchStarted, setSearchStarted] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const menuRef = useRef<HTMLDivElement>(null);
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        setQuery(value);
        setSearchStarted(true);
    };

    useEffect(() => {
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };
        window.addEventListener("resize", updateWindowWidth);
        return () => window.removeEventListener("resize", updateWindowWidth);
    }, []);

    useEffect(() => {
        if (menuOpen && windowWidth > 1250.98) {
            setMenuOpen(false);
        }
    }, [menuOpen, windowWidth]);

    useEffect(() => {
        if (query.trim() === '') {
            setFilteredMovies([]);
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetch(`https://phimapi.com/v1/api/tim-kiem?keyword=${query}`);
                const data = await response.json();
                setFilteredMovies(data.data.items || []);
            } catch (error) {
                console.error("Lỗi", error);
            }
        };
        fetchData();
    }, [query]);

    const toggleMenu = () => {
        if (windowWidth <= 1250.98) {
            setMenuOpen(!menuOpen);
        }
    };

    const handleClickOutsideMenu = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setMenuOpen(false);
        }
    };

    useEffect(() => {
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutsideMenu);
        } else {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutsideMenu);
        };
    }, [menuOpen]);
    return (
        <header>
            <div className="headers">
                <div className="container header">
                    <div className="logo">
                        <Link to={''}>
                            <img src="../logo/logoKKPhim.png" alt="logo kkphim" />
                        </Link>
                    </div>
                    <div className="search">
                        <div className="header-search">
                            <form>
                                <div className="search-icon">
                                    <i className="fa-solid fa-magnifying-glass"></i>
                                </div>
                                <input value={query} type="search" onChange={handleSearch} placeholder="Tìm kiếm tên phim ... " />
                            </form>
                        </div>
                        {searchStarted && query && (
                            <div className="list-search">
                                {filteredMovies.length > 0 ? (
                                    filteredMovies.map((item: IMovie, index) => (
                                        <Link to={`phim/${item.slug}`} key={index} className="list-search-chid">
                                            <div className="search-image">
                                                <img src={`https://img.phimapi.com/${item.poster_url}`} alt={item.name} />
                                            </div>
                                            <div className="search-content">
                                                <h4>{item.name}</h4>
                                                <p>Năm: {item.year}</p>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="no-results list-search-chid">
                                        <p>Không tìm thấy phim nào ...</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <ul className="header-category">
                        <li className="header-category-phimle">
                            <Link to={'/phim-le'}>Phim lẻ</Link>
                        </li>
                        <li className="header-category-phimbo">
                            <Link to={'/phim-bo'}>Phim bộ</Link>
                        </li>
                        <li className="header-category-phimbo">
                            <Link to={'/hoat-hinh'}>Hoạt hình</Link>
                        </li>
                        <li className="header-category-phimbo">
                            <Link to={'/tv-shows'}>TV Shows</Link>
                        </li>
                    </ul>
                    <div className="bar" onClick={toggleMenu}>
                        <i className="fa-solid fa-bars-staggered"></i>
                    </div>
                </div>
            </div>

            <div ref={menuRef} className={`menu-response ${menuOpen ? 'open' : 'close'}`}>
                <div className="menu-respon-search">
                    <div className="header-search menu-res">
                        <form>
                            <div className="search-icon">
                                <i className="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <input value={query} type="search" onChange={handleSearch} placeholder="Tìm kiếm tên phim ... " />
                        </form>
                    </div>
                    {searchStarted && query && (
                        <div className="list-search">
                            {filteredMovies.length > 0 ? (
                                filteredMovies.map((item: IMovie, index) => (
                                    <Link to={`phim/${item.slug}`} key={index} className="list-search-chid">
                                        <div className="search-image">
                                            <img src={`https://img.phimapi.com/${item.poster_url}`} alt={item.name} />
                                        </div>
                                        <div className="search-content">
                                            <h4>{item.name}</h4>
                                            <p>Năm: {item.year}</p>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <div className="no-results list-search-chid">
                                    <p>Không tìm thấy phim nào ...</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <ul className="menu-respon-header-category">
                    <li className="menu-respon-category-phimle">
                        <Link to={'/phim-le'}>Phim lẻ</Link>
                    </li>
                    <li className="menu-respon-category-phimbo">
                        <Link to={'/phim-bo'}>Phim bộ</Link>
                    </li>
                    <li className="menu-respon-category-phimbo">
                        <Link to={'/hoat-hinh'}>Hoạt hình</Link>
                    </li>
                    <li className="menu-respon-category-phimbo">
                        <Link to={'/tv-shows'}>TV Shows</Link>
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Header;
