import React, { useEffect, useState } from "react";
import "../../Css/Profile.css";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartdata } from "../../redux/slice/cart";
import { wishlistdata } from "../../redux/slice/wishlist";
import { removeuser } from "../../redux/slice/user";
import axios from "axios";
import { Url } from "../../url/url";
import UserAddressUpdateModel from "../Parts/UserAddressUpdateModel";
import { ToastContainer, toast } from 'react-toastify';
import { addressdata } from "/src/redux/slice/address";
import AddAddressModel from "../Parts/AddAddressModel";
import { CSSTransition } from "react-transition-group";
import { Button, Modal } from "react-bootstrap";
import { Rating } from "@mui/material";
import { ratingdata } from "../../redux/slice/rating";
import Swal from "sweetalert2";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = localStorage.getItem("usertoken");
  const userdata = localStorage.getItem("userdata");
  const addressList = useSelector(store => store.address.data)
  const user = useSelector(store => store.user[0])
  const productAllData = useSelector(store => store.product.data)
  const [showUpdateAddressModel, setShowUpdateAddressModel] = useState(false);
  const [orderList, setOrderList] = useState([]);
  const [userId, setUserId] = useState();
  const [ratingModal, setRatingModal] = useState(false)
  const [showAddressModel, setShowAddressModel] = useState(false);
  const [myRatingProducts, setMyRatingProducts] = useState([]);
  const [ratingFormValue, setRatingFormValue] = useState()
  const [ratingErr, setRatingErr] = useState('')



  const ratingModalFunc = () => {
    setRatingModal(!ratingModal)
    setRatingErr('')
  }

  const ratingProduct = (products) => {
    setRatingErr('')
    setMyRatingProducts(products)
    ratingModalFunc()
    if (products?.length > 0) {
      setRatingFormValue({ ...ratingFormValue, ["productId"]: products[0].productId })
    }
  }

  const handleShowAddressModel = () => {
    setShowAddressModel(true)
  };

  const handleCloseAddressModel = () => setShowAddressModel(false)

  const handleRatingForm = (e) => {
    setRatingErr('')
    const name = e.target.name;
    const value = e.target.value;
    setRatingFormValue({ ...ratingFormValue, [name]: value })
  }
  const handleRatingProductId = (productId) => {
    setRatingErr('')
    setRatingFormValue({ ...ratingFormValue, ["productId"]: productId })
    console.log(productId);
  }

  const submitRating = async (e) => {
    e.preventDefault()
    setRatingErr('')
    if(userdata){
      const user = await JSON.parse(userdata) 
      if(!ratingFormValue.rating){
        setRatingErr("Rating can't be set Empty" )
        return
      }
    try { 
      const response = await axios.post(`${Url}/api/rating/create`, {...ratingFormValue, "userId" : user._id, "userName": user.name})
      console.log("response this response", response);
      if (response) {
        toast.success("successfully", { autoClose: 1500, });
        ratingModalFunc()
        setRatingFormValue()
        dispatch(ratingdata()) 
      }
    } catch (error) {
      console.log();
    }
  }
  }

  useEffect(() => {
    if (!auth) {
      navigate("/login");
    }
  });
  const orderListFunc = async () => {
    const userId = await JSON.parse(userdata)._id;
    setUserId(userId);
    const { data } = await axios.get(`${Url}/api/order/user?userId=${userId}`);
    if (data) {
      setOrderList(data);
    }
  };
  const addressListFunc = async () => {
    const userId = await JSON.parse(userdata)._id;
    if (userId) {
      const { data } = await axios.get(
        `${Url}/api/address/user?userId=${userId}`
      );
      //   setAddressList(data);
    }
  };
  const findAddress = (addId) => {
    if (user) {
      const finddata = addressList.find(data => data._id === user.address);
      return finddata ? <>{finddata.address}, {finddata.city}, {finddata.state}, {finddata.pincode}</> : null
    }
  }
  const addressUpdate = async (e, addressId) => {
    const userId = await JSON.parse(userdata)._id;
    console.log("jkgjfk", e.target.value);
    try {
      const { data } = await axios.post(`${Url}/user/updateAddress`, {
        addressId,
        userId,
      });
      localStorage.setItem("userdata", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  const removeAddressFunc = async(addressId)=>{
    // console.log("addressId", addressId);

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async(result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${Url}/api/address/${addressId}`)
          dispatch(addressdata(userId))
        } catch (error) {
          console.log(error);
        }
        // Swal.fire({
        //   title: "Removed!",
        //   text: "Your file has been deleted.",
        //   icon: "success"
        // });
      }
    });




    
  }

  const handleShowUpdateAddressModel = () => {
    setShowUpdateAddressModel(true)
  };
  const handleCloseUpdateAddressModel = () => setShowUpdateAddressModel(false)

  const cartDispatch = () => {
    const userData = localStorage.getItem('userdata')
    if (userData) {
      const userJson = JSON.parse(userData)
      const userId = userJson._id
      dispatch(addressdata(userId))
    }
  }
  useEffect(() => {
    cartDispatch()
    orderListFunc();
    addressListFunc();
  }, []);


  return (
    <>
      <Navbar />
      <ToastContainer />
      <UserAddressUpdateModel show={showUpdateAddressModel} handleClose={handleCloseUpdateAddressModel} />
      <AddAddressModel show={showAddressModel} handleClose={handleCloseAddressModel} />
      <section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-xl-3 col-lg-4 col-md-5 col-12">
              <div className="profile-left border border-2">
                <div className="p-3">
                  <h3 className="mb-3">Contact info</h3>
                  <div className="table-response">
                    <table className="table ">
                      <tbody>
                        <tr >
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-user cl-blue fa-lg"></i> :- </td>
                          <td className="border-0 text-break text-capitalize  fs-14">{user && user.name}</td>
                        </tr>
                        <tr >
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-envelope cl-blue fa-lg"></i> :- </td>
                          <td className="border-0 text-break fs-14">{user && user.email}</td>
                        </tr>
                        <tr >
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-phone cl-blue fa-lg"></i> :- </td>
                          <td className="border-0 fs-14">{user && user.phone}</td>
                        </tr>
                        <tr>
                          <td className="d-flex align-items-center gap-2 border-0"><i className="fa-solid fa-location-dot cl-blue fa-lg"></i> :- </td>
                          <td className="border-0 fs-14">
                            {findAddress()}
                            <div className="text-end">
                              <small className="cl-blue me-3 pointer" onClick={handleShowUpdateAddressModel}>change </small>
                              <small className="cl-blue pointer" onClick={handleShowAddressModel}>add new </small>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div>
                    <p className="fw-bold">Previous Address </p>
                    {userId &&
                      addressList.map((addressValue) => {
                        return (
                          <div className="border-bottom border-bottom-not-last py-2 fs-14 border-1" key={addressValue._id}>
                            <p className="mb-1">{addressValue.address}, {addressValue.city}, {addressValue.state}, {addressValue.pincode}</p>
                            <p className="fs-14 mb-1">{addressValue.primaryNumber} , {addressValue.secondaryNumber}</p>
                            <div>
                              {/* <button className="btn py-0 px-1 me-3  btn-sm btn-blue btn-outline-blue fs-12">Edit</button> */}
                              <button className="btn py-0 px-1  btn-sm btn-dange btn-outline-danger  fs-12" onClick={()=>removeAddressFunc(addressValue._id)}>remove</button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-9 col-lg-8 col-md-7 col-12">
              <div className="profile-right">
                <div className="border shadow rounded p-3">
                  <div>
                    <h3>Your Orders</h3>
                    {orderList.map((orderValue) => {
                      return (
                        <div className="p-3 mb-3 border rounded" key={orderValue._id}>

                          <div className="d-flex align-items-center justify-content-between gap-3 border-bottom pb-3">
                            <div>
                              <p className="mb-1">Order Id :- {orderValue._id}</p>
                              <p className="mb-1">Order Date :- {orderValue.createdAt}</p>
                            </div>
                            <div>
                              <div className="text-end mb-2">

                                <button className="btn btn-primary  btn-sm" onClick={() => ratingProduct(orderValue?.product)} >Give us rating</button>
                              </div>
                              {orderValue?.paymentType == 'cod' ?
                                <p className="mb-1">Payment Status :- Cash On Delivery</p>
                                : <p className="mb-1">Payment Status :- <span > {orderValue.paymentStatus} </span></p>}
                            </div>
                          </div>
                          <div className="row py-3 border-bottom">
                            <div className="col-lg-4 -col-md-4 col-sm-6 col-12 mb-md-0 mb-3">
                              <span className="text-muted fw-light fs-14">
                                Contact
                              </span>
                              <p className="mb-1 text-capitalize">
                                {orderValue?.address?.receiver}
                              </p>
                              <p className="mb-1">
                                {orderValue?.address?.country.code} {orderValue?.address?.primaryNumber}
                              </p>
                              {orderValue?.address?.secondaryNumber &&
                                <p className="mb-1">
                                  {orderValue?.address?.country.code} {orderValue?.address?.secondaryNumber}
                                </p>}
                            </div>
                            <div className="col-lg-4 -col-md-4 col-sm-6 col-12 mb-md-0 mb-3 border-start border-end">
                              <span className="text-muted fw-light fs-14">
                                Shipping Address
                              </span>
                              <p className="mb-1 text-capitalize">
                                {orderValue?.address?.country?.label}
                              </p>
                              <p className="mb-1">
                                {orderValue?.address?.address},  {orderValue?.address?.city}, {orderValue?.address?.state}, {orderValue?.address?.pincode}
                              </p>
                              <span className="fs-10">Near By : </span>
                              <p className="mb-1">
                                {orderValue?.address?.nearBy}
                              </p>
                            </div>
                            <div className="col-lg-4 -col-md-4 col-sm-6 col-12 mb-md-0 mb-3">
                              <span className="text-muted fw-light fs-14">
                                Payment
                              </span>
                              <p className={`mb-1 text-capitalize ${orderValue?.paymentStatus == "success" ? 'text-success' : orderValue?.paymentStatus == 'pending' ? "text-warning" : 'text-danger'}`}>
                                {orderValue?.paymentStatus}
                              </p>
                              <p className="mb-1">
                                Shipping Fee :  {orderValue?.diliveryCharge ? <>&#8377; {orderValue?.diliveryCharge} </> : 'Free'}
                              </p>
                              <p className="mb-1">
                                Product Price : &#8377; {orderValue?.totalproductPrice - orderValue?.offerDiscount}
                              </p>
                            </div>
                          </div>
                          <div className="row pt-3 ">
                            {orderValue?.product?.map((productValue) => {
                              const product = productAllData.find(data => data._id === productValue.productId)
                              return (
                                <div className="col-lg-4 col-md-6 col-12 mb-2" key={product._id}>
                                  <div className="d-flex gap-3 ">
                                    <div className="border p-2">
                                      <img src={`${product.thumbnailImage}`} alt={product.altTag} style={{ width: "80px" }} />
                                    </div>
                                    <div>
                                      <p className="mb-1 fs-14">{product.productName}</p>
                                      <p className="fs-14">{productValue?.productQuantity}X = {(productValue?.productQuantity * productValue?.price).toFixed(2)}</p>
                                    </div>

                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CSSTransition
        in={ratingModal}
        timeout={900}
        classNames="popup"
        unmountOnExit
      >
        <Modal show={ratingModal} onHide={ratingModalFunc} animation={true}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Change Address</Modal.Title>
          </Modal.Header> */}
          <Modal.Body>
            {/* <p>Choose product for rating</p> */} 

            <div>

              <form onSubmit={e => submitRating(e)}>
                <div className="mb-3">
                  {myRatingProducts?.length > 0 && myRatingProducts?.map((productValue) => {
                    const product = productAllData.find(data => data._id === productValue.productId)
                    return (
                      <div className="d-flex align-items-center gap-3 py-1 border-bottom border-bottom-not-last border-1" key={product.productName}>
                        <input type="radio" name="productId" checked={ratingFormValue ? ratingFormValue.productId === product._id : false} onChange={() => handleRatingProductId(product._id)} />
                        <div className="d-flex gap-2" onClick={() => handleRatingProductId(product._id)}>
                          <img src={product.thumbnailImage} alt="" width={32} height={32} />
                          <p className="mb-0">{product.productName}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <p className="mb-2 fs-10 text-danger">{ratingErr}</p>

                <Rating
                  name="rating"
                  precision={1}
                  defaultValue={ratingFormValue ? Number(ratingFormValue?.rating) : null}
                  onChange={e => handleRatingForm(e)}
                  size="large"
                  required
                />

                <textarea name="comment" className="form-control mb-2" onChange={e => handleRatingForm(e)} value={ratingFormValue?.comment}></textarea>


                <div className="text-end">
                  <Button variant="primary" type="submit">
                    Rate the Product
                  </Button>
                </div>

              </form>
            </div> 
          </Modal.Body> 
        </Modal>
      </CSSTransition>
      <Footer />
    </>
  );
};

export default Profile;
