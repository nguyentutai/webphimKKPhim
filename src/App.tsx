import "../style/main.css"
import "../style/reponsite.css"
import Header from "./pages/HeaderPage"
import { Route, Routes } from "react-router-dom"
import DetailSingeMoviePage from "./pages/Detail/DetailSingeMoviePage"
import HomePage from "./pages/HomePage"
import DetailSeriesMovie from "./pages/Detail/DetailSeriesMovies"
import DetailNewMovie from "./pages/Detail/DetailNewMovie"
import ListMovieSinge from "./pages/ListMovie/ListMovieSinge"
import ListMovieSeries from "./pages/ListMovie/ListMovieSeries"
import ListMovieCarton from "./pages/ListMovie/ListMovieCarton"
import ListTVShow from "./pages/ListMovie/ListTVShow"
import FooterPage from "./pages/FooterPage"
import ScrollToTop from "./components/ScrollPage"

function App() {

  return (
    <>
      <Header />
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
        <Route path='/phim-le' element={
          <ListMovieSinge />
        } />
        <Route path='/phim-bo' element={
          <ListMovieSeries />
        } />
        <Route path='/hoat-hinh' element={
          <ListMovieCarton />
        } />
        <Route path='/tv-shows' element={
          <ListTVShow />
        } />
      </Routes>
      <FooterPage />
    </>
  )
}

export default App
