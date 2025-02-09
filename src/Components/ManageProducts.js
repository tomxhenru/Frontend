import classNames from 'classnames/bind';
import styles from '../Styles/ManageProducts.module.scss';
import Pagination from './Pagination';

import React, { useState, useEffect } from 'react';
import ModalDeletePro from '../utils/Modal/DeleteProduct';
import ModalUpdatePro from '../utils/Modal/ModalUpdatePro';
import { ToastContainer } from 'react-toastify';

import request from '../Config/api';

const cx = classNames.bind(styles);

function ManageProducts({ setCheckOpenAddProduct }) {
    const [page, setPage] = useState(1);

    const [selectedProduct, setSelectedProduct] = useState({});

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [showModalUpdate, setShowModalUpdate] = useState(false);

    const [dataProduct, setDataProduct] = useState([]);

    const productsPerPage = 6;
    const startIndex = (page - 1) * productsPerPage;
    const totalPages = Math.ceil(dataProduct.length / productsPerPage);
    const currentProducts = dataProduct.slice(startIndex, startIndex + productsPerPage);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleShowModalDelete = (item) => {
        setSelectedProduct(item);
        setShowModalDelete(true);
    };

    const handleShowModalUpdate = (item) => {
        setSelectedProduct(item);
        setShowModalUpdate(true);
    };

    useEffect(() => {
        fetchData();
    }, [showModalDelete, showModalUpdate]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchData = async () => {
        try {
            const productsResponse = await request.get('/api/products');
            setDataProduct(productsResponse.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div>
            <ToastContainer />
            <div className={cx('manage-product')}>
                <div className={cx('title')}>
                    <h2>Quản Lý Sản Phẩm</h2>
                    <button onClick={() => setCheckOpenAddProduct(true)} type="button" className="btn btn-primary">
                        Thêm Sản Phẩm
                    </button>
                </div>
                <div className="table-responsive mt-4">
                    <table className="table table-bordered border-primary">
                        <thead>
                            <tr>
                                <th scope="col">Ảnh</th>
                                <th scope="col">Tên Sản Phẩm</th>
                                <th scope="col">Loại Giày</th>
                                <th scope="col">Giá Sản Phẩm</th>
                                <th scope="col">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((item) => (
                                <tr key={item._id}>
                                    <td>
                                        <img
                                            style={{ width: '80px' }}
                                            src={`${process.env.REACT_APP_IMG}/${item.img[0]}`}
                                            alt=""
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        {item.type === 1 ? 'Giày Nam' : item.type === 2 ? 'Giày Nữ' : 'Giày Trẻ Em'}
                                    </td>
                                    <td>{item.price.toLocaleString()} đ</td>
                                    <td>
                                        <button
                                            style={{ marginRight: '15px' }}
                                            className="btn btn-danger"
                                            onClick={() => handleShowModalDelete(item)}
                                        >
                                            Xóa
                                        </button>
                                        <button
                                            className={cx('btn-update', 'btn', 'btn-warning')}
                                            onClick={() => handleShowModalUpdate(item)}
                                        >
                                            Sửa
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className={cx('pagination')}>
                        <Pagination totalPages={totalPages} page={page} handlePageChange={handlePageChange} />
                    </div>
                </div>
            </div>
            <ModalDeletePro show={showModalDelete} setShow={setShowModalDelete} nameProduct={selectedProduct} />
            <ModalUpdatePro show={showModalUpdate} setShow={setShowModalUpdate} data={selectedProduct} />
        </div>
    );
}

export default ManageProducts;
