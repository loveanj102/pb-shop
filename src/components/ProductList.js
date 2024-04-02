import { Link } from "react-router-dom";


function ProductList({ ...product }) {


    return (
        <div className="col-md-6" key={product.id}>
            <div className="card border-1 card-border-color mb-4 position-relative">
                <img
                    src={product.imageUrl}
                    className="card-img-top rounded-top-2 object-cover"
                    height={200}
                    alt="..."
                />
                <div className="card-body d-flex flex-column">
                    <h4 className="mb-0 mt-2">
                        <Link className="card-a card-color" to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                    <p className="mb-0 mt-2 card-p">{product.description}</p>
                    <p className="card-text mb-0">NT${product.price}</p>
                    <p className="text-muted mt-3"></p>
                    <div className="d-flex justify-content-end">
                        <button
                            className="btn btn-outline-green"
                            href="./checkout.html"
                            >Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductList;
