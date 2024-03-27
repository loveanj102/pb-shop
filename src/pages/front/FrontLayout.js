import axios from "axios";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";


function FrontLayout() {

    const [cartData, setCartData] = useState({}); //預設取得購物車品項參數，是一個物件

    const getCart = async () => { // 定義取得方法
        try {
            const res = await axios.get(
                `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
            );
            // console.log('購物車內容:', res);
            setCartData(res.data.data) //讀取遠端api購物車內容
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { //使getCart功能起作用
        getCart();
    }, [])



    return (
        <>
            <Navbar cartData={cartData} /> {/*將寫入cartData傳入navbar做使用 */}

            <Outlet context={{ getCart, cartData }}></Outlet> {/*建議用物件方式傳進去 */}
            <div className="bg-dark py-5">
                <div className="container">
                    <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
                        <a className="text-white h4" href="./index.html">Logo</a>
                        {/* <ul className="d-flex list-unstyled mb-0 h4">
                            <li><a href="" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
                            <li><a href="" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
                            <li><a href="" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
                        </ul> */}
                    </div>


                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
                        <div className="mb-md-0 mb-1">
                            <p className="mb-0">02-3456-7890</p>
                            <p className="mb-0">depart.studio23@gmail.com</p>
                        </div>
                        <p className="mb-0">© 2024 Départ All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </>)
}

export default FrontLayout;