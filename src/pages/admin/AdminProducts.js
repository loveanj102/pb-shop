import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import ProductModal from '../../components/ProductModal'
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import { Modal } from 'bootstrap';

function AdminProducts() {
    const [products, setProducts] = useState([]); // 空陣列
    const [pagination, setPagination] = useState({}); //物件內容
    const productModal = useRef(null); //使用useRef匯入Modal
    const deleteModal = useRef(null);

    // Type:決定Modal展開的用途
    //此段程式碼為“編輯”商品資訊預設變數
    const [type, setType] = useState('create'); //當我點選type是'create'的時候，就表示我是要新增商品
    const [tempProduct, setTempProduct] = useState({}); //當我編輯資料，必須要帶入原本資料，需要有一個暫存欄位


    useEffect(() => {
        productModal.current = new Modal('#productModal', { backdrop: 'static', }); //預設此Modal為一個新的Modal,並且backdrop click = false
        deleteModal.current = new Modal('#deleteModal', { backdrop: 'static', });
        getProducts();
    }, []);

    const getProducts = async (page = 1) => { //page=1 參數預設值，假設沒有帶入任何函數預設值就會等於1
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`); //4.遠端取得產品列表
        console.log(productRes);
        setProducts(productRes.data.products); //取出產品相關資料，產品資料放置位置，看console.log
        setPagination(productRes.data.pagination); //取出分頁相關資料
    }
    //以下程式碼為展開＆關閉Modal
    const openProductModal = (type, product) => {
        setType(type); //寫入方法傳入type值
        setTempProduct(product); // 寫入方法傳入product值
        productModal.current.show();
    }

    const closeProductModal = () => {
        productModal.current.hide();
    }

    const openDeleteModal = (product) => { //刪除Modal只需傳入產品資訊，不需要做狀態判斷
        setTempProduct(product); // 寫入方法傳入product值
        deleteModal.current.show();
    }

    const closeDeleteModal = () => {
        deleteModal.current.hide();
    };

    const deleteProduct = async (id) => { //使用async傳入id，將要刪除的產品從API刪除
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`)
            if (res.data.success) { //判斷如果api回傳資料為success就重新整理頁面
                getProducts();
                deleteModal.current.hide();
            }
        } catch (error) {
            console.log(error);
        }
    }



    return (
        <div className="p-3">
            <ProductModal
                closeProductModal={closeProductModal}
                getProducts={getProducts}
                tempProduct={tempProduct}
                type={type} /> {/*透過props的方法傳送給元件*/}
            <DeleteModal
                close={closeDeleteModal}
                text={tempProduct.title}
                handleDelete={deleteProduct}
                id={tempProduct.id} />{/*handleDelete可以被重複使用，所以不需要特別設定專屬名稱*/}{/*透過props的方法傳送給元件*/}
            <h3>產品列表</h3>
            <hr />
            <div className="text-end">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => openProductModal('create', {})} //將openProductModal改為箭頭函示，為了要帶入判斷'create' , {}預設為一個空物件
                >
                    建立新商品
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">分類</th>
                        <th scope="col">名稱</th>
                        <th scope="col">售價</th>
                        <th scope="col">啟用狀態</th>
                        <th scope="col">編輯</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => { //找的時候用products複數意旨全部產品，取出帶入值使用product單筆取出
                        return (
                            <tr key={product.id}>
                                <td>{product.category}</td>
                                <td>{product.title}</td>
                                <td>{product.price}</td>
                                <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                                <td>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={() => openProductModal('edit', product)}//,後面帶入產品資訊
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

            <Pagination pagination={pagination} changePage={getProducts} />
        </div>
    )
}

export default AdminProducts;