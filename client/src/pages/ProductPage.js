import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import "./ProductPage.css";

const ProductPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/product/get-all-products");
      if (res.data.success) {
        setProducts(res.data.data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="product-page-container">
        <h2 className="m-0">Our Shop</h2>
      </div>
      <div className="product-container">
        <div className="container">
          <div className="row">
            {products &&
              products
                ?.map((item, index) => {
                  return (
                    <div className="col-12 col-sm-12 col-md-3 col-lg-3">
                      <div key={index} className="course product">
                        <div className={`course-img-cont p-img-cont`}>
                          <img src={`${item?.images[0]}`} alt="" />
                        </div>
                        <div className="course-desc">
                          <h5>{item?.name}</h5>
                          <p>{item?.desc}</p>
                          <h4>Rs.{item?.price}</h4>
                          <Link
                            onClick={(e) => e.stopPropagation()}
                            to={`https://wa.me/919664419819?text=Hello! I want ${item?.name}`}
                            target="_blank"
                          >
                            <button className="w-btn c-btn p-2">
                              WhatsApp Us
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
                .slice(0, 6)}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductPage;
