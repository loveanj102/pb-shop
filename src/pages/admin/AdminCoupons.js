import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import CouponModal from '../../components/CouponModal'
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import { Modal } from 'bootstrap';

function AdminCoupons() {
    const [coupons, setCoupons] = useState([]); // 空陣列
    const [pagination, setPagination] = useState({}); //物件內容
    const couponModal = useRef(null); //使用useRef匯入Modal
    const deleteModal = useRef(null);

    // Type:決定Modal展開的用途
    //此段程式碼為“編輯”商品資訊預設變數
    const [type, setType] = useState('create'); //當我點選type是'create'的時候，就表示我是要新增商品
    const [tempCoupon, setTempCoupon] = useState({}); //當我編輯資料，必須要帶入原本資料，需要有一個暫存欄位


    useEffect(() => {
        couponModal.current = new Modal('#productModal', {
            backdrop: 'static',
        }); //預設此Modal為一個新的Modal,並且backdrop click = false
        deleteModal.current = new Modal('#deleteModal', { backdrop: 'static', });
        getCoupons();
    }, []);

    const getCoupons = async (page = 1) => { //page=1 參數預設值，假設沒有帶入任何函數預設值就會等於1
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupons?page=${page}`,
        ); //4.遠端取得產品列表
        console.log(res);
        setCoupons(res.data.coupons); //取出產品相關資料，產品資料放置位置，看console.log
        setPagination(res.data.pagination); //取出分頁相關資料
    }
    //以下程式碼為展開＆關閉Modal
    const openCouponModal = (type, item) => {
        setType(type); //寫入方法傳入type值
        setTempCoupon(item); // 寫入方法傳入product值
        couponModal.current.show();
    }

    const closeModal = () => {
        couponModal.current.hide();
    }

    const openDeleteModal = (product) => { //刪除Modal只需傳入產品資訊，不需要做狀態判斷
        setTempCoupon(product); // 寫入方法傳入product值
        deleteModal.current.show();
    };

    const closeDeleteModal = () => {
        deleteModal.current.hide();
    };

    const deleteCoupon = async (id) => { //使用async傳入id，將要刪除的產品從API刪除
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/coupon/${id}`);
            if (res.data.success) {
                getCoupons();
                deleteModal.current.hide();
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="p-3">
            <CouponModal
                closeModal={closeModal}
                getCoupons={getCoupons}
                tempCoupon={tempCoupon}
                type={type} />{/*透過props的方法傳送給元件*/}
            <DeleteModal
                close={closeDeleteModal}
                text={tempCoupon.title}
                handleDelete={deleteCoupon}
                id={tempCoupon.id} />{/*handleDelete可以被重複使用，所以不需要特別設定專屬名稱*/}{/*透過props的方法傳送給元件*/}
            <h3>優惠券列表</h3>
            <hr />
            <div className="text-end">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openCouponModal('create', {})} //將openProductModal改為箭頭函示，為了要帶入判斷'create' , {}預設為一個空物件
                >
                    建立新優惠券
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">標題</th>
                        <th scope="col">折扣</th>
                        <th scope="col">到期日</th>
                        <th scope="col">優惠碼</th>
                        <th scope="col">啟用狀態</th>
                        <th scope="col">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((product) => { //找的時候用products複數意旨全部產品，取出帶入值使用product單筆取出
                        return (
                            <tr key={product.id}>
                                <td>{product.title}</td>
                                <td>{product.percent}</td>
                                <td>{new Date(product.due_date).toDateString()}</td>
                                <td>{product.code}</td>
                                <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => openCouponModal('edit', product)}//,後面帶入產品資訊
                                    >
                                        編輯
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-outline-danger btn-sm ms-2"
                                        onClick={() => openDeleteModal(product)}

                                    >
                                        刪除
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <Pagination pagination={pagination} changePage={getCoupons} />
        </div>
    )
}

export default AdminCoupons;