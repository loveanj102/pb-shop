import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";




function Success() {

    const { orderId } = useParams();
    const [orderData, setOrderData] = useState({});


    const getCart = async () => {
        const res = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`)
        console.log(res)
        setOrderData(res.data.order);
    }

    useEffect(() => {

        getCart(orderId);
    }, [orderId])


    return (
        <div className='container'>
            <div
                style={{
                    minHeight: '400px',
                    backgroundImage:
                        'url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)',
                    backgroundPosition: 'center center',
                }}
            ></div>
            <div className='mt-5 mb-7'>
                <div className='row'>
                    <div className='col-md-6'>
                        <h2>商品訂購成功</h2>
                        <p className='text-muted'>
                            親愛的顧客，感謝您在本平台訂購產品。我們非常感激您對我們的信任和支持，讓我們有機會為您提供優質咖啡豆服務。
                        </p>
                        <p className='text-muted'>
                            感謝您選擇本平台，我們將盡快為您出貨！
                        </p>
                        <Link to='/' className='btn btn-outline-dark me-2 rounded-0 mb-4'>
                            回到首頁
                        </Link>
                    </div>
                    <div className='col-md-6'>
                        <div className='card rounded-0 py-4'>
                            <div className='card-header border-bottom-0 bg-white px-4 py-0'>
                                <h2>產品訂購細節</h2>
                            </div>
                            <div className='card-body px-4 py-0'>
                                <ul className='list-group list-group-flush'>
                                    {Object.values(orderData?.products || {}).map((item) => {
                                        return (

                                            <li className='list-group-item px-0' key={item.id}>
                                                <div className='d-flex mt-2'>
                                                    <img
                                                        src={item.product.imageUrl}
                                                        alt=''
                                                        className='me-2'
                                                        style={{ width: '60px', height: '60px' }}
                                                    />
                                                    <div className='w-100 d-flex flex-column'>
                                                        <div className='d-flex justify-content-between fw-bold'>
                                                            <h5>{item.product.title}</h5>
                                                            <p className='mb-0'>x{item.qty}</p>
                                                        </div>
                                                        <div className='d-flex justify-content-between mt-auto'>
                                                            <p className='text-muted mb-0'>
                                                                <small>NT${item.final_total}</small>
                                                            </p>
                                                            <p className='mb-0'>NT${item.final_total}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>


                                        )

                                    })}


                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Success;