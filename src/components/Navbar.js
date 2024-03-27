import { NavLink } from "react-router-dom";


export default function Navbar({ cartData }) {

    return (
        <>
            <div className="container d-flex flex-column">
                <nav className="navbar navbar-expand-lg navbar-light ">
                    <NavLink className="navbar-brand" to="/">Départ</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-item nav-link " to='product'>Product</NavLink>
                            <NavLink className="nav-item nav-link " to='form'>Contact Us</NavLink>
                            <NavLink to='/cart' className='nav-link position-relative'>
                                <i className='bi bi-bag-fill '></i>
                                <span className='position-absolute top-20 start-95 translate-middle badge rounded-pill bg-danger'>
                                    {cartData?.carts?.length}
                                </span>{/*取出cartData.carts裡面的品項數量 */}
                            </NavLink>
                            <NavLink className="nav-nav-item nav-link " to='/login'><i className="bi bi-person-circle"></i></NavLink>
                        </div>
                    </div>
                </nav >
            </div >
        </>)


}