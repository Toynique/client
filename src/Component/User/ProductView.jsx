import React, { useEffect, useState } from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import queryString from "query-string";
import ViewImage from "../Parts/ViewImage";
import Rating from "@mui/material/Rating";
import ProductDetailCollapse from "../Parts/ProductDetailCollapse";
import SimilarProduct from "../Parts/SimilarProduct";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";
import { addCartApi } from "../../Api/api";
import { useDispatch } from "react-redux";
import { cartdata } from "../../redux/slice/cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addWishlistApi } from "../../Api/api";
import { wishlistdata } from "../../redux/slice/wishlist";
import { BeatLoader } from "react-spinners";
import ProductSmall from "../Parts/ProductSmall";
import axios from "axios";
import { Url } from "../../url/url";
import cartIcon from '/assets/icon/cart_icon.svg'

const ProductView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeLocation = window.location.href;
  const productAllData = useSelector((store) => store.product.data);
  const ratingAllData = useSelector((store) => store.rating.data);
  const { productId } = useParams();
  const [product, setProduct] = useState();
  const [rating, setRating] = useState([]);
  const [ratingData, setRatingData] = useState();
  const [auth, setAuth]= useState(false)
  const stringToSlug = (str) => {
    return str
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();
  };

  useEffect(()=>{
    authCheck()
  },[])

  const authCheck = ()=>{
    const userdata = localStorage.getItem('userdata') 
      const usertoken = localStorage.getItem('usertoken')
      if(userdata && usertoken){
        setAuth(true)
      }
      else{
        setAuth(false)
      }
  }

  const addtocart = async (productDetails) => {
    if(productDetails.totalProduct > 0){
    const userdata = localStorage.getItem("userdata");
    if (userdata) {
      const userdataobj = JSON.parse(userdata);
      const userId = userdataobj._id;
      await addCartApi(userId, productId).then(() => {
        dispatch(cartdata(userId));
      });
    }}
    else{
      toast.warning("Product Out Of Stock",  {autoClose: 1500,})
    }
  };

  const addWishlistFunc = async (productId) => {
    const userdata = localStorage.getItem("userdata");
    if (userdata) {
      const userdataobj = JSON.parse(userdata);
      const userId = userdataobj._id;
      await addWishlistApi(userId, productId).then(() => {
        dispatch(wishlistdata(userId));
      });
    }
  };

  const addMyCart = async(product)=>{ 
    if(product){
      const products= localStorage.getItem('cartProducts')
      if(products ){
        const allProducts = await JSON.parse(products) 
        const isAlready = await allProducts.find(d=>d._id === product._id) 
        if(!isAlready){ 
          allProducts.push({...product, quantity : 1})
          localStorage.setItem('cartProducts',JSON.stringify(allProducts) ) 
          toast.success("Product add to cart",  {autoClose: 1500,})
        }
        else{
          console.log("already axist");
          toast.warning("Product already in cart",  {autoClose: 1500,})
        }
      }
      else{
        let productArr = [{...product, quantity: 1}]
        productArr = await JSON.stringify(productArr) 
        localStorage.setItem('cartProducts',productArr ) 
        toast.success("Product add to cart",  {autoClose: 1500,})
      } 
    }
  }

  const productShowFunc = async () => {
    setRatingData();
    if (productAllData.length > 0) {
      const data = await productAllData.find((data) => data._id === productId);
      setProduct(data);
      const ratingFind = await ratingAllData.find(
        (val) => val.productId === data._id
      );
      setRatingData(ratingFind);
      const responseRating = await axios.get(
        `${Url}/api/rating/productrating?productId=${data._id}`
      );
      if (responseRating) {
        const { data } = responseRating;
        setRating(data);
      }
    }
  };
  useEffect(() => {
    productShowFunc();
  }, [productAllData, changeLocation]);

  return (
    <>
      <ToastContainer />
      <Navbar />
      {product ? (
        <>
          <section className="border-top py-5">
            <div className="container">
              <div className="row">
                <div className="col-xl-7 col-lg-7 col-md-6 col-12">
                  <div>
                    <MDBBreadcrumb>
                      <MDBBreadcrumbItem>
                        <Link to="/">
                          {" "}
                          <i className="fa-solid fa-house"></i> Home
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>  
                      {/* products/category/category-one ?subcategory=subcategory-one */}
                        <Link to={product?.category ? `/products/category/${product?.category }` : ''}> 
                          {product && product.category}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <Link
                          to={product?.category && product?.subcategory ? `/products/category/${product?.category}?subcategory=${product?.subcategory }` : ''} > 
                          {product && product?.subcategory}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <Link to={product?.character ?`/products/character/${product?.character }` : ""}> 
                          {product && product.character}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem>
                        <Link
                          to={product?.character && product?.subcharacter?`/products/character/${product?.character}?subcategory=${product?.subcharacter}` : ""} > 
                          {product && product.subcharacter}
                        </Link>
                      </MDBBreadcrumbItem>
                      <MDBBreadcrumbItem active>
                        {product && product.productName}
                      </MDBBreadcrumbItem>
                    </MDBBreadcrumb>
                  </div>
                  {product ? <ViewImage images={product} /> : null}
                </div>
                <div className="col-xl-5 col-lg-5 col-md-6 col-12">
                  <div className="">
                    <div className="iconbox text-end">
                      <button
                        className="btn border-0"
                        onClick={() => addWishlistFunc(product._id)}
                      >
                        <i className="fa-regular text-muted fa-heart fa-lg me-2"></i>
                      </button>
                      <i className="fa-solid fa-share fa-lg cl-blue"></i>
                    </div>
                    <p className="cl-blue text-uppercase">
                      {product.subcharacter}
                    </p>
                    <h2>{product && product.productName}</h2>
                    {ratingData && (
                      <div className="d-flex align-items-center ">
                        <Rating
                          name="half-rating-read"
                          defaultValue={ratingData.avrageRating}
                          precision={0.5}
                          readOnly
                        />
                        <small className="ms-2">
                          ({ratingData.avrageRating}){" "}
                          {ratingData.totalRatingCount} Reviews{" "}
                        </small>
                      </div>
                    )}
                    <p className="mb-3">
                      {product && product.shortDescription}
                    </p>
                    <div className="d-flex align-items-center gap-2 text-dark mb-2"> <span> Size : </span> <small className="mb-0 textPrimary">{product.productSize.height} * {product.productSize.width} * {product.productSize.depth}</small>  <span className="text-capitalize textPrimarySecond">{product.productSize.measurement} </span> </div>

                    <div className="d-flex align-items-center gap-3">
                      {product.discount > 0 && (
                        <p className="text-decoration-line-through mb-0 fw-normal fs-14 fs-xs-10">
                          Rs. {product.salePrice}
                        </p>
                      )}

                      <p className="mb-0 fs-xs-10 fw-bold">
                        {" "}
                        Rs.{" "}
                        {product.discount > 0
                          ? product.salePrice -
                            Math.ceil(
                              (product.salePrice * product.discount) / 100
                            )
                          : product.salePrice}
                      </p>

                      {product.discount > 0 && (
                        <p className="mb-0 textPrimarySecond fs-14 fs-xs-10">
                          ({product.discount} % off)
                        </p>
                      )}
                    </div>
                    {product.totalProduct > 0 ?
                    <div className="my-3">
                      {false ? (
                        <Link className="btn btn-blue  me-3 fw-bold" to="/cart">
                          Go to cart{" "}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </Link>
                      ) : auth? (
                        <button
                          className="btn btn-blue  me-3 fw-bold"
                          onClick={() => addtocart(product)}
                        >
                          Add to cart{" "}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      ) :(
                        <button
                          className="btn btn-blue  me-3 fw-bold"
                          onClick={() => addMyCart(product)}
                        >
                          Add to cart{" "}
                          <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                      )
                      
                      }
                      {auth?
                      <Link className="btn btn-outline-blue fw-bold" to={'/cart'} onClick={() => addtocart(product)}>
                        Buy Now <i className="fa-solid fa-bag-shopping"></i>
                      </Link>:
                      <Link className="btn btn-outline-blue fw-bold" to={`/checkout?productId=${product._id}`} >
                        Buy Now <i className="fa-solid fa-bag-shopping"></i>
                      </Link>}
                    </div> : <button
                          className="btn btn-blue my-2  me-3 fw-bold"
                          onClick={() => addtocart(product)}
                        >
                          Notify Me 
                        </button> }
                    {/* <p className="cl-pink">
                      Expected delivery on Sun, 28 May - Tue, 30 May
                    </p> */}
                    {product &&
                      product.totalProduct > 0 &&
                      product.totalProduct < 10 && (
                        <p className="textPrimary">
                          Limited Stock! {product.totalProduct} pieces left
                        </p>
                      )}
                    {product &&
                      product.totalProduct <= 0  && (
                        <p className="textDanger">
                          Out Of Stock
                        </p>
                      )}
                  </div>
                  <ProductDetailCollapse product={product} />
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="container">
              <div className="row">
                {rating.length > 0 &&
                  rating
                    .filter((item) => item.comment)
                    .slice(0, 8)
                    .map((ratingValue) => {
                      return (
                        <div
                          className="col-lg-3 col-md-4 col-sm-6 col-12 mb-2"
                          key={ratingValue._Id}
                        >
                          <div className="border shadow p-3">
                            <div className="d-flex align-items-center justify-content-between gap-3 mb-2">
                              <p className="mb-0 fw-bold text-capitalize">
                                {ratingValue.userName}
                              </p>
                              <Rating
                                name="half-rating-read"
                                defaultValue={ratingValue.rating}
                                precision={0.5}
                                readOnly
                              />
                            </div>
                            <p>{ratingValue.comment}</p>
                          </div>
                        </div>
                      );
                    })}
              </div>
            </div>
          </section>
          <section className="py-5">
            <div className="container">
              <div className="d-flex justify-centent-center align-items-center ">
                <div className=" flex-grow-1 border borderPrimarySecond "></div>
                <h2 className="  text-center px-2 text-uppercase fw-bold cl-welcome">
                  most similar products
                </h2>
                <div className=" flex-grow-1 border borderPrimarySecond"></div>
              </div>
              <div className="row">
                {productAllData
                  .filter((data) => data.character === product.character)
                  .slice(0, 8)
                  .map((cv, index) => {
                    return (
                      <div key={index} className="col-lg-3 col-sm-4 col-6 p-2">
                        <ProductSmall productData={cv} />
                      </div>
                    );
                  })}
              </div>
              <div className="text-center mt-4">
                <Link
                  to={`/products/character/${
                    product && stringToSlug(product.character)
                  }`}
                  className="homebtn"
                >
                  Show More
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center">
          <BeatLoader />
        </div>
      )}

      <Footer />
    </>
  );
};

export default ProductView;
