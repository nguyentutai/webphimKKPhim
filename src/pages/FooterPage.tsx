import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const FooterPage = () => {
    const [movie, setMovie] = useState<any | null>([]);
    useEffect(() => {
        fetch('https://phimapi.com/danh-sach/phim-moi-cap-nhat').then(res => res.json())
            .then(data => {
                setMovie(data.pagination.totalItems)
            })
    }, [])
    return (
        <footer>
            <div className="footer-page container">
                <div className="content-footer-left">
                    <h3>GIỚI THIỆU</h3>
                    <Link to={''}>
                        <img src="../logo/logoKKPhim.png" alt="" />
                    </Link>
                    <p>KKPhim nơi phát trực tuyến các bộ phim mới nhất miễn phí Full HD. Nguồn phim được tổng hợp trên mạng và không được lưu trữ trên máy chủ.</p>
                </div>
                <div className="content-footer-between">
                    <h3>DANH SÁCH THỂ LOẠI</h3>
                    <Link to={''}>
                        Phim lẻ
                    </Link>
                    <Link to={''}>
                        Phim bộ
                    </Link>
                    <Link to={''}>
                        Phim hoạt hình
                    </Link>
                    <Link to={''}>
                        TV Shows
                    </Link>
                </div>
                <div className="content-footer-right">
                    <h3>THỐNG KÊ</h3>
                    <p>Tổng số phim tại KKPhim</p>
                    <p className="count-movie">{movie}</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterPage