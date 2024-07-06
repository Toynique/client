import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow, MDBTypography } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";
import { countries } from 'countries-list';
import ReactCountryFlag from "react-country-flag";

const userDefaultValue = {"country": { value: 'IN', label: 'India', code: '+91' }, phone:'' }
export default function CheckoutWithoutAuth() {

    const dispatch = useDispatch()
    const navigate = useNavigate();

    const [cartAllData, setCartAllData] = useState([])
    const [mrp, setMrp] = useState(0)
    const [salePrice, setSalePrice] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [offer, setOffer] = useState(0)
    const [diliveryCharge, setDiliveryCharge] = useState(50)
    const [totalCheckout, setTotalCheckout] = useState(0)

    const [userValue, setUserValue] = useState(userDefaultValue)

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
 
    const inputUserHandle = (e)=>{
        const name = e.target.name;
        const value = e.target.value; 
        setUserValue({...userValue, [name]: value});
      }

    const handleCountryChange = (selectedCountry) => {   
        const countryObj = {value: selectedCountry, label: countries[selectedCountry].name, code: `+${countries[selectedCountry].phone}`} 
        setUserValue({...userValue, ['country']: countryObj});
    };

    const submitUserProfile = (e)=>{
        e.preventDefault()
        console.log("userValue", userValue);
    }

    useEffect(() => {
        findCartData()

    }, [])
    useEffect(() => {
        priceUpdateFunc()
    }, [cartAllData])



    const countryOptions = Object.keys(countries)
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

                                                <MDBCard className="mb-3">
                                                    <MDBCardBody>
                                                        <form  onSubmit={(e)=>submitUserProfile(e)}>
                                                            <div className="row align-items-end">
                                                                <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                    <label htmlFor="name">Full Name</label>
                                                                    <input type="text" name="name" className="form-control" onChange={e => inputUserHandle(e)} required />
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                    <label htmlFor="name">Email</label>
                                                                    <input type="email" name="email" className="form-control" onChange={e => inputUserHandle(e)} required />
                                                                </div>
                                                                {/* <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                    <label htmlFor="name">Phone</label>
                                                                    <input type="number" name="phone" className="form-control" required />
                                                                </div> */}
                                                                <div className="col-lg-6 col-md-6 col-12 mb-2">
                                                                    <div className="form-group">
                                                                        <label  htmlFor="primaryNumber" className="text-muted mb-1 text-capitalize fs-14" >
                                                                            phone number
                                                                        </label>
                                                                        <div className="d-flex align-item-center p-0 overflow-hidden form-control">
                                                                            <select name="" id="" value={userValue.country.value} className="border-0 border-none no-border shadow-none  " onChange={(e) => handleCountryChange(e.target.value)} required>
                                                                                {countryOptions.map((countryCode) => {
                                                                                    return (
                                                                                        <option value={countryCode} key={countryCode}><ReactCountryFlag countryCode={countryCode} /> {countryCode} </option>
                                                                                    )
                                                                                })}
                                                                            </select>
                                                                            <input
                                                                                type="number"
                                                                                name="phone"
                                                                                className="form-control border-0 shadow-sm outline-none border-none" 
                                                                                placeholder="Number"
                                                                                onChange={e => inputUserHandle(e)}
                                                                                value={userValue.phone}
                                                                                minLength={10}
                                                                                maxLength={10}
                                                                                required
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-12 mb-2 ">
                                                                    <button className="btn btn-primary" type="submit">Verify your number</button>
                                                                </div>
                                                            </div>
                                                        </form>
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
                                                                                <button className="btn  btn-sm p-1 fs-8 btn-blue btn-outline-blue me-2" onClick={() => quantitychange(productValue._id, (+(productValue.quantity) - 1))}>
                                                                                    <i className="fa-solid fa-minus "></i>
                                                                                </button>
                                                                                <p className="px-2 mb-0 fw-bold">{productValue.quantity}</p>
                                                                                <button className="btn  btn-sm p-1 fs-8 btn-blue btn-outline-blue ms-2" onClick={() => quantitychange(productValue._id, (+(productValue.quantity) + 1))}>
                                                                                    <i className="fa-solid fa-plus "></i>
                                                                                </button>
                                                                            </div>
                                                                            {/* <div style={{ width: "80px" }}>
                                        <MDBTypography tag="h5" className="mb-0">
                                          <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                                          <span className="text-muted"> {Math.ceil(productValue.salePrice - ((productValue.salePrice * productValue.discount) / 100)) * productValue.quantity} </span>
                                        </MDBTypography>
                                      </div> */}
                                                                            {/* <a href="#!" style={{ color: "#cecece" }} onClick={() => removeProduct(productValue._id) }>
                                        <MDBIcon
                                          fas
                                          icon="trash-alt"
                                          className="text-danger"
                                        />
                                      </a> */}
                                                                            <a href="#!" className="text-danger">Remove</a>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )
                                                        })}
                                                    </MDBCardBody>
                                                    <MDBCardBody>
                                                        {/* <div className="d-flex justify-content-between align-items-center mb-4">
                              <MDBTypography tag="h5" className="mb-0 cl-pink">
                                CheckOut ({cartAllData.length} Items)
                              </MDBTypography>
                            </div> */}

                                                        {/* <hr /> */}

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-1">Product Price</p>
                                                            <p className="mb-1">

                                                                {/* {(mrp > salePrice) ? <p className="text-decoration-line-through mb-1"><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {mrp}</p> : null}
                                {(mrp > salePrice) &&
                                <p className="mb-1">
                                  - <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {discount}
                                </p>} */}
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
                                                                <i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {diliveryCharge}
                                                            </p>
                                                        </div>
                                                        <hr />

                                                        <div className="d-flex justify-content-between">
                                                            <p className="mb-2">Total(Incl. taxes)</p>
                                                            <p className="mb-2  "><i className="fa-solid fa-indian-rupee-sign fa-sm"></i> {totalCheckout} </p>
                                                        </div>
                                                        <hr />
                                                        <div>
                                                            <Link className="btn btn-blu btn-outline-primary  px-2 me-3 py-1"  >Complete <i className="fa-solid fa-arrow-right-long"></i></Link>
                                                        </div>



                                                        {/* <p className="small">Card type</p> */}
                                                        {/* <span>
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
                            </span> */}
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

