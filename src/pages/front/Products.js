import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from '../../components/Pagination';
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

function Products() {

    const [products, setProducts] = useState([]); // 空陣列
    const [pagination, setPagination] = useState({}); //物件內容
    const [isLoading, setLoading] = useState(false)

    const getProducts = async (page = 1) => { //page=1 參數預設值，假設沒有帶入任何函數預設值就會等於1
        setLoading(true)
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`); //4.遠端取得產品列表
        console.log(productRes);
        setProducts(productRes.data.products); //取出產品相關資料，產品資料放置位置，看console.log
        setPagination(productRes.data.pagination); //取出分頁相關資料
        setLoading(false)
    }

    useEffect(() => {
        getProducts(1);
    }, [])


    return (<>
        <Loading isLoading={isLoading} />


        <div className="position-relative d-flex align-items-center justify-content-center" style={{ minHeight: '400px' }}>
            <div className="position-absolute"
                style={{ top: 0, bottom: 0, left: 0, right: 0, backgroundImage: `url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80)`, backgroundPosition: 'center center', opacity: 0.1, }}></div>
            <h2 className="fw-bold">Lorem ipsum.</h2>

        </div>
        <div className="container mt-md-5 mt-3 mb-7">
            <div className="row">
                <div className="col-md-4">
                    <div className="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
                        <div className="card border-0">
                            <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                    <h4 className="mb-0">
                                        Lorem ipsum
                                    </h4>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                            </div>
                            <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                <div className="card-body py-0">
                                    <ul className="list-unstyled">
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0">
                            <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingTwo" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                    <h4 className="mb-0">
                                        Lorem ipsum
                                    </h4>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                            </div>
                            <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                <div className="card-body py-0">
                                    <ul className="list-unstyled">
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="card border-0">
                            <div className="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingThree" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                <div className="d-flex justify-content-between align-items-center pe-1">
                                    <h4 className="mb-0">
                                        Lorem ipsum
                                    </h4>
                                    <i className="fas fa-chevron-down"></i>
                                </div>
                            </div>
                            <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                                <div className="card-body py-0">
                                    <ul className="list-unstyled">
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                        <li><a href="#" className="py-2 d-block text-muted">Lorem ipsum</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="row" >
                        {products.map((product) => {
                            return (<>
                                <div className="col-md-6" key={product.id}>
                                    <div className="card border-0 mb-4 position-relative position-relative">
                                        <img src={product.imageUrl}
                                            className="card-img-top rounded-0 object-cover"
                                            height={200}
                                            alt="..." />
                                        <div className="card-body p-0">
                                            <h4 className="mb-0 mt-2"><Link to={`/product/${product.id}`}>{product.title}</Link></h4>
                                            <p className="mb-0 mt-2">{product.description}</p>
                                            <p className="card-text mb-0">NT${product.price}</p>
                                            <p className="text-muted mt-3"></p>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        })}

                    </div>
                    <Pagination pagination={pagination} changePage={getProducts} />
                </div>
            </div>
        </div>

    </>)

}

export default Products;