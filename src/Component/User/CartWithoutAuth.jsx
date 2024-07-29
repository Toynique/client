import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { Url } from "../../url/url";
import { cartdata } from "../../redux/slice/cart";
import { productQuantityCart, removeCartProduct } from "../../Api/api";
import axios from "axios";
import favIcon from '/assets/icon/favicon.png'
import CheckOutPopUp from "../Parts/CheckOutPopUp";
import { Modal, Button } from 'react-bootstrap';
import { CSSTransition } from 'react-transition-group';
import AddAddressModel from "../Parts/AddAddressModel";



export default function CartWithoutAuth() {

  const dispatch = useDispatch()
  const navigate = useNavigate(); 

  const [cartAllData, setCartAllData] = useState([])
  const [mrp, setMrp] = useState(0)
  const [salePrice, setSalePrice] = useState(0)
  const [discount, setDiscount] = useState(0)
  const [offer, setOffer] = useState(0)
  const [diliveryCharge, setDiliveryCharge] = useState(0)
  const [totalCheckout, setTotalCheckout] = useState(0)

  const findCartData = async () => {
    const products = localStorage.getItem('cartProducts')
    if (products) {
      const productsArr = await JSON.parse(products)
      setCartAllData(productsArr)
      priceUpdateFunc()
    }
  }

  const priceUpdateFunc = () => {
    let totalMrp = 0
    let totalsalePrice = 0
    let totaldiscount = 0
    let totaloffer = 0

    if (cartAllData?.length > 0) {
      cartAllData.map((product) => {
        totalMrp = totalMrp + (product.mrp * product.quantity)
        totalsalePrice = totalsalePrice + (product.salePrice * product.quantity)
        totaldiscount = totaldiscount + ((product.mrp - product.salePrice) * product.quantity)
        totaloffer = totaloffer + (((product.salePrice * product.discount) / 100) * product.quantity) 
      })
      setMrp(Number(totalMrp).toFixed(2))
      setSalePrice(Number(totalsalePrice).toFixed(2))
      setDiscount(Math.floor(totaldiscount).toFixed(2))
      setOffer(Math.floor(totaloffer).toFixed(2)) 
      setTotalCheckout(Number(Math.floor(totalsalePrice) - Math.floor(totaloffer) + diliveryCharge).toFixed(2))
    }
  }
 
  const quantitychange = (id, quantity) => { 
    console.log("quantitychange", id, quantity);
    const updatedProducts = cartAllData.map(product => 
      product._id === id ? quantity < 1 ? product : { ...product, quantity } : product
    ); 
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts)); 
    findCartData()
  };

  const removeProduct = (id) => {
    const updatedProducts = cartAllData.filter(product => product._id !== id); 
    localStorage.setItem('cartProducts', JSON.stringify(updatedProducts));
    findCartData()
  };

  useEffect(() => {
    findCartData()

  }, [])
  useEffect(() => {
    priceUpdateFunc()
  }, [cartAllData])




  return (
    <>
      <ToastContainer />
      <Navbar />
      {cartAllData.length > 0 ?
        <section className="h-100 h-custom" style={{ backgroundColor: "#eee" }}>
          <MDBContainer className="py-5 h-100">
            <MDBRow className="justify-content-center align-items-center h-100">
              <MDBCol>
                <MDBCard>
                  <MDBCardBody className="p-4">
                    <MDBRow>
                      <MDBCol lg="7">
                        <MDBTypography tag="h5">
                          <Link to="/" className="text-body">
                            <MDBIcon fas icon="long-arrow-alt-left me-2" />{" "}
                            Continue Shopping
                          </Link>
                        </MDBTypography>

                        <hr />

                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            <p className="mb-1">Shopping cart</p>
                          </div>
                        </div>

                        <MDBCard className="mb-3">
                          <MDBCardBody>
                            {cartAllData && cartAllData.map((productValue, i) => { 
                              return (
                                <div key={productValue._id}>
                                  <div className="d-lg-flex d-block justify-content-between border-bottom mb-2 pb-2" >
                                    <div className="d-flex flex-row align-items-center">
                                      <div className="mb-md-0 mb-2 ">
                                        <Link to={`/productview/${productValue.slug}/${productValue._id}`}>
                                          <img src={`${productValue.thumbnailImage}`} alt={productValue.altTag} className="myCartImg" />
                                        </Link>
                                      </div>
                                      <div className="ms-3 me-3">
                                        <MDBTypography tag="h6" className="cl-blue">
                                          <Link to={`/productview/${productValue.slug}/${productValue._id}`} className="fs-sm-14 text-capitalize">
                                            {productValue.productName}
                                          </Link>
                                        </MDBTypography>
                                      </div>
                                    </div>
                                    <div className="d-flex flex-row align-items-center justify-content-center">
                                      <div className="d-flex align-items-center me-3">
                                        <button className="btn  btn-sm btn-primary btn-outline-primary me-2" onClick={() => quantitychange(productValue._id, (+(productValue.quantity) - 1))}>
                                          <i className="fa-solid fa-minus "></i>
                                        </button>
                                        <h5 className="px-2">{productValue.quantity}</h5>
                                        <button className="btn  btn-sm btn-primary btn-outline-primary ms-2" onClick={() => quantitychange(productValue._id, (+(productValue.quantity) + 1))}>
                                          <i className="fa-solid fa-plus "></i>
                                        </button>
                                      </div>
                                      <div style={{ width: "80px" }}>
                                        <MDBTypography tag="h5" className="mb-0">
                                          <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                                          <span className="text-muted"> {Math.ceil(productValue.salePrice - ((productValue.salePrice * productValue.discount) / 100)) * productValue.quantity} </span>
                                        </MDBTypography>
                                      </div>
                                      <a href="#!" style={{ color: "#cecece" }} onClick={() => removeProduct(productValue._id) }>
                                        <MDBIcon
                                          fas
                                          icon="trash-alt"
                                          className="textPrimary"
                                        />
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </MDBCardBody>
                        </MDBCard>

                      </MDBCol>

                      <MDBCol lg="5">
                        <MDBCard className="bg-primar bg-lightgra bg-white rounded-3">
                          <MDBCardBody>
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <MDBTypography tag="h5" className="mb-0 textPrimary">
                                Checkout ({cartAllData.length} Items)
                              </MDBTypography>
                            </div>

                            <hr />

                            <div className="d-flex justify-content-between">
                              <p className="mb-1">Product Price</p>
                              <p className="mb-1">

                                {(mrp > salePrice) ? <p className="text-decoration-line-through mb-1"><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {mrp}</p> : null}
                                {(mrp > salePrice) &&
                                <p className="mb-1">
                                  - <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {discount}
                                </p>}
                                <p className="text-end mb-1"><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {salePrice}</p>
                              </p>
                            </div>


                            {/* {discount ?
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Discount</p>
                                <p className="mb-2">
                                  - <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {discount}
                                </p>
                              </div> : null} */}

                            {offer > 0 ?
                              <div className="d-flex justify-content-between">
                                <p className="mb-2">Extra Offer </p>
                                <p className="mb-2">
                                  - <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {offer}
                                </p>
                              </div> : null}
 

                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Shiping Charge</p>
                              <p className="mb-2">
                                 {diliveryCharge? diliveryCharge : "Free"}
                              </p>
                            </div>
                            <hr />

                            <div className="d-flex justify-content-between">
                              <p className="mb-2">Total Amount (Incl. all taxes)</p>
                              <p className="mb-2  "><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {totalCheckout} </p>
                            </div>
                            <hr />
                            {/* <div className="mb-4">
                              <button className="btn btn-blue btn-outline-blue  px-2 me-3 py-1" onClick={e => checkoutModel()}>CheckOut <i className="fa-solid fa-arrow-right-long"></i></button>
                            </div> */}
                            <div className="mb-4">
                              <Link className="btn btn-blu btn-outline-primary  px-2 me-3 py-1" to={"/checkout"}  >Checkout <i className="fa-solid fa-arrow-right-long"></i></Link>
                            </div>



                            {/* <p className="small">Card type</p> */}
                            <span>
                              <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                            </span>
                            <span>
                              <MDBIcon fab icon="cc-visa fa-2x me-2" />
                            </span>
                            <span>
                              <MDBIcon fab icon="cc-amex fa-2x me-2" />
                            </span>
                            <span>
                              <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                            </span>
                          </MDBCardBody>
                        </MDBCard>
                      </MDBCol>
                    </MDBRow>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </section> :
        <section>
          <div className="container">
            <div className="min-h-400 d-flex align-items-center justify-content-center">
              <div className='text-center'>
                <h2 className='text-uppercase pb-2 border-bottom'>YOUR Cart IS EMPTY</h2>
                <div className="row mb-3">
                  <div className="offset-lg-2 offset-md-1 col-lg-8 col-md-10 col-12">
                    <p >Add your favourite items to your Cart to review and add them to your cart anytime!</p>
                  </div>
                </div>
                <Link to="/" className="emptyWishlistbtn text-uppercase bgPrimarySecond text-white rounded-pill px-3 py-2 border-0">
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          </div>
        </section>
      }

      <Footer />
    </>
  );
}

