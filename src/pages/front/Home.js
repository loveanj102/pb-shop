

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
                            <h2>Départ Café</h2>
                            <p className="">Départ is a lifestyle brand , taken from the French word “leaving” and Korean pronunciation “Dae-bak,” Départ here is not for leaving, but for living. It is a journey undefined; a story without limit. Finding your own É part, always a brand new life.</p>
                            <NavLink className="btn btn-success rounded-2 mt-2" to='product'>Learn More</NavLink>
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
                                    className="card-img-top rounded-2 object-cover"
                                    alt="..."
                                    height={200}
                                />
                                <div className="card-body text-center">
                                    <h4><Link className="card-a" to={`/product/${product.id}`}>{product.title}</Link></h4>
                                    <div className="d-flex justify-content-between">
                                        <p className="card-text text-muted mb-0">
                                            {product.description}
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
                <div className="row justify-content-center py-7">
                    <div className="col-md-6 text-center">
                        <h3>Départ</h3>
                        <p className="my-5">出走，不為遠離，只為活出自己最喜歡的樣子<br />
                            來一場未知的旅程，不設限，隨心而去，有了愜意才定義。</p>
                        <p><small>—Départ，先以一杯迷人香氣，預祝您旅途愉快—</small></p>
                    </div>
                </div>
            </div>
        </div>

        <div className="container my-7">
            <div className="row">
                <div className="col-md-6">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/depart-studio/1712043839665.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=DTmH5bD%2Fn8uk3lbJmmznDqvJFTCIaOdelvWh7pm4kvqj64xs%2F%2BBkFQ22B5Ql90EOuW8X6nj8ZOAh%2B7ZgfXvENooP%2FIaFjFhFiYQG6vOxe3kIqpPXAn7g7m9AqqZIdGHnZ9e3xGj2vaMat5hbwhx7fH9Yn1hBGxX0%2Bmj8YITAyl2rX4N8I%2Fod9ytxyhzyNEb7nAv5WKrsxnfU28JckpHDKUfRTSCJftfdmPloia5ed1fxO3Ae1A%2FbpeaGk9E36yN9Dw3yiIompwGX0kdlgLr5ucDQzXhrhG2gcyWuYMF1nZlXGCDpDYVDonbDwMTQIHeg3XhrFw6zgurrQG0cekrVGQ%3D%3D" alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 m-auto text-center">
                    <h4 className="mt-4">Départ Drip</h4>
                    <p className="text-muted">Drip coffee is made by pouring hot water onto ground coffee beans, allowing it to brew. There are several methods for doing this, including using a filter. </p>
                </div>
            </div>
            <div className="row flex-row-reverse justify-content-between mt-4">
                <div className="col-md-6">
                    <img src="https://storage.googleapis.com/vue-course-api.appspot.com/depart-studio/1712043956759.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=ZKsuUVLd0xHo%2Fv88x4iCeBKhiXjDoz%2BOiOviFuTycuF%2BZyvA%2FnpN5sxEH13HLSfBzqmygLKVGxX2fKyi%2FtDt5f42oQl3srirg3W569rxaPRSEaRW9T%2BSdGqUyX%2F1wzun8s1KcapRdlQUtAo54B0BQeqaXqFlx%2BTcYc2OdVXhoSAtcgJn3QqFgRAcndPQGi7DmsTUbU4JBoMeeXvcjULh7r19c5eggz73A2iZiR%2BRy9UIDwfWMpjPKHdHzP8xiYEU03R3b0NZDUxMIxz3AIYX3fJFRTe%2F1D3oqVqlOtukDUQsGGfmy9sMe6DcSM5pVQtImQpylj0Pfv5vkoIBblo1XA%3D%3D" alt="" className="img-fluid" />
                </div>
                <div className="col-md-4 m-auto text-center">
                    <h4 className="mt-4">Départ Package</h4>
                    <p className="text-muted">A coffee bag is a container for shipping and storing coffee. Coffee beans are usually transported in large jute sacks, while coffee sold to consumers may be packaged as beans or ground coffee in a small, sealed plastic bag.</p>
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