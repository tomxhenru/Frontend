import classNames from 'classnames/bind';
import styles from '../Styles/Category.module.scss';

import Header from '../Components/Header';
import Footer from '../Components/Footer';
import CardBody from '../Components/CardBody';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import request from '../Config/api';
import Pagination from '../Components/Pagination';

const cx = classNames.bind(styles);

function Category() {
    const [dataProducts, setDataProducts] = useState([]);
    const [checkList, setCheckList] = useState(1);
    const [sortOrder, setSortOrder] = useState('1');
    const [page, setPage] = useState(1);
    const [lengthCart, setLengthCart] = useState(0);
    const token = document.cookie;

    const location = useLocation();
    const pathName = location.pathname.slice(10);

    useEffect(() => {
        const fetchData = async () => {
            if (!token) {
                return;
            }

            const res = await request.get('/api/cart');
            res.data.map((item) => setLengthCart(item.products.length));
        };
        fetchData();
    }, [token]);

    useEffect(() => {
        if (pathName === 'giay-nam') {
            setCheckList(1);
        } else if (pathName === 'giay-nu') {
            setCheckList(2);
        } else if (pathName === '') {
            setCheckList('');
        } else {
            setCheckList(3);
        }
    }, [pathName]);

    useEffect(() => {
        request.get('/api/products').then((res) => setDataProducts(res.data));
    }, []);

    const filteredProducts = dataProducts.filter((item) => checkList === '' || item.type === Number(checkList));

    const sortedProducts = filteredProducts.sort((a, b) => {
        return sortOrder === '1' ? a.price - b.price : b.price - a.price;
    });

    const productsPerPage = 12;
    const startIndex = (page - 1) * productsPerPage;
    const currentProducts = sortedProducts.slice(startIndex, startIndex + productsPerPage);
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathName]);

    return (
        <div className={cx('wrapper')}>
            <ToastContainer />
            <header>
                <Header lengthCart={lengthCart} />
            </header>

            <main className={cx('main')}>
                <div className={cx('filter-product')}>
                    {!(pathName === 'giay-nam' || pathName === 'giay-nu' || pathName === 'giay-tre-em') && (
                        <div>
                            <select
                                onChange={(e) => setCheckList(e.target.value)}
                                className="form-select"
                                aria-label="Default select example"
                            >
                                <option value="">Chọn Loại Giày</option>
                                <option value={1}>Giày Nam</option>
                                <option value={2}>Giày Nữ</option>
                                <option value={3}>Giày Trẻ Em</option>
                            </select>
                        </div>
                    )}

                    <div>
                        <select
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="form-select"
                            aria-label="Default select example"
                        >
                            <option value="" disabled>
                                Lọc Theo Giá
                            </option>
                            <option value="1">Từ Thấp Đến Cao</option>
                            <option value="2">Từ Cao Đến Thấp</option>
                        </select>
                    </div>
                </div>

                <div className={cx('card')}>
                    {currentProducts.map((item) => (
                        <CardBody key={item._id} item={item} />
                    ))}
                </div>

                <div className={cx('pagination')}>
                    <Pagination totalPages={totalPages} page={page} handlePageChange={handlePageChange} />
                </div>
            </main>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default Category;
