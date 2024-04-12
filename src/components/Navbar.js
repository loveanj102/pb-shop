import { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Assets/Artboard 10 copy 5.png";

export default function Navbar({ cartData }) {
    const [textColor, setTextColor] = useState("text-white");

    // 监听滚动事件
    window.addEventListener('scroll', function () {
        if (window.scrollY > 30) {
            // 滚动超过30像素时，将文本颜色设置为黑色
            setTextColor("");
        } else {
            // 滚动未超过30像素时，将文本颜色重新设置为白色
            setTextColor("text-white");
        }
    });

    return (
        <>

            <nav className={`navbar navbar-expand-lg navbar-light fixed-top ${textColor}`}>
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img src={logo} alt="Logo" width="40" height="40" className="d-inline-block align-text-top rounded-circle" />
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className={`nav-item nav-link ${textColor}`} to='product'>Product</NavLink>
                            {/* <NavLink className={`nav-item nav-link ${textColor}`} to='form'>Contact Us</NavLink> */}
                            <NavLink to='/cart' className={`nav-link position-relative ${textColor} `}>
                                <i className='bi bi-bag-fill '></i>
                                <span className='position-absolute top-20 start-95 translate-middle badge rounded-pill bg-danger'>
                                    {cartData?.carts?.length}
                                </span>{/*取出cartData.carts裡面的品項數量 */}
                            </NavLink>
                            <NavLink className={`nav-nav-item nav-link ${textColor}`} to='/login'><i className="bi bi-person-circle"></i></NavLink>
                        </div>
                    </div>
                </div>
            </nav >
            {/* </div > */}
        </>)


}