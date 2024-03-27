import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import OrderModal from '../../components/OrderModal'
import Pagination from '../../components/Pagination';
import { Modal } from 'bootstrap';

function AdminProducts() {
    const [orders, setOrders] = useState([]); // 空陣列
    const [pagination, setPagination] = useState({}); //物件內容
    const orderModal = useRef(null); //使用useRef匯入Modal

    // Type:決定Modal展開的用途
    //此段程式碼為“編輯”商品資訊預設變數
    const [type, setType] = useState('create'); //當我點選type是'create'的時候，就表示我是要新增商品
    const [tempOrder, setTempOrder] = useState({}); //當我編輯資料，必須要帶入原本資料，需要有一個暫存欄位


    useEffect(() => {
        orderModal.current = new Modal('#productModal', { backdrop: 'static', }); //預設此Modal為一個新的Modal,並且backdrop click = false
        getOrders();
    }, []);

    const getOrders = async (page = 1) => { //page=1 參數預設值，假設沒有帶入任何函數預設值就會等於1
        const ordersRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/orders?page=${page}`); //4.遠端取得產品列表
        console.log(ordersRes);
        setOrders(ordersRes.data.orders); //取出產品相關資料，產品資料放置位置，看console.log
        setPagination(ordersRes.data.pagination); //取出分頁相關資料
    }
    //以下程式碼為展開＆關閉Modal
    const openOrderModal = (type, product) => {
        setType(type); //寫入方法傳入type值
        setTempOrder(product); // 寫入方法傳入product值
        orderModal.current.show();
    }

    const closeOrderModal = () => {
        orderModal.current.hide();
    }


    return (
        <div className="p-3">
            <OrderModal
                closeOrderModal={closeOrderModal}
                getOrders={getOrders}
                tempOrders={tempOrder}
                type={type} /> {/*透過props的方法傳送給元件*/}

            <h3>產品列表</h3>
            <hr />
            <div className="text-end">
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope='col'>訂單 id</th>
                        <th scope='col'>購買用戶</th>
                        <th scope='col'>訂單金額</th>
                        <th scope='col'>付款狀態</th>
                        <th scope='col'>付款日期</th>
                        <th scope='col'>留言訊息</th>
                        <th scope='col'>編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => { //找的時候用products複數意旨全部產品，取出帶入值使用product單筆取出
                        return (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>
                                    {order.user?.name}
                                    {order.user?.email}
                                </td>
                                <td>${order.total}</td>
                                <td>
                                    {order.is_paid ? (
                                        <span className='text-success fw-bold'>付款完成</span>
                                    ) : (
                                        '未付款'
                                    )}
                                </td>
                                <td>
                                    {order.paid_date
                                        ? new Date(order.paid_date * 1000).toLocaleString()
                                        : '未付款'}
                                </td>
                                <td>{order.message}</td>

                                <td>
                                    <button
                                        type='button'
                                        className='btn btn-primary btn-sm'
                                        onClick={() => {
                                            openOrderModal(order);
                                        }}
                                    >
                                        查看
                                    </button>
                                </td>
                            </tr>
                        )
                    })}

                </tbody>
            </table>

            <Pagination pagination={pagination} changePage={getOrders} />
        </div>
    )
}

export default AdminProducts;