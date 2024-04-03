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
            {/* Footer */}
            <div className="footer-bg-color py-4">
                <div className="container">
                    {/* <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4"> */}

                    {/* </div> */}
                    <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
                        <div className="mb-md-0 mb-0">
                            {/* <a className="text-white h4 footer-logo-deco" href="./index.html">Départ Studio</a> */}
                            <p className="mb-0 mt-0">depart.studio23@gmail.com</p>
                        </div>
                        <p className="mb-0">© 2024 Départ All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </>)
}

export default FrontLayout;