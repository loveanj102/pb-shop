import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useOutletContext, useParams, Link } from "react-router-dom";




function ProductDetail() {

    const [product, setProduct] = useState({}); // 空陣列,只有單筆，所以娶回來資料會是物件格式
    const { id } = useParams(); //useParams是一個方法，必須要有括號才能運作，id用解構的方法取出
    const [cartQuantity, setCartQuantity] = useState(1);//為加減號設定參數，起始值為1
    const [isLoading, setIsLoading] = useState(false); //寫入一個狀態，預設為false
    const { getCart } = useOutletContext(); //用useOutletContext把此方法重新取回



    const addToCart = async () => {
        const data = {
            data: {
                product_id: product.id,
                qty: cartQuantity,
            },
        };
        setIsLoading(true) //設定產品loading時為true
        try {
            const res = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
            console.log(res);
            getCart();
            setIsLoading(false);  //當axios執行時，暫時改為false
        } catch (error) {
            console.log(error)
            setIsLoading(false);
        }

    }



    const getProduct = async (id) => { //page=1 參數預設值，假設沒有帶入任何函數預設值就會等於1
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`); //4.遠端取得產品列表
        console.log(productRes);
        setProduct(productRes.data.product); //取出產品相關資料，產品資料放置位置，看console.log
    }

    useEffect(() => {
        getProduct(id);

    }, [id])











    return (<>
        <div className="container">
            <div className="row align-items-center">
                <div className="col-md-7">
                    {/* <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <img src={product.imageUrl} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={product.imageUrl} className="d-block w-100" alt="..." />
                            </div>
                            <div className="carousel-item">
                                <img src={product.imageUrl} className="d-block w-100" alt="..." />
                            </div>
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div> */}
                    <img src={product.imageUrl} class="img-fluid rounded" alt="..."></img>

                </div>

                <div className="col-md-5">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                            <li className="breadcrumb-item"><Link className="text-muted" to='/'>Home</Link></li>
                            <li className="breadcrumb-item"><Link className="text-muted" to='/product'>Product</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Detail</li>
                        </ol>
                    </nav>
                    <h2 className="fw-bold h1 mb-1">{product.title}</h2>
                    <p className="h4 fw-bold text-end">NT${product.price}</p>
                    <div className="row align-items-center">
                        <div className="col-6">
                            <div className="input-group my-3 bg-light rounded">
                                <div className="input-group-prepend">
                                    <button className="btn btn-outline-dark border-0 py-2"
                                        type="button"
                                        id="button-addon1"
                                        onClick={() => setCartQuantity((pre) => pre === 1 ? pre : pre - 1)}> {/*三元運算值，如果pre === 1 不做任何更動 */}
                                        <i className="bi bi-dash"></i>
                                    </button>
                                </div>
                                <input
                                    type="number"
                                    className="form-control border-0 text-center my-auto shadow-none bg-light"
                                    placeholder=""
                                    aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    value={cartQuantity}
                                    readOnly />
                                <div className="input-group-append">
                                    <button
                                        className="btn btn-outline-dark border-0 py-2"
                                        type="button"
                                        id="button-addon2"
                                        onClick={() => setCartQuantity((pre) => pre + 1)}>
                                        <i className="bi bi-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-6">
                            <button
                                type="button"
                                href="./checkout.html"
                                className="text-nowrap btn btn-dark w-100 py-2"
                                onClick={() => addToCart()}
                                disabled={isLoading}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-5">
                <div className="col-md-4">
                    <p>{product.content}</p>
                </div>
                <div className="col-md-3">
                    <p className="text-muted">{product.description}</p>
                </div>
            </div>




        </div >
    </>)
}

export default ProductDetail;