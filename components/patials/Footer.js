import { CheckCircleOutlined, RocketFilled, SyncOutlined } from '@ant-design/icons'
import styles from './patials.module.scss'
import Link from 'next/link'

export default function Footer() {

    return (
        <div className={styles['wrapper_footer']}>
            <div className={styles['footer_banner-list']}>
                <div className={styles['footer_banner-item']}>
                    <RocketFilled />
                    FREESHIP ĐƠN HÀNG TỪ 500K
                </div>
                <div className={styles['footer_banner-item']}>
                    <SyncOutlined />
                    ĐỔI TRẢ TRONG VÒNG 7 NGÀY
                </div>
                <div className={styles['footer_banner-item']}>
                    <CheckCircleOutlined />
                    THANH TOÁN KHI NHẬN HÀNG
                </div>
            </div>
            <div className={styles['footer_body']}>
                <div className={styles['footer_body-content']}>
                    <div className={styles['content_column']}>
                        <h3 className={styles['content_column-title']}>Store Location</h3>
                        <span className={styles['content_column-span']}><strong>Store 1: </strong> 267 Khương Trung, Thanh Xuân, Hà Nội</span>
                        <span className={styles['content_column-span']}><strong>Store 2: </strong> Thân Thừa Quý, Vĩnh Trại, Lạng Sơn</span>
                    </div>
                    <div className={styles['content_column']}>
                        <Link href='/chinh-sach'><label className={styles['content_column-link']}>Chính sách đổi trả</label></Link>
                        <Link href='/tro-giup'><label className={styles['content_column-link']}>Trợ giúp</label></Link>
                    </div>
                    <div className={styles['content_column']}>
                        <div className={styles['content_column-box']}>
                            <h3 className={styles['content_column-title']}>Hỗ trợ (9:00 - 21:00)</h3>
                            <span className={styles['content_column-span']}><strong>Hotline : </strong> 0852407686</span>
                            <span className={styles['content_column-span']}><strong>Email : </strong> info@myshop.vn</span>
                        </div>
                        <div className={styles['content_column-box']}>
                            <h3 className={styles['content_column-title']}>Theo dõi chúng tôi</h3>
                            <ul className={styles['content_column-list']}>
                                <li className={styles['list-item']}><a href="facebook.com"><img src='/images/icon_fbn.jpg' alt='icon_fbn'/></a></li>
                                <li className={styles['list-item']}><a href='instagram.com'><img src='/images/icon_instan.jpg' alt='icon_insta'/></a></li>
                            </ul>
                        </div>
                        <div className={styles['content_column-box']}>
                            <h3 className={styles['content_column-title']}>Phương thức thanh toán</h3>
                            <ul className={styles['content_column-list']}>
                                <li className={styles['list-item']}><img src='/images/img-payment.jpg' style={{backgroundColor: 'white'}} alt='icon_payment'/></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles['footer_body-poweredBy']}>
                    <h3>Phát triển bởi thanh đặng</h3>
                </div>
            </div>
        </div>
    )
}