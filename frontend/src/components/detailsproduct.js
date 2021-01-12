import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import { Link } from "react-router-dom";
import HomePage from "../pages/homepage";
import Img from "./giay.png";
import CommentEle from "./comment/commentEle";
import { InputNumber } from "antd";
import { saveProductCart } from "../actions/cartActions";
function DetailsScreen(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));

    return () => {};
  }, []);
  const sizeOnchange = (e) => {
    setSize(e.target.value);
  };
  const addProductTocart = async () => {
    await dispatch(
      saveProductCart({
        quantity: qty,
        size,
        product_id: product._id,
        price: product.price,
      })
    );
  };
  
  return (
    <HomePage>
      {loading ? (
        <div className="container">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      ) : error ? (
        <div> {error} </div>
      ) : (
        product && (
          <div className=" details" style={{ marginTop: "100px" }}>
            <div className="details-product container">
              <div className="row">
                <div className="col-md-6">
                  <div className="details-img">
                   {product.images && <img src={product.images[0]} ></img>}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="details-text">
                    <h3
                      className="text-secondary"
                      style={{ textTransform: "uppercase" }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-secondary">
                      {product.numReviews} Reviews
                    </p>
                    <h4>
                      GIÁ:{" "}
                      <span className="text-warning">{product.price} VNĐ</span>
                    </h4>
                    {product.stock == 0 ? (
                      <h1>HẾT HÀNG</h1>
                    ) : (
                      <>
                        <div>
                          Số lượng:
                          <InputNumber
                            min={1}
                            max={product.stock}
                            value={qty}
                            onChange={(value) => setQty(value)}
                          />
                          {console.log(qty)}
                        </div>
                        <div style={{ marginBottom: "5px" }}>
                          <h5>Size :</h5>
                          {product.size &&
                            product.size.map((item, index) => (
                              <button
                                type="button"
                                key={index}
                                style={{
                                  padding: "8px",
                                  width: "80px",
                                  margin: "5px",
                                }}
                                className={
                                  item == 37
                                    ? "btn btn-outline-danger"
                                    : "btn btn-outline-secondary"
                                }
                                value={item}
                                onClick={sizeOnchange}
                              >
                                {item}
                              </button>
                            ))}
                        </div>
                      </>
                    )}

                   {
                     !userInfo ?
                     <Link to={`/register`}>
                     <button
                       type="button"
                       style={{ padding: "15px" }}
                       className="btn btn-danger"
                       
                     >
                       <span>
                         <i class="bx bxs-user"></i>
                       </span>{" "}
                       ĐĂNG KÍ ĐỂ THÊM
                     </button>
                     </Link> :
                     <Link to={`/cart/${product._id}?qty=${qty}&&size=${size}`}>
                     <button
                       type="button"
                       style={{ padding: "15px" }}
                       className="btn btn-danger"
                       onClick={addProductTocart}
                     >
                       <span>
                         <i class="bx bxs-cart"></i>
                       </span>{" "}
                       THÊM VÀO GIỎ HÀNG
                     </button>
                   </Link>
                   }
                    {/* comment */}
                    <button
                      type="button"
                      style={{ padding: "15px" }}
                      className="btn btn-primary"
                    >
                      <i
                        className="bx bxs-heart"
                        style={{ fontSize: "20px" }}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="detail-product-des container">
                <h4> Thông tin chi tiết sản phẩm</h4>
                <p>{product.description}</p>
              </div>
            </div>

            <div className="container" style={{ marginTop: "20px" }}>
              <h3 className="text-primary">
                <i
                  className="bx bx-comment-detail"
                  style={{ marginRight: "5px" }}
                ></i>{" "}
                Bình luận{" "}
              </h3>
            </div>
          </div>
        )
      )}

      <div className="details-product container">
        {
          product && <CommentEle productID={product._id} />}
      </div>
    </HomePage>
  );
}

export default DetailsScreen;
