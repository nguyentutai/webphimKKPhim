import "../style/main.css";
import "../style/reponsite.css";
import Header from "./pages/HeaderPage";
import { Route, Routes, useLocation } from "react-router-dom";
import DetailSingeMoviePage from "./pages/Detail/DetailSingeMoviePage";
import HomePage from "./pages/HomePage";
import DetailSeriesMovie from "./pages/Detail/DetailSeriesMovies";
import DetailNewMovie from "./pages/Detail/DetailNewMovie";
import ListMovieSinge from "./pages/ListMovie/ListMovieSinge";
import ListMovieSeries from "./pages/ListMovie/ListMovieSeries";
import ListMovieCarton from "./pages/ListMovie/ListMovieCarton";
import ListTVShow from "./pages/ListMovie/ListTVShow";
import FooterPage from "./pages/FooterPage";
import ScrollToTop from "./components/ScrollPage";
import NotFoundPage from "./pages/NotFoudPage";

function App() {
  const location = useLocation();
  const isNotFoundPage = ![
    '/home',
    '/phimle',
    '/phimhot',
    '/phimchieurap',
    '/phimbo',
    '/phim-le',
    '/phim-bo',
    '/hoat-hinh',
    '/phim-moi-cap-nhat',
    '/phim',
    '/tv-shows',
    '/phim-le',
    '/phim-bo',
    '/hoat-hinh',
    '/tv-shows'
  ].some(path => location.pathname.startsWith(path));

  return (
    <>
      {!isNotFoundPage && <Header />}
      {/* Router */}
      <ScrollToTop />
      <Routes>
        <Route path='/home' element={<HomePage />} />
        <Route path='' element={<HomePage />} />
        <Route path='/phimle/:tenphim' element={<DetailSingeMoviePage />} />
        <Route path='/phimhot/:tenphim' element={<DetailSingeMoviePage />} />
        <Route path='/phimchieurap/:tenphim' element={<DetailSingeMoviePage />} />
        <Route path='/phimbo/:tenphim' element={<DetailSeriesMovie />} />
        <Route path='/phim-le/:tenphim' element={<DetailNewMovie />} />
        <Route path='/phim-bo/:tenphim' element={<DetailNewMovie />} />
        <Route path='/hoat-hinh/:tenphim' element={<DetailNewMovie />} />
        <Route path='/phim-moi-cap-nhat/:tenphim' element={<DetailNewMovie />} />
        <Route path='/phim/:tenphim' element={<DetailNewMovie />} />
        <Route path='/tv-shows/:tenphim' element={<DetailNewMovie />} />
        <Route path='/phim-le' element={<ListMovieSinge />} />
        <Route path='/phim-bo' element={<ListMovieSeries />} />
        <Route path='/hoat-hinh' element={<ListMovieCarton />} />
        <Route path='/tv-shows' element={<ListTVShow />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      {!isNotFoundPage && <FooterPage />}
    </>
  );
}

export default App;
