

import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Home() {


    const [products, setProducts] = useState([]);



    const getProducts = async () => {
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products`); //4.遠端取得產品列表
        console.log(productRes);
        setProducts(productRes.data.products); //取出產品相關資料，產品資料放置位置，看console.log
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (<>
        <div className="position-relative">
            <div className="position-relative" style={{
                top: 0, left: 0, backgroundImage: `url(https://images.unsplash.com/photo-1575107053907-2bf15b72debc?q=80&w=2859&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundPosition: 'center center', opacity: 1, backgroundSize: 'cover', minHeight: '100vh'
            }}>
                <div className="container">
                    <div className="d-flex flex-column pt-10">
                        <div className="col-md-6  text-Black">
                            <h2>Départ Studio</h2>
                            <p className="">Our mission is to help clients build highly expressive websites and provide the most convenient way to update website content.</p>
                            <NavLink className="btn btn-success rounded-2 mt-2" to='product'>Load more</NavLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>





        <div className="container">

            <div className="row mt-5">

                {products.map((product) => {
                    return (<>
                        <div className="col-md-4 mt-md-4" key={product.id}>
                            <div className="card border-0 mb-4">
                                <img
                                    src={product.imageUrl}
                                    className="card-img-top rounded-0"
                                    alt="..."
                                    height={200}
                                />
                                <div className="card-body text-center">
                                    <h4><Link to={`/product/${product.id}`}>{product.title}</Link></h4>
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text text-muted mb-0">
                                            Loorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                                            diam nonumy eirmod.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </>)
                })}

            </div>
        </div>
        <div className="bg-light mt-7">
            <div className="container">
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <div className="row justify-content-center py-7">
                                <div className="col-md-6 text-center">
                                    <h3>Lorem ipsum.</h3>
                                    <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                                    <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row justify-content-center py-7">
                                <div className="col-md-6 text-center">
                                    <h3>Lorem ipsum.</h3>
                                    <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                                    <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className="row justify-content-center py-7">
                                <div className="col-md-6 text-center">
                                    <h3>Lorem ipsum.</h3>
                                    <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                                    <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                                </div>
                            </div>
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
                </div>
            </div>
        </div>
        <div className="container my-7">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 m-auto text-center">
                    <h4 className="mt-4">Lorem ipsum</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
                </div>
            </div>
            <div className="row flex-row-reverse justify-content-between mt-4">
                <div className="col-md-6">
                    <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 m-auto text-center">
                    <h4 className="mt-4">Lorem ipsum</h4>
                    <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna.</p>
                </div>
            </div>
        </div>
        <div className="bg-light py-4">
            <div className="container">
                <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
                    <p className="mb-0 fw-bold px-2">Départ</p>
                    <div className="input-group w-md-50 mt-md-0 mt-3">
                        <input type="text" className="form-control rounded-0" placeholder="" />
                        <div className="input-group-append">
                            <button className="btn btn-dark rounded-0" type="button" id="search">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </>)


}