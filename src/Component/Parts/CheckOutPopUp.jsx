import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import ClipLoader from "react-spinners/ClipLoader";

const CheckOutPopUp = ({ show, handleClose, showAddAddress, cartData, checkoutHandle }) => {
  const [addressDisplay, setAddressDisplay] = useState(false)
  const [address, setAddress] = useState()
  const [paymentType, setPaymentType] = useState("cod")
  const [addressErr, setAddressErr] = useState("")
  const [loading , setLoading ] = useState(false)
  const user = useSelector(store => store.user[0])
  const addressAllData = useSelector(store => store.address.data)
  const productAllData = useSelector(store => store.product.data)
  const updateAddressFunc = async () => {
    const findAdd = await addressAllData.find(data => data._id === user.address)
    setAddress(findAdd)
  }

   
  const scrollToTop = () => {
    const modalBody = document.querySelector(".checkOutModel"); 
    if (modalBody) {
      modalBody.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const changeAddressFunc = (addressValue) => {
    setAddress(addressValue)
    setAddressErr("")
    setAddressDisplay(false)
  }

  const handlePaymentType = (e) => {
    setPaymentType(e.target.value)
  }

  const orderPlaceFunc = async(address, paymentType) => { 
    setAddressErr("")
    setLoading(true)
    if (!address) {
      setAddressErr("Please choose an Address.")
      scrollToTop()
      setLoading(false)
      return
    }

    await checkoutHandle(address, paymentType)
    setLoading(false)

  }

  useEffect(() => {
    updateAddressFunc()
  }, [user, addressAllData])
  return (
    <CSSTransition
      in={show}
      timeout={900}
      classNames="popup"
      unmountOnExit
    >
      <Modal show={show} onHide={handleClose} animation={true} className="checkOutModel"> 
        <Modal.Header closeButton>
          <Modal.Title>CheckOut</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-scroll">
        {/* <Modal.Body className="overflow-auto" style={{ maxHeight: "70vh" }}> */}
          <div>
            <p className='fs-12 text-danger'>{addressErr}</p>
          </div>
          <div className="d-flex gap-3 align-items-top">
            <p className='fw-bold text-capitalize fit-content cl-blue'>address :- </p>
            <p>{address ? <>
              
              <p className='fs-14 mb-0'>{address.address} ,{address.state}, {address.pincode}</p>
              <p className=' mb-0 text-capitalize fs-10'>{address.receiver}</p>
              <small className='fs-12 '>{address.primaryNumber} , {address.secondaryNumber}</small>
            </> : null}</p>
          </div>

          <div className="text-end d-flex align-items-center justify-content-end gap-3">
            {!addressDisplay ?
              <small className='cl-blue pointer' onClick={() => setAddressDisplay(true)}>Previous Address</small> : null}
            <small className='cl-blue pointer' onClick={() => showAddAddress(true)}>Add New Address</small>
          </div> 
          {addressDisplay ?
            <div className=" position-relative">
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary pointer " onClick={() => setAddressDisplay(false)}>X </span>
              <div className='border p-2 rounded shadow-sm overflow-auto my-3 h-120kk' style={{maxHeight : "200px"}}>
                {addressAllData.length > 0 && addressAllData.map((addressValue) => {
                  return (
                    <div className="d-flex align-items-center gap-3 py-1 border-bottom border-bottom-not-last border-1" key={addressValue._id}>
                      <input type="radio" name="addressSelect" className='form-check-input' checked={address ? address._id === addressValue._id : false} onChange={e => changeAddressFunc(addressValue)} />
                      <div onClick={e => changeAddressFunc(addressValue)}>
                        
                        <p className='mb-0'>{addressValue.address} , {addressValue.state}, {addressValue.pincode}</p>
                        <p className='mb-0 text-capitalize fs-10'>{addressValue.receiver}</p>
                        <small className='fs-12 '>{addressValue.primaryNumber} </small>
                      </div>
                    </div>
                  )
                })}
                
              </div>
            </div> : null}
          {cartData ?
            <div className='mt-3 border-top'>
              <div className="table-response " >
                <table className="table table-borderles table-sm">
                  <tbody>
                    {cartData.product.map((productValue) => {
                      const product = productAllData.find(data => data._id === productValue.productId) 
                      return (
                        <tr key={productValue.productId}>
                          <td><img src={`${product.thumbnailImage}`} style={{ width: "50px" }} alt="image" /></td>
                          <td >
                            <p className='text-ellipsis w-180 '>{product.productName}</p>
                          </td>
                          <td>{productValue.price} x </td>
                          <td>{productValue.productQuantity} = </td>
                          <td>{productValue.price * productValue.productQuantity}</td>

                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div> </div> : null}

          <div className='border-bottom mb-2'>
            <div className="d-flex mb-1 px-2 align-items-center justify-content-between">
              <p className='cl-blue'>Total Selling Amount</p>
              <p><span className='text-muted'> &#x20B9; </span>{cartData.totalproductPrice}</p>
            </div>
            {cartData.offerDiscount ?
              <div className="d-flex mb-1 px-2 align-items-center justify-content-between">
                <p className='cl-blue'>Offer Discount (&#x20B9;)</p>
                <p><span className='text-muted'>- &#x20B9; </span>{cartData.offerDiscount}</p>
              </div> : null}
            <div className="d-flex mb-1 px-2 align-items-center justify-content-between">
              <p className='cl-blue'>Delivery Charges</p>
              <p><span className='text-muted'> </span>{cartData.diliveryCharge ? cartData.diliveryCharge : "Free"}</p>
            </div>
          </div>
          <div>
            <div className="d-flex px-2 align-items-center justify-content-between">
              <p className='textPrimary fw-bold'>Total Amount (Incl. all taxes)</p>
              <p><span className='text-muted'> &#x20B9; </span> {cartData.totalCheckOut}</p>
            </div>
          </div>

          <div>
            <div className=" form-check">
              <input type="radio" name="paymentType" id='cod' value="cod" checked={paymentType === 'cod'} className='form-check-input' onChange={handlePaymentType} />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
            <div className=" form-check">
              <input type="radio" name="paymentType" id='prepaid' value="prepaid" checked={paymentType === 'prepaid'} className='form-check-input' onChange={handlePaymentType} />
              <label htmlFor="prepaid">Pay Now</label>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>

          <Button className="btn btn-primary btn-outline-primary  px-2 me-3 py-1 d-flex align-items-center gap-1" onClick={() => orderPlaceFunc(address, paymentType)}>
            Place Order 
            <ClipLoader color="#007bff" size={16} loading={loading} />
          </Button>
        </Modal.Footer> 
      </Modal>
    </CSSTransition>
  );
};

export default CheckOutPopUp;
