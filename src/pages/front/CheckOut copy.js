import { Link, useOutletContext, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Input } from '../../components/FormElements';
import axios from 'axios';



function CheckOut() {
    const { cartData } = useOutletContext();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: 'onTouched',
    });

    const navigate = useNavigate();


    const onSubmit = async (data) => {
        const { name, email, tel, address } = data;
        const form = {
            data: {
                user: {
                    name,
                    email,
                    tel,
                    address,
                },
            },
        };
        const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/order`, form);
        console.log(res);
        navigate(`/success/${res.data.orderId}`)
    };



    return (<>
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <h3 className="fw-bold mb-4 pt-3">Checkout</h3>
                    </div>
                </div>

                <div className="row flex-row-reverse justify-content-center pb-5">
                    <div className="col-md-4">
                        <div className="border p-4 mb-4">
                            {cartData?.carts?.map((item) => {
                                return (
                                    <div className='d-flex' key={item.id}>
                                        <img src={item.product.imageUrl} alt="" className="me-2" style={{ width: '48px', height: '48px', objectFit: 'cover' }} />
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between">
                                                <p className="mb-0 fw-bold">{item.product.title}</p>
                                                <p className="mb-0">NT${item.final_total}</p>
                                            </div>
                                            <p className="mb-0 fw-bold">x{item.qty}</p>
                                        </div>
                                    </div>
                                )
                            })}
                            <table className="table mt-4 border-top border-bottom text-muted">
                                <tbody>
                                    <tr>
                                        <th scope="row" className="border-0 px-0 pt-4 font-weight-normal">Subtotal</th>
                                        <td className="text-end border-0 px-0 pt-4">NT${cartData.final_total}</td>
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
                        </div>
                    </div>

                    <div className="col-md-6">

                        <p>Contact information</p>

                        <div className="mb-0">
                            <Input
                                className="form-control"
                                id='email'
                                aria-describedby="emailHelp"
                                labelText='Email'
                                type='email' errors={errors}
                                register={register}
                                rules={{
                                    required: 'Email 為必填',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Email 格式不正確',
                                    },
                                }}
                            ></Input>
                        </div>
                        <p className="mt-4">Shipping address</p>

                        <div className="mb-2">
                            <Input
                                id='address'
                                labelText='地址'
                                type='address'
                                errors={errors}
                                register={register}
                                rules={{
                                    required: '地址為必填',
                                }}
                            ></Input>
                        </div>
                        <div className="mb-2">
                            <Input
                                id='name'
                                type='text'
                                className="form-control"
                                errors={errors}
                                labelText='Name'
                                register={register}
                                rules={{
                                    required: '使用者名稱為必填',
                                    maxLength: {
                                        value: 10,
                                        message: '使用者名稱長度不超過 10',
                                    },
                                }}
                            ></Input>

                        </div>
                        <div className="mb-2">
                            <Input
                                id='tel'
                                className="form-control"
                                labelText='Phone Number'
                                type='tel'
                                errors={errors}
                                register={register}
                                rules={{
                                    required: '電話為必填',
                                    minLength: {
                                        value: 6,
                                        message: '電話不少於 6 碼',
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: '電話不超過 12 碼',
                                    },
                                }}
                            ></Input>
                        </div>
                        {/* <div className="mb-2">
                            <label for="ContactMessage" className="text-muted mb-0">Message</label>
                            <textarea className="form-control" rows="3" id="ContactMessage" placeholder="message ... "></textarea>
                        </div> */}

                        <div className="d-flex flex-column-reverse flex-md-row mt-4 justify-content-between align-items-md-center align-items-end w-100">
                            <Link to="/cart" className="text-dark mt-md-0 mt-3"><i className="fas fa-chevron-left me-2"></i>繼續選購</Link>
                            <Link to="/success" className="btn btn-dark py-3 px-7">去付款</Link>
                        </div>
                    </div>

                </div>

            </form>
        </div>
    </>)
}

export default CheckOut;