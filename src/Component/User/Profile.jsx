import React, { useEffect, useState } from "react";
import "../../Css/Profile.css";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartdata } from "../../redux/slice/cart";
import { wishlistdata } from "../../redux/slice/wishlist";
import { adduser, removeuser } from "../../redux/slice/user";
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [createPasswordModel, setCreatePasswordModel] = useState(false)
  const [resetPasswordModel, setResetPasswordModel] = useState(false)
  const [passwordFormValue, setPasswordFormValue] = useState()
  const [passwordErr, setPasswordErr] = useState("")
  const [loading, setLoading] = useState(false)


  const [reasonCancel, setReasonCancel] = useState("")
  const [cancelOrderModal, setCancelOrderModal] = useState(false)
  const [cancelOrderId, setCancelOrderId] = useState('')
  const [noCancellError, setNoCancellError] = useState('')

  const downloadInvoice = async (orderId) => {
    setLoading(true)
    try {
      const response = await fetch(`${Url}/api/invoice/${orderId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false)

      if (!response.ok) {
        throw new Error('Failed to download invoice');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'invoice.pdf');
      document.body.appendChild(link);
      link.click();

      // Cleanup: remove the link and revoke the Blob URL
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setLoading(false)
      console.error('Error during invoice download:', error);
    }

  };

  const openCancelModule = (orderId) => {
    setNoCancellError('')
    setCancelOrderId(orderId)
    setCancelOrderModal(true)
  }




  const passwordHandle = (e) => {
    setPasswordErr('')
    const name = e.target.name;
    const value = e.target.value;
    setPasswordFormValue({ ...passwordFormValue, [name]: value });
  }


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
    if (userdata) {
      const user = await JSON.parse(userdata)
      if (!ratingFormValue.rating) {
        setRatingErr("Rating can't be set Empty")
        return
      }
      try {
        const response = await axios.post(`${Url}/api/rating/create`, { ...ratingFormValue, "userId": user._id, "userName": user.name })
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
    if (userdata) {
      const userId = await JSON.parse(userdata)._id;
      setUserId(userId);
      const { data } = await axios.get(`${Url}/api/order/user?userId=${userId}`);
      console.log("data", data);

      if (data) {
        setOrderList(data);
      }
    }
  };


  const addressListFunc = async () => {
    const userId = await JSON.parse(userdata)._id;
    if (userId) {
      const { data } = await axios.get(
        `${Url}/api/address/user?userId=${userId}`
      ); 
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

  const removeAddressFunc = async (addressId) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`${Url}/api/address/${addressId}`)
          dispatch(addressdata(userId))
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
  const createPasswordFunc = async (e) => {
    e.preventDefault();
    setPasswordErr("")
    try {
      if (!(passwordFormValue.password === passwordFormValue.confirmPassword)) {
        setPasswordErr('Your Password and Confirm Password are not matched')
        return
      }
      const response = await axios.put(`${Url}/user/createPassword/${user._id}`, passwordFormValue)
      setCreatePasswordModel(false)
      if (response.status === 200) {
        let userdata = response.data
        dispatch(adduser(userdata))
        userdata = JSON.stringify(userdata);
        localStorage.setItem("userdata", userdata);
      }
    } catch (error) {
      console.log(error);

    }
  }
  const resetPasswordFunc = async (e) => {
    e.preventDefault();
    setPasswordErr('')
    try {
      if (!(passwordFormValue.password === passwordFormValue.confirmPassword)) {
        setPasswordErr('Your Password and Confirm Password are not matched')
        return
      }
      const response = await axios.put(`${Url}/user/resetPassword/${user._id}`, passwordFormValue)
      setResetPasswordModel(false)
      if (response.status === 200) {
        toast.success("Password changed successfully", { autoClose: 1500, });
        setResetPasswordModel(false)
      }

    } catch (error) {
      if (error?.response?.status === 401) {
        setPasswordErr("Your Old Password is incorrect")
        toast.warn("Your Old Password is incorrect", { autoClose: 1500, });
        return
      }
      toast.error("Something went wrong", { autoClose: 1500, });
    }
  }

  const formatDate = (isoDate) => {
    const dateObj = new Date(isoDate);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return dateObj.toLocaleDateString(undefined, options);
  };
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

  const cancelOrder = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.put(`${Url}/api/order/cancel`, { orderId: cancelOrderId, status: 'cancelled', reason: reasonCancel })

      console.log("response", response);

      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Order has been cancelled',
        showConfirmButton: false,
        timer: 1500
      })
      orderListFunc();
      setCancelOrderModal(false)

    } catch (error) {
      console.log("cancel response error", error);
      if (error?.response.status === 401) {
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: "You can't cancel now because your order has been dispatched",
          showConfirmButton: false,
          // timer: 1500
        })
        setNoCancellError("You can't cancel this oreder now because it's already dispatched.")
        orderListFunc();
        return
      }
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: "Something Went Wrong",
        showConfirmButton: false,
        timer: 1500
      })
      orderListFunc();
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
                  <div className="text-end mb-3">
                    {user && user.password ?
                      <button className="btn btn-primary btn-sm" onClick={() => setResetPasswordModel(true)}>Change Password</button> :
                      <button className="btn btn-primary btn-sm" onClick={() => setCreatePasswordModel(true)}>Create Your Password</button>
                    }
                  </div>
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
                              <button className="btn py-0 px-1  btn-sm btn-dange btn-outline-danger  fs-12" onClick={() => removeAddressFunc(addressValue._id)}>Remove</button>
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
                      const isShipped = orderValue.orderStatus.some(status => status.status === 'dispatched' || status.status === 'cancelled');
                      return (
                        <div className="p-3 mb-3 border rounded shadow-sm" key={orderValue._id}>

                          <div className="d-flex align-items-center justify-content-between gap-3 border-bottom pb-3">
                            <div>
                              <p className="mb-1">Order Id :- {orderValue._id}</p>
                              <p className="mb-1">Order Date :- {formatDate(orderValue.createdAt)}</p>
                              <p className="mb-1 text-capitalize">Order :- {orderValue.currentOrderStatus}</p>
                              {!isShipped ?
                                <button className="text-capitalize btn btn-sm btn-outline-primary" onClick={() => openCancelModule(orderValue._id)}>order cancel</button> : null}
                            </div>
                            <div>
                              <div className="text-end mb-2">

                                <button className="btn btn-primary me-3 btn-sm" onClick={() => ratingProduct(orderValue?.product)} >Give us Rating</button>
                                <button className="btn btn-primary  btn-sm" onClick={() => downloadInvoice(orderValue._id)} >Download Invoice {loading ? "..." : null}</button>
                              </div>
                              {/* {orderValue?.paymentType == 'cod' ?
                                <p className="mb-1">Payment Status :- Cash on Delivery</p>
                                : <p className="mb-1">Payment Status :- <span > {orderValue.paymentStatus} </span></p>} */}
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
                              <p className="mb-1">
                                {orderValue?.address?.address},  {orderValue?.address?.city}, {orderValue?.address?.state}, {orderValue?.address?.pincode}
                              </p>
                              {orderValue?.address?.nearBy ?
                                <>
                                  <span className="fs-10">Near By : </span>
                                  <p className="mb-1">
                                    {orderValue?.address?.nearBy}
                                  </p>
                                </> : null}
                            </div>
                            <div className="col-lg-4 -col-md-4 col-sm-6 col-12 mb-md-0 mb-3">
                              <p className=" mb-1">
                                Payment : {orderValue?.paymentType === 'cod' ? "Cash On Delivery" :
                                  <span className={`mb-1 text-capitalize ${orderValue?.paymentStatus == "success" ? 'text-success' : orderValue?.paymentStatus == 'pending' ? "text-warning" : 'text-danger'}`}>
                                    {orderValue?.paymentStatus}
                                  </span>
                                }
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
                            {orderValue?.product?.map((productValue, i) => {
                              const product = productAllData.find(data => data._id === productValue.productId)
                              return (
                                <div className="col-lg-4 col-md-6 col-12 mb-2" key={i}>
                                  <div className="d-flex gap-3 ">
                                    <div className="border p-2">
                                      <img src={`${product?.thumbnailImage}`} alt={product?.altTag} style={{ width: "80px" }} />
                                    </div>
                                    <div>
                                      <p className="mb-1 fs-14">{product?.productName}</p>
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


      <CSSTransition
        in={createPasswordModel}
        timeout={900}
        classNames="popup"
        unmountOnExit
      >
        <Modal show={createPasswordModel} onHide={() => setCreatePasswordModel(false)} animation={true}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Change Address</Modal.Title>
          </Modal.Header> */}
          <Modal.Header >
            <Modal.Title>Create Password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <p className="fs-12 text-danger">{passwordErr}</p>

              <form onSubmit={e => createPasswordFunc(e)}>
                <div className="form-group mb-3">
                  <label htmlFor="password">Password</label>
                  <input type={showConfirmPassword ? 'text' : 'password'} name="password" id="password" className="form-control p-2 no-outline" onChange={e => passwordHandle(e)} placeholder="Enter Your Password" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <div className="d-flex form-control p-0 ps-2 overflow-hidden">
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" className="flex-grow-1 border-0 no-outline" onChange={e => passwordHandle(e)} placeholder="Re-Enter Your Password" required />
                    <span className="border-0 px-3 bg-lightgray pointer py-2 text-center" style={{ width: "100px" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)} > {showConfirmPassword ? "Hide" : "Show"}</span>
                  </div>
                </div>
                <div className="text-end">
                  <Button variant="primary" type="submit">
                    Create
                  </Button>
                </div>

              </form>
            </div>
          </Modal.Body>
        </Modal>
      </CSSTransition>
      <CSSTransition
        in={resetPasswordModel}
        timeout={900}
        classNames="popup"
        unmountOnExit
      >
        <Modal show={resetPasswordModel} onHide={() => setResetPasswordModel(false)} animation={true}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Change Address</Modal.Title>
          </Modal.Header> */}
          <Modal.Header >
            <Modal.Title>Reset Your Password</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <p className="fs-12 text-danger">{passwordErr}</p>

              <form onSubmit={e => resetPasswordFunc(e)}>
                <div className="form-group mb-3">
                  <label htmlFor="oldPassword">Old Password</label>
                  <input type={showConfirmPassword ? 'text' : 'password'} name="oldPassword" id="oldPassword" className="form-control p-2 no-outline" onChange={e => passwordHandle(e)} placeholder="Enter Your Old Password" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="password">New Password</label>
                  <input type={showConfirmPassword ? 'text' : 'password'} name="password" id="password" className="form-control p-2 no-outline" onChange={e => passwordHandle(e)} placeholder="Enter Your New Password" required />
                </div>
                <div className="form-group mb-3">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <div className="d-flex form-control p-0 ps-2 overflow-hidden">
                    <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" className="flex-grow-1 border-0 no-outline" onChange={e => passwordHandle(e)} placeholder="Confirm Your New Password" required />
                    <span className="border-0 px-3 bg-lightgray pointer py-2 text-center" style={{ width: "100px" }} onClick={() => setShowConfirmPassword(!showConfirmPassword)} > {showConfirmPassword ? "Hide" : "Show"}</span>
                  </div>
                </div>
                <div className="text-end">
                  <Button variant="primary" type="submit">
                    Update Password
                  </Button>
                </div>

              </form>
            </div>
          </Modal.Body>
        </Modal>
      </CSSTransition>
      <CSSTransition

        in={cancelOrderModal}
        timeout={900}
        classNames="popup"
        unmountOnExit
      >
        <Modal show={cancelOrderModal} onHide={() => setCancelOrderModal(false)} animation={true}>
          {/* <Modal.Header closeButton>
            <Modal.Title>Change Address</Modal.Title>
          </Modal.Header> */}
          <Modal.Header  >
            <Modal.Title >Order Cancel <br /> {cancelOrderId && <span className="fs-12">Order Id : {cancelOrderId}</span>}</Modal.Title>

          </Modal.Header>

          <Modal.Body>
            <div>
              <small className="fs-12 text-danger mb-3">{noCancellError}</small>
              <form onSubmit={e => cancelOrder(e)}>
                <div className="form-group mb-3">

                  <label htmlFor="reason" className="mb-1">Why are you cancel your order <span className="text-danger">*</span></label>
                  <textarea rows="3" type="text" name="reason" className="form-control p-2 no-outline w-100 rounded" onChange={e => setReasonCancel(e.target.value)} placeholder="Please type your reason" required />
                </div>
                <div className="text-end">
                  <Button variant="primary" type="submit">
                    Cancel your Order
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
