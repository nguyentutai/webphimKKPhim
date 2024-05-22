import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import BannerItem from '../../interfaces/BannerItem';



const Banner = () => {
    const [banner, setBanner] = useState<BannerItem[]>([]);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(true);

    const fetchBannerItems = useCallback(async (pageNum: number) => {
        const response = await fetch(`https://phimapi.com/danh-sach/phim-moi-cap-nhat?page=${pageNum}`);
        const data = await response.json();
        setBanner(prevBanner => [...prevBanner, ...data.items]);
        setLoading(false)
    }, []);
    useEffect(() => {
        setLoading(true)
        fetchBannerItems(page);
    }, [fetchBannerItems, page]);

    const handleSlideChange = (swiper: any) => {
        if (swiper.activeIndex >= banner.length - 3) {
            setPage(prevPage => prevPage + 1);
        }
    };
    if (isLoading) {
        return (
            <div className="slide container">
                <div className="silde-title">
                    <h2>Phim Mới</h2>
                </div>
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    initialSlide={3}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 20,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    // pagination={{ clickable: true }}
                    autoplay={{ delay: 4000 }}
                    modules={[EffectCoverflow, Pagination, Autoplay]}
                    className="mySwiper"
                    onSlideChange={handleSlideChange}
                >
                    <SwiperSlide className='bannerLoad'>
                    </SwiperSlide>
                    <SwiperSlide className='bannerLoad'>
                    </SwiperSlide>
                    <SwiperSlide className='bannerLoad'>
                    </SwiperSlide>
                    <SwiperSlide className='bannerLoad'>
                    </SwiperSlide>
                    <SwiperSlide className='bannerLoad'>
                    </SwiperSlide>
                    <SwiperSlide className='bannerLoad'>
                    </SwiperSlide>
                </Swiper>
            </div>
        )
    }
    return (
        <div className='slide container'>
            <div className="silde-title">
                <h2>Phim Mới</h2>
            </div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                initialSlide={3}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 20,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                }}
                // pagination={{ clickable: true }}
                autoplay={{ delay: 4000 }}
                modules={[EffectCoverflow, Pagination, Autoplay]}
                className="mySwiper"
                onSlideChange={handleSlideChange}
            >
                {banner?.map((item, index) => (
                    <SwiperSlide className='banner' key={index}>
                        <div className="image-banner">
                            <img src={item.poster_url} alt={item.name} />
                        </div>
                        <div className="banner-title" >
                            <Link to={`phim-moi-cap-nhat/${item.slug}`} className="banner-title-video">
                                <i className="fa-regular fa-circle-play"></i>
                            </Link>
                            <div className="banner-title-name">
                                <p>{item.name}</p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Banner;
