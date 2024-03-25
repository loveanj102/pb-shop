import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    // const navigate = useNavigate(); //預設navigate用useNavigate狀態

    const [data, setData] = useState({  //基礎狀態設定
        username: '', // 兩者皆為空字串
        password: '',
    });

    const [loginState, setLoginState] = useState({});

    const handleChange = (e) => { //事件綁定
        const { name, value } = e.target; //取值，name的value值
        setData({ ...data, [name]: value }); //將取值寫入

    }

    const submit = async (e) => {
        try {
            const res = await axios.post(`/v2/admin/signin`, data); //1.先登入API
            const { token, expired } = res.data; //2.預設取值token
            document.cookie = `shopToken=${token}; expires=${new Date(expired)};`; //3.儲存token
            if (res.data.success) {  //如果api回傳為success，那就轉址到/admin/products頁面
                // navigate(`/admin/products`)
            }

        } catch (error) {
            console.log(error);
            setLoginState(error.response.data);

        }
    }








    return (<div className="container py-5">
        <div className="row justify-content-center">
            <div className="col-md-6">
                <h2>訂單管理登入系統</h2>

                <div className={`alert alert-danger ${loginState.message ? 'd-block' : 'd-none'}`} role="alert">
                    {loginState.message} {/*直接帶入api錯誤訊息*/}
                </div>
                <div className="mb-2">
                    <label htmlFor="email" className="form-label w-100">
                        Email
                        <input id="email" className="form-control" name="username" type="email" placeholder="Email Address" onChange={handleChange} />
                    </label>
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="form-label w-100">
                        密碼
                        <input type="password" className="form-control" name="password" id="password" placeholder="name@example.com" onChange={handleChange} />
                    </label>
                </div>
                <button type="button" className="btn btn-primary" onClick={submit}>登入</button>
            </div>
        </div>
    </div>)
}

export default Login;