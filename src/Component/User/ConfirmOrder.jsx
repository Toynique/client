import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Url } from '../../url/url';
import { useSelector } from 'react-redux';

const ConfirmOrder = () => {
    const { orderId } = useParams() 
    const productAllData = useSelector(store => store.product.data)
    const [order, setOrder] = useState()

    const orderFunc = async () => {
        if (orderId) { 
            const data = await axios.get(`${Url}/api/order/${orderId}`) 
            setOrder(data.data);
        }
    }
    useEffect(() => {
        orderFunc()
    }, [])
    return (
        order ?
            <>
                <section className='bg-lightgray min-vh-100'>
                    <div className="container d-flex align-items-center min-vh-100">
                        <div className="order-card rounded bg-white my-5 w-100 p-4">
                            <div className="row align-items-center">
                                <div className="col-lg-6  col-12 px-lg-3 px-0 mb-lg-0 mb-3">
                                    <div className=''>
                                        <h2 className='fs-42 fs-sm-32 fs-xs-24 textPrimary'>Thank you for your Purchase!</h2>
                                        <p className='fs-14'>Your order will be processed within 24 hours during working days. We will
                                            notify you by Email and Phone once your order has been shipped.</p>
                                        <div className='mb-4'>
                                            <h3>Billing Address</h3>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th className='me-5 align-top'>
                                                            <p className='fs-14 fw-bold mb-0 pe-lg-5 pe-3'>Name</p>
                                                        </th>
                                                        <td className='text-capitalize pb-2'>{order.address.receiver}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='me-5 align-top' >
                                                            <p className='fs-14 fw-bold mb-0 pe-lg-5 pe-3'>Phone</p>
                                                        </th>
                                                        <td className='pb-2'> {order.address.country.code}  {order.address.primaryNumber}</td>
                                                    </tr>
                                                    <tr>
                                                        <th className='me-5 align-top'>
                                                            <p className='fs-14 fw-bold mb-0 pe-lg-5 pe-3'>Address</p>
                                                        </th>
                                                        <td className='pb-2'>{order.address.address} </td>
                                                    </tr>

                                                    {/* <tr>
                                                    <th className='me-5'>
                                                        <p className='fs-14 fw-bold mb-0 pe-lg-5 pe-3'>Email</p>
                                                    </th> 
                                                    <td>manishkirthalya@gmail.com</td>
                                                </tr> */}
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="text-center">
                                            <Link className='btn btn-primary px-4 py-1 rounded-pill text-light' to={'/profile'}>Track Your Order</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12 px-lg-3 px-0">
                                    <div> 
                                        <div className="py-2 bg-lightgray rounded-pill w-100 d-md-block d-none"></div>
                                        <div className="  w-100 px-md-3 px-0">
                                            <div className='bg-light p-md-3 p-1 confirm-order-product-wrap'>
                                                <h2 className=' mb-2 fs-32 fs-sm-24 fs-xs-20'>Order Summary</h2>
                                                <p className='border-bottom pb-2 mb-2' ><span>Order Id : </span> {orderId}</p>

                                                {order.product.map((productValue) => {
                                                    const product = productAllData.find(data => data._id === productValue.productId)
                                                    if (!product) {
                                                        return
                                                    }
                                                    return (
                                                        <div className="d-flex align-items-top gap-3 mb-1" key={productValue.productId}>
                                                            <img src={product.thumbnailImage} alt="toynique" className='rounded order-confirm-product-img' />
                                                            <div className='flex-grow-1 d-flex gap-3 align-items-top justify-content-between'>
                                                                <div>
                                                                    <p className='mb-1 fs-16 fs-sm-14 fs-xs-12'>{product.productName}</p>
                                                                    <p className='fs-12'>Qty : {productValue.productQuantity}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="fs-14 fs-sm-12 max-width fw-normal">&#8377; {productValue.price}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                })} 
                                                <hr />
                                                <div className='mb-3 pb-3 border-bottom'>
                                                    <div className="d-flex justify-content-between align-items-top">
                                                        <p className='fs-14 mb-1'>Sub Total</p>
                                                        <p className='fs-14 mb-1'>&#8377; {order.totalproductPrice - Number(order.offerDiscount)}</p>
                                                    </div>
                                                    <div className="d-flex justify-content-between align-items-top">
                                                        <p className='fs-14 mb-1'>Shipping</p>
                                                        <p className='fs-14 mb-1'>Free</p>
                                                    </div> 
                                                </div>
                                                <div className="d-flex justify-content-between">
                                                    <span>Total Amount (Incl. all taxes)</span>
                                                    <span>&#8377; {order.totalproductPrice - Number(order.offerDiscount)}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </> : null
    )
}

export default ConfirmOrder