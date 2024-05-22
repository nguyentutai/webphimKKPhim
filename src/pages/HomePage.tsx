import ArticlePage from "./Home/ArticlePage"
import Banner from "./Home/Banner"
import Hotmovies from "./Home/HotMoviePage"
import Seriesmovie from "./Home/SeriesmoviePage"
import SingeMovie from "./Home/SingeMoviePage"
import { HelmetProvider, Helmet } from "react-helmet-async";


const HomePage = () => {
    return (
        <div className="container1">
            <HelmetProvider>
                <Helmet>
                    <title>KKPhim - Home</title>
                    <meta name="description" content="KKPhim xem phim miễn phí, cập nhật phim nhanh chóng và mới nhất" />
                </Helmet>
                <Banner />
                <div className="container2 container">
                    <aside className="slider-container">
                        <Hotmovies />
                        <Seriesmovie />
                        <SingeMovie />
                    </aside>
                    <ArticlePage />
                </div>
            </HelmetProvider>
        </div>
    )
}
export default HomePage