


import { MDBCard, MDBCardBody, MDBCol, MDBContainer, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, useActionData, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { countries } from 'countries-list';
import ReactCountryFlag from "react-country-flag";
import axios from "axios"; 
import { Url } from "../../url/url";
import UpdateUser from "../Utils/UpdateUser";
import { ClipLoader } from 'react-spinners';

const userDefaultValue = { "country": { value: 'IN', label: 'India', code: '+91' } }
const allStateArr = [
    "Andaman and Nicobar Islands",
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chandigarh",
    "Chhattisgarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jammu and Kashmir",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Ladakh",
    "Lakshadweep",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Puducherry",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
];
export default function Quickbuy() {
    const { productId } = useParams()

    const productAllData = useSelector(d => d.product.data)
    const addressAllData = useSelector(d => d.address.data)

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [cartAllData, setCartAllData] = useState([])
    const [mrp, setMrp] = useState(0)
    const [salePrice, setSalePrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [offer, setOffer] = useState(0)
    const [diliveryCharge, setDiliveryCharge] = useState(0)
    const [totalCheckout, setTotalCheckout] = useState(0)


    const [guestAddress, setGuestAddress] = useState(userDefaultValue)
    const [user, setUser] = useState()
    const [paymentType, setPaymentType] = useState('')
    const [address, setAddress] = useState()
    const [loading, setLoading] = useState(false)



    const authCheckFunc = async () => {
        const userdata = localStorage.getItem('userdata')
        if (userdata) {
            const userValue = await JSON.parse(userdata)
            setUser(userValue)
            if (addressAllData.length > 0) {
                const filterAddress = addressAllData.find(d => d._id === userValue?.address)  
                if (filterAddress) {
                    setAddress(filterAddress)
                }
            }
        }
    }
    const findCartData = async () => {
        if (productId && productAllData) {
            const product = await productAllData.filter(data => data._id === productId)
            if (product?.length > 0) {
                const quantityProducts = product.map(d => { return { ...d, quantity: d.quantity ? d.quantity : 1 } })
                setCartAllData(quantityProducts)
                priceUpdateFunc()
            }
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
        const updatedProducts = cartAllData.map(product =>
            product._id === id ? quantity < 1 ? product : { ...product, quantity } : product
        );
        setCartAllData(updatedProducts)
    };
    const handleCountryGuest = (selectedCountry) => {
        const countryObj = { value: selectedCountry, label: countries[selectedCountry].name, code: `+${countries[selectedCountry].phone}` }
        setGuestAddress({ ...guestAddress, ['country']: countryObj });
    };
    const handleGuestUser = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setGuestAddress({ ...guestAddress, [name]: value });
    }

    const buyProductSubmitFunc = async (e) => {
        e.preventDefault()
        setLoading(true) 
        const product = cartAllData.map((productValue) => {
            return {
                productId: productValue._id,
                productQuantity: productValue.quantity,
                price: Math.ceil(productValue.salePrice - ((productValue.salePrice * productValue.discount) / 100)),
                productName: productValue.productName
            }
        })
        const chooseAddress = address ? address : guestAddress
        const checkoutProductList = { product, totalproductPrice: mrp - discount, totalDiscount: discount, offerDiscount: offer, diliveryCharge: diliveryCharge, currency: 'INR', paymentType }

        try {
            if (!address) {
                await axios.post(`${Url}/api/address`, { ...chooseAddress, userId: user._id })
            }
            const responseOrder = await axios.post(`${Url}/api/order`, { ...checkoutProductList, userId: user._id, address: { ...chooseAddress, userId: user._id } })
            if (responseOrder?.status == 201) {
                toast.success("Order placed successfully", { autoClose: 1500, })
                UpdateUser()
                navigate(`/order-confirmed/${responseOrder.data.orderID}`)
            }
            if (responseOrder.data.success === true) {
                window.location.href = responseOrder.data.data.instrumentResponse.redirectInfo.url
            }
            else {
                toast.warning("something went wrong", { autoClose: 1500, })
            }
        } catch (error) {
            toast.error("error", { autoClose: 1500, })
            console.log("error", error);
            UpdateUser()
            setLoading(false) 
        }
        finally{
            setLoading(false)
        }
    }

    const handleNewAddress = () => {
        setAddress()
    }
    const changeAddressFunc = (addressValue) => {
        setAddress(addressValue)
        setGuestAddress(userDefaultValue)
        // setGuestAddress(addressValue)
    }

    useEffect(() => {
        findCartData()
    }, [productAllData])
    useEffect(() => {
        priceUpdateFunc()
    }, [cartAllData])

    useEffect(() => {
        authCheckFunc()
    }, [addressAllData])



    const countryOptions = Object.keys(countries)
    return (
        <>
            <ToastContainer />
            <Navbar />
            {cartAllData.length > 0 ?
                <section className="h-100 h-custom min-vh-100" style={{ backgroundColor: "#eee" }}>
                    <MDBContainer className="py-5 h-100 ">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol>
                                <MDBCard>
                                    <MDBCardBody className="p-4">
                                        <MDBRow>
                                            <MDBCol lg="7">

                                                <MDBCard className="mb-3">
                                                    <MDBCardBody>
                                                        {addressAllData.length > 0 ?
                                                            <div className="pb-3 mb-3 border-bottom">
                                                                {addressAllData.map((addressValue) => {
                                                                    return (
                                                                        <div className="d-flex align-items-center gap-3 py-1 border-bottom border-bottom-not-last border-1" key={addressValue._id}>
                                                                            <input type="radio" name="addressSelect" checked={address ? address._id === addressValue._id : false} onChange={e => changeAddressFunc(addressValue)} />
                                                                            <div onClick={e => changeAddressFunc(addressValue)}>

                                                                                <p className="mb-1 fs-14">{addressValue.address}, {addressValue.city},  {addressValue.state}, {addressValue.pincode}</p>
                                                                                <div className="d-flex flex-wrap align-items-center gap-3">
                                                                                    <p className='text-capitalize mb-0 fs-14'>{addressValue.receiver}</p>
                                                                                    <small className='fs-12 mb-0 '>{addressValue.primaryNumber} , {addressValue.secondaryNumber}</small>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div> : null}

                                                        {addressAllData.length > 0 && address ?
                                                            <div className="mb-3">
                                                                <button className="btn-primary btn" onClick={handleNewAddress}>Add New Address</button>
                                                            </div> : null}

                                                        <div> 
                                                            <form action="" onSubmit={e => buyProductSubmitFunc(e)}>
                                                                {!address ?
                                                                    <div className="row">
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                            <label htmlFor="receiver">Receiver Name <span className="text-danger">*</span></label>
                                                                            <input type="text" name="receiver" value={guestAddress.receiver ? guestAddress.receiver : ""} className="form-control" onChange={e => handleGuestUser(e)} required />
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                            <div className="form-group">
                                                                                <label htmlFor="primaryNumber" className=" text-capitalize  " >
                                                                                    Primary number <span className="text-danger">*</span>
                                                                                </label>

                                                                                <div className="d-flex align-item-center p-0 overflow-hidden form-control">
                                                                                    <select name="" id="" value={guestAddress?.country?.value} className="border-0 border-none no-border shadow-none  " onChange={(e) => handleCountryGuest(e.target.value)} required>
                                                                                        {countryOptions.map((countryCode) => {
                                                                                            return (
                                                                                                <option value={countryCode} key={countryCode}><ReactCountryFlag countryCode={countryCode} /> {countryCode} </option>
                                                                                            )
                                                                                        })}
                                                                                    </select>
                                                                                    <input
                                                                                        type="phone"
                                                                                        name="primaryNumber"
                                                                                        className="form-control border-0 shadow-sm outline-none border-none"
                                                                                        placeholder=""
                                                                                        onChange={e => handleGuestUser(e)}
                                                                                        value={guestAddress.primaryNumber ? guestAddress.primaryNumber : ""}
                                                                                        minLength={10}
                                                                                        maxLength={10}
                                                                                        required
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                            <label htmlFor="secondaryNumber">Secondary Number <span className="fs-12 text-muted">(Optional)</span></label>
                                                                            <input type="phone" name="secondaryNumber" className="form-control" onChange={e => handleGuestUser(e)} value={guestAddress.secondaryNumber ? guestAddress.secondaryNumber : ""} />
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                            <label htmlFor="nearBy">Near By <span className="fs-12 text-muted">(Optional)</span></label>
                                                                            <input type="text" name="nearBy" className="form-control" onChange={e => handleGuestUser(e)} value={guestAddress.nearBy ? guestAddress.nearBy : ""} />
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                            <label htmlFor="address">Full Address <span className="text-danger">*</span></label>
                                                                            <input type="text" name="address" className="form-control" onChange={e => handleGuestUser(e)} required value={guestAddress.address ? guestAddress.address : ""} />
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                            <label htmlFor="pincode">Pincode <span className="text-danger">*</span></label>
                                                                            <input type="phone" name="pincode" className="form-control" onChange={e => handleGuestUser(e)} required value={guestAddress.pincode ? guestAddress.pincode : ""} />
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                            <label htmlFor="state">State <span className="text-danger">*</span></label>
                                                                            <select name="state" className="form-select shadow-sm outline-none border-none" onChange={e => handleGuestUser(e)} value={guestAddress.state ? guestAddress.state : ""} required >
                                                                                <option className="text-muted" disabled={guestAddress?.state}>choose</option>
                                                                                {allStateArr.map((stateName) => {
                                                                                    return (
                                                                                        <option value={stateName} key={stateName}>{stateName}</option>
                                                                                    )
                                                                                })}
                                                                            </select>
                                                                        </div>
                                                                        <div className="col-lg-6 col-md-6 col-12 mb-4">
                                                                            <label htmlFor="city">City <span className="text-danger">*</span></label>
                                                                            <input type="text" name="city" className="form-control" onChange={e => handleGuestUser(e)} value={guestAddress.city ? guestAddress.city : ""} required />
                                                                        </div>
                                                                    </div> : null}

                                                                <div>
                                                                    <div className="d-flex align-items-center mb-2 form-check">
                                                                        <input className="form-check-input" type="radio" name="paymentType" id="paymentType1" value={"cod"} onChange={e => setPaymentType(e.target.value)} selected={paymentType == 'cod'} required />
                                                                        <label className="form-check-label" htmlFor="paymentType1">Cash On Delivery</label>
                                                                    </div>
                                                                    <div className="d-flex align-items-center mb-2 pb-2 form-check">
                                                                        <input className="form-check-input" type="radio" name="paymentType" id="paymentType2" value={"prepaid"} onChange={e => setPaymentType(e.target.value)} selected={paymentType == 'prepaid'} required />
                                                                        <label className="form-check-label" htmlFor="paymentType2">Pay Now</label>
                                                                    </div>
                                                                    <hr />
                                                                    <div>
                                                                        <button className="btn btn-primary btn-outline-primary  px-2 me-3 py-1 d-flex align-items-center gap-2"  >
                                                                            Complete Order 
                                                                            {/* <i className="fa-solid fa-arrow-right-long"></i>  */}
                                                                            {loading &&
                                                                         <ClipLoader  size={16} /> }

                                                                        </button>

                                                                        {/* color="#59B25A" */}
                                                                    </div>
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </MDBCardBody>
                                                </MDBCard>

                                            </MDBCol>

                                            <MDBCol lg="5">
                                                <MDBCard className="bg-primar bg-lightgra bg-white rounded-3">
                                                    <MDBCardBody>
                                                        <p>Products</p>
                                                        {cartAllData && cartAllData.map((productValue, i) => {
                                                            return (
                                                                <div key={productValue._id}>
                                                                    <div className="d-lg-flex d-block justify-content-between border-bottom mb-2 pb-2" >
                                                                        <div className="d-flex flex-row align-items-center">
                                                                            <div className="mb-md-0 mb-2 ">
                                                                                <Link to={`/productview/${productValue.slug}/${productValue._id}`}>
                                                                                    <img src={`${productValue.thumbnailImage}`} alt={productValue.altTag} className="myCartImg" style={{ width: "50px" }} />
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
                                                                                <button className="btn  btn-sm p-1 fs-8 btn-primary btn-outline-primary me-2" onClick={() => quantitychange(productValue._id, (+(productValue.quantity) - 1))}>
                                                                                    <i className="fa-solid fa-minus "></i>
                                                                                </button>
                                                                                <p className="px-2 mb-0 fw-bold">{productValue.quantity}</p>
                                                                                <button className="btn  btn-sm p-1 fs-8 btn-primary btn-outline-primary ms-2" onClick={() => quantitychange(productValue._id, (+(productValue.quantity) + 1))}>
                                                                                    <i className="fa-solid fa-plus "></i>
                                                                                </button>
                                                                            </div>
                                                                            {/* <span className="textPrimary pointer" onClick={() => removeProduct(productValue._id)}>Remove</span> */}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </MDBCardBody>
                                                    <MDBCardBody>

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-1">Product Price</p>
                                                            <p className="mb-1">
                                                                <p className="text-end mb-1"><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {salePrice}</p>
                                                            </p>
                                                        </div>



                                                        {offer > 0 ?
                                                            <div className="d-flex justify-content-between">
                                                                <p className="mb-2"> Offer </p>
                                                                <p className="mb-2">
                                                                    - <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {offer}
                                                                </p>
                                                            </div> : null}


                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Shipping Charge</p>
                                                            <p className="mb-2">
                                                                {diliveryCharge ? diliveryCharge : "Free"}
                                                            </p>
                                                        </div>
                                                        <hr />

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Total Amount (Incl. all taxes)</p>
                                                            <p className="mb-2  "><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {totalCheckout} </p>
                                                        </div>
                                                        {/* <hr /> */}
                                                        {/* <div>
                                                            <Link className="btn btn-blu btn-outline-primary  px-2 me-3 py-1"  >Complete <i className="fa-solid fa-arrow-right-long"></i></Link>
                                                        </div> */}
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

