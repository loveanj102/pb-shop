import { Link } from "react-router-dom";

function ProductList({ ...product }) {
    return (
        <div className="col-md-6" key={product.id}>
            <div className="card border-0 mb-4 position-relative">
                <img
                    src={product.imageUrl}
                    className="card-img-top rounded-0 object-cover"
                    height={200}
                    alt="..."
                />
                <div className="card-body p-0">
                    <h4 className="mb-0 mt-2">
                        <Link to={`/product/${product.id}`}>{product.title}</Link>
                    </h4>
                    <p className="mb-0 mt-2">{product.description}</p>
                    <p className="card-text mb-0">NT${product.price}</p>
                    <p className="text-muted mt-3"></p>
                </div>
            </div>
        </div>

    );
};
export default ProductList;
