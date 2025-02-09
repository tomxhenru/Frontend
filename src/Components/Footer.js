import classNames from 'classnames/bind';
import styles from '../Styles/Footer.module.scss';

const cx = classNames.bind(styles);

function Footer() {
    return (
        <div className={cx('wrapper')}>
            <header>
                <img style={{ height: '50px' }} src="https://www.glab.vn/themes/v1/icons/logo.svg" alt="" />
            </header>

            <main>
                <div className={cx('inner')}>
                    <div className={cx('box-item')}>
                        <ul>
                            <li id={cx('item-title')}>NHÀ PHÂN PHỐI ĐỘC QUYỀN</li>
                            <li>CÔNG TY CP THỜI TRANG Glab</li>
                            <li>K2 The Kpark Văn Phú Hà Đông</li>
                            <li>0774379436</li>
                        </ul>
                    </div>

                    <div className={cx('box-item')}>
                        <ul>
                            <li id={cx('item-title')}>DANH MỤC NỔI BẬT</li>
                            <li>Giới thiệu về Glab</li>
                            <li>Giày Bóng Rổ</li>
                            <li>Giày Chạy Bộ</li>
                        </ul>
                    </div>

                    <div className={cx('box-item')}>
                        <ul>
                            <li id={cx('item-title')}>CHÍNH SÁCH CÔNG TY</li>
                            <li>CÔNG TY CP THỜI TRANG Glab</li>
                            <li>K2 The Kpark Văn Phú Hà Đông</li>
                            <li>07743794369</li>
                        </ul>
                    </div>

                    <div className={cx('box-item')}>
                        <ul>
                            <li id={cx('item-title')}>CHÍNH SÁCH CÔNG TY</li>
                            <li>CÔNG TY CP THỜI TRANG Glab</li>
                            <li>K2 The Kpark Văn Phú Hà Đông</li>
                            <li>07743794369</li>
                        </ul>
                    </div>
                </div>
            </main>
            <footer>
                <h4>Tomx</h4>
            </footer>
        </div>
    );
}

export default Footer;
