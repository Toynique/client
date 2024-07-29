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



export default function Cart() {
 
  const dispatch = useDispatch()
  const cartAllData = useSelector(store => store.cart.data) 
  const productAllData = useSelector(store => store.product.data) 
  const navigate = useNavigate();
  const auth = localStorage.getItem("usertoken");
  const userdata = localStorage.getItem("userdata")
  const [checkoutProductList, setCheckoutProductList] = useState()
  const [showCheckOutPopup, setShowCheckOutPopup] = useState(false);

  const [showAddressModel, setShowAddressModel] = useState(false);
 
  const handleShowAddressModel = () =>{
    setShowCheckOutPopup(false)
    setShowAddressModel(true)
  }; 
  const handleCloseCheckOutPopup = () => setShowCheckOutPopup(false) 
  
  const handleCloseAddressModel = () => setShowAddressModel(false) 


  const removeCart = async(cartId) => {
    if(userdata){   
      const userdataobj = await JSON.parse(userdata) 
      const userId = userdataobj._id    
      await removeCartProduct(cartId)
      dispatch(cartdata(userId))  
    } 
  }

  const quantitychange = async(cartId, quantity)=>{  
    if(userdata && quantity > 0){   
      const userdataobj = await JSON.parse(userdata) 
      const userId = userdataobj._id    
      await productQuantityCart(cartId, quantity) 
      dispatch(cartdata(userId))  
    } 
  }  
  let totalMrp = 0;
  let totalDiscount = 0;
  let totalSalePrice = 0; 
  let totalCheckOut = 0;
  let offerDiscount = 0;
  let gst = 0;
  let diliveryCharge = 0; 

  cartAllData.map(cartItem => {
    const productInCart = productAllData.find(p => p._id === cartItem.productId); 
    if (productInCart) {
      totalMrp += (productInCart.mrp)*(cartItem.quantity);
      totalDiscount += (productInCart.mrp - productInCart.salePrice)*(cartItem.quantity);
      totalSalePrice += (productInCart.salePrice) *(cartItem.quantity)
      offerDiscount +=   Math.ceil(productInCart.salePrice * (productInCart.discount)/100) *(cartItem.quantity)
      totalCheckOut = totalSalePrice + diliveryCharge - offerDiscount 
    } 
    return null;
  }); 
  const checkoutModel = async ()=>{  
    const userId = await JSON.parse(userdata)._id  
    let productArr = []
    await cartAllData.map( cartValue=>{
      const filterValue =  productAllData.find(d=>d._id === cartValue.productId)
      productArr.push({productId:cartValue.productId, productQuantity: cartValue.quantity, price: filterValue.salePrice - Math.ceil(filterValue.salePrice * filterValue.discount/100)})
    }) 
    const productObj = {product:productArr, paymentStatus:"pending", totalproductPrice : totalSalePrice,
    totalDiscount,
    userId,
    totalCheckOut,
    offerDiscount,
    totalGst: Math.floor(totalSalePrice*gst/100) ,
    diliveryCharge : diliveryCharge,
    } 
    setCheckoutProductList(productObj)
    setShowAddressModel(false)
    setShowCheckOutPopup(true) 
  }  
  const checkoutHandle = async(address)=>{  
    if(checkoutProductList){
    try {
      const {data} =  await axios.post(`${Url}/api/order/checkout`, {...checkoutProductList, address})   
      handleCloseCheckOutPopup()
      const options = {
        "key": "rzp_test_ju7OQAllDtTHll", 
        "amount": data.amount,  
        "currency": data.currency,
        "name": "Toynique",
        "description": "Razorpay",
        "image": favIcon,
        "order_id": data.id,  
        "callback_url": `${Url}/api/order/paymentverification?orderId=${data.id}&userId=${checkoutProductList.userId}`,
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        },
        "prefill": {
          "contact": ""
        }
    }; 
    let razor = new window.Razorpay(options);
    razor.open()

    } catch (error) {
      console.log(error);
    }}
    else{
      handleCloseCheckOutPopup()
    }
  }

  useEffect(() => { 
    if (!auth) { 
      navigate("/login");
    } 
  }); 


  return (
    <> 
      <ToastContainer/>
      <Navbar /> 
      {checkoutProductList?
      <CheckOutPopUp show={showCheckOutPopup} handleClose={handleCloseCheckOutPopup} showAddAddress={handleShowAddressModel} cartData={checkoutProductList} checkoutHandle={checkoutHandle}/>:null}
      <AddAddressModel show={showAddressModel} handleClose={handleCloseAddressModel}/>
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
                          {cartAllData && cartAllData.map((cv, i)=>{ 
                            const product = productAllData.find(data => data._id == cv.productId) 
                            return( 
                            <div key={i}>
                            {product && product !== undefined ? 
                          <div className="d-lg-flex d-block justify-content-between border-bottom mb-2 pb-2" >
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <Link to={`/productview/${product.slug}/${product._id}`}> 
                                  <img src={`${product.thumbnailImage}`} alt={product.altTag} style={{ width: "120px" }} />
                                </Link>
                              </div>
                              <div className="ms-3 me-3">
                                <MDBTypography tag="h6" className="cl-blue">
                                  <Link to={`/productview/${product.slug}/${product._id}`}>
                                    {product.productName}
                                  </Link>
                                </MDBTypography>
                                {/* <p className="small mb-0">256GB, Navy Blue</p> */}
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center justify-content-center">
                              <div className="d-flex align-items-center me-3">
                                <button className="btn  btn-sm btn-primary btn-outline-primary me-2" onClick={()=> quantitychange(cv._id, (+(cv.quantity)-1)) }>
                                  <i className="fa-solid fa-minus "></i>
                                </button>
                                <h5 className="px-2">{cv.quantity}</h5>
                                <button className="btn  btn-sm btn-primary btn-outline-primary ms-2" onClick={()=> quantitychange(cv._id, (+(cv.quantity)+1)) }> 
                                  <i className="fa-solid fa-plus "></i>
                                </button>
                              </div>
                              <div style={{ width: "80px" }}>
                                <MDBTypography tag="h5" className="mb-0">
                                  <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                                  <span className="text-muted"> {Math.floor(product.salePrice - ((product.salePrice * product.discount)/100 )) * cv.quantity} </span>
                                </MDBTypography>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }} onClick={()=>{removeCart(cv._id)}}>
                                <MDBIcon
                                  fas
                                  icon="trash-alt"
                                  className="textPrimary"
                                />
                              </a>
                            </div>
                          </div>
                          : null }
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
                            <p className="mb-2">Product Price</p>
                            <p className="mb-2">
                            
                            {(totalMrp > totalSalePrice) ?  <p className="text-decoration-line-through"><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {totalMrp}</p> : null}
                            <p ><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {totalSalePrice}</p> 
                            </p>
                          </div>
                          
                          
                          {totalDiscount ?
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Discount</p>
                            <p className="mb-2">  
                             - <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {totalDiscount}
                            </p> 
                          </div> : null }

                          {offerDiscount ?
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Extra Offer </p>
                            <p className="mb-2">  
                             - <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {offerDiscount}
                            </p> 
                          </div> : null }
 

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">   
                              {diliveryCharge ? diliveryCharge : "Free"}
                            </p> 
                          </div> 
                          <hr />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Total Amount (Incl. all taxes)</p>
                            <p className="mb-2  "><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {totalCheckOut} </p>
                          </div>
                          <hr />
                          <div className="mb-2"> 
                            <button className="btn btn-blue btn-outline-blue  px-2 me-3 py-1" onClick={e=>checkoutModel()}>Checkout <i className="fa-solid fa-arrow-right-long"></i></button> 
                          </div>

                          

                          <p className="small">Card Type</p>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-mastercard fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-visa fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-amex fa-2x me-2" />
                          </a>
                          <a href="#!" type="submit" className="">
                            <MDBIcon fab icon="cc-paypal fa-2x me-2" />
                          </a>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>:
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

const CheckOutPop = ({ show, handleClose , }) => {
  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames="popup"
      unmountOnExit
    >
      <Modal show={show} onHide={handleClose} animation={true}>
        <Modal.Header closeButton>
          <Modal.Title>CheckOut</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your popup content goes here.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary">
            Place Order
          </Button>
          {/* Add additional buttons or actions here */}
        </Modal.Footer>
      </Modal>
    </CSSTransition>
  );
};
