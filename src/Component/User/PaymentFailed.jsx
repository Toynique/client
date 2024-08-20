import React from 'react' 
import { Link } from 'react-router-dom'

const PaymentFailed = () => {
  return (
    <>
      <section className='min-vh-100 bg-light d-flex align-items-center gap-3'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 col-md-6 col-12">
              <div> 
                <h2 className='textPrimary'>Payment Failed</h2>
                <p>We're sorry, your payment couldn't be processed. Please check your payment details and try again. </p>
                <div className='d-flex gap-3 flex-wrap'>
                  <button className='btn btn-primary'>Retry Payment</button>
                  <button className='btn btn-outline-primary'>Contact customer support</button>
                  <Link to={'/cart'}>Home</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <img src="/assets/img/payment_failed.jpeg" alt="toynique" className='w-100 img-fluid' />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default PaymentFailed