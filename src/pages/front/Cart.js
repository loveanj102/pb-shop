import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";

function Cart() {

    const { cartData, getCart } = useOutletContext();
    const [loadingItems, setLoadingItems] = useState([]); //避免用戶重複不斷更新，預設狀態
    const [couponCode, setCouponCode] = useState({});


    //刪除品項api功能
    const removeCartItem = async (id) => {
        try {
            const res = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`,);
            console.log(res);
            getCart();
        } catch (error) {
            console.log(error);
        }
    }
    //更新數量品項api功能
    const updateCartItem = async (item, quantity) => {
        const data = {
            data: {
                product_id: item.product_id,
                qty: quantity,
            },
        };
        setLoadingItems([...loadingItems, item.id])
        try {
            const res = await axios.put(
                `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
                data,
            );
            console.log(res);
            setLoadingItems(
                loadingItems.filter((loadingObject) => loadingObject !== item.id),
            );
            getCart();
        } catch (error) {
            console.log(error);
        }
    };



    const handleChange = (e) => { //事件綁定
        const { name, value } = e.target; //取值，name的value值
        setCouponCode({ ...couponCode, [name]: value }); //將取值寫入
    }

    const useCoupon = async (e) => {


        const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/coupon`, couponCode);
        console.log(res)

    }


    return (<>
        <div className="container">
            <div className="mt-3">
                <h3 className="mt-3 mb-4">您的產品訂單</h3>
                <div className="row">
                    <div className="col-md-8">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col" className="border-0 ps-0">產品名稱</th>
                                    <th scope="col" className="border-0">產品數量</th>
                                    <th scope="col" className="border-0">產品金額</th>
                                    <th scope="col" className="border-0"></th>
                                </tr>
                            </thead>
                            <tbody>

                                {cartData?.carts?.map((item) => {
                                    return (
                                        <tr className="border-bottom border-top" key={item.id}>
                                            <td scope="row" className="border-0 px-0 font-weight-normal py-4" >
                                                <img src={item.product.imageUrl} alt="" style={{ width: '72px', height: '72px', objectFit: 'cover' }} />
                                                <p className="mb-0 fw-bold ms-3 d-inline-block">{item.product.title}</p>
                                            </td>
                                            <td className="border-0 align-middle" style={{ maxWidth: ' 160px' }}>
                                                <div className="input-group pe-5">
                                                    <select
                                                        name=''
                                                        className='form-select'
                                                        id=''
                                                        value={item.qty}
                                                        disabled={loadingItems.includes(item.id)}
                                                        onChange={(e) => {
                                                            updateCartItem(item, e.target.value * 1);
                                                        }}
                                                    >
                                                        {[...new Array(20)].map((i, num) => {
                                                            return (
                                                                <option value={num + 1} key={num}>
                                                                    {num + 1}
                                                                </option>
                                                            );
                                                        })}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="border-0 align-middle"><p className="mb-0 ms-auto">NT${item.final_total}</p></td>
                                            <td className="border-0 align-middle">
                                                <button
                                                    type="button"
                                                    className="btn-close"
                                                    onClick={() => removeCartItem(item.id)}>
                                                </button>
                                            </td>
                                        </tr>

                                    )
                                })}
                            </tbody>
                        </table>
                        <div className="input-group w-50 mb-3">
                            <input type="text"
                                className="form-control rounded-0 border-bottom border-top-0 border-start-0 border-end-0 shadow-none"
                                placeholder="Coupon Code"
                                aria-label="Recipient's username"
                                aria-describedby="button-addon2"
                                name="code"
                                onChange={handleChange}
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-dark border-bottom border-top-0 border-start-0 border-end-0 rounded-0"
                                    type="button"
                                    id="button-addon2"
                                    onClick={useCoupon}

                                >
                                    <i className="bi bi-receipt"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="border p-4 mb-4">
                            <h4 className="fw-bold mb-4">Order Detail</h4>
                            <table className="table text-muted border-bottom">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                                        <td className="text-end border-0 px-0 pt-4">NT${cartData.total}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-0 pb-4 font-weight-normal">Payment</th>
                                        <td className="text-end border-0 px-0 pt-0 pb-4">ApplePay</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="d-flex justify-content-between mt-4">
                                <p className="mb-0 h4 fw-bold">Total</p>
                                <p className="mb-0 h4 fw-bold">NT${cartData.final_total}</p>
                            </div>
                            <Link to="/checkout" className="btn btn-dark w-100 mt-4">CheckOut</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div>





    </>)
}

export default Cart;