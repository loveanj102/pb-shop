import { Outlet, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useReducer } from 'react';
import Message from '../../components/Message';
import { MessageContext, messageReducer, initState } from '../../store/MessageStore';


function Dashboard() {

    const navigate = useNavigate();
    const reducer = useReducer(messageReducer, initState);
    const logout = () => { //路由保護，按下登出按鈕清除cookie，事件建立
        document.cookie = 'shopToken=;'
        navigate(`/login`) //網址轉回login page
    }

    //取出cookie token值 , 並取得產品列表
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("shopToken="))
        ?.split("=")[1];
    console.log(token);
    axios.defaults.headers.common['Authorization'] = token; //4.登入時將token帶入


    useEffect(() => {
        if (!token) { //如果用戶沒有攜帶token將強制回到login頁面
            navigate(`/login`);
        }
        (async () => { //如果用戶有攜帶token就去驗證token是否正確
            try {
                await axios.post(`/v2/api/user/check`); //判斷用戶是否登入的方法
            } catch (error) {
                console.log(error);
                if (!error.response.data.success) {
                    navigate(`/login`);
                }
            }
        })();
    }, [navigate, token]);


    return (
        <MessageContext.Provider value={reducer}>
            <Message />
            <nav className="navbar navbar-expand-lg bg-dark">
                <div className="container-fluid">
                    <p className="text-white mb-0">
                        Départ後台管理系統
                    </p>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button type="button" className="btn btn-sm btn-light" onClick={logout}>
                                    登出
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="d-flex" style={{ minHeight: 'calc(100vh - 56px)' }}>
                <div className="bg-light" style={{ width: '200px' }}>
                    <ul className="list-group list-group-flush">
                        <Link className="list-group-item list-group-item-action py-3" to="/admin/products">
                            <i className="bi bi-cup-fill me-2" />
                            產品列表
                        </Link>
                        <Link className="list-group-item list-group-item-action py-3" to="/admin/coupons">
                            <i className="bi bi-ticket-perforated-fill me-2" />
                            優惠卷列表
                        </Link>
                        <Link className="list-group-item list-group-item-action py-3" to="/admin/orders">
                            <i className="bi bi-receipt me-2" />
                            訂單列表
                        </Link>
                    </ul>
                </div>
                <div className="w-100">
                    {/* Products */}
                    {token && <Outlet />} {/*token判斷是否夾帶 */}
                    {/* Products end */}
                </div>
            </div>
        </MessageContext.Provider>
    )
}

export default Dashboard;