import React from "react";
import Navbar from "../Header/Navbar";
import Footer from "../Footer/Footer";

const ShipingPolicy = () => {
  return (
    <>
      <Navbar />
      <section className="py-5">
        <div className="container">
          <h3 className="mt-3">1. Shipping Methods and Times</h3>
          <p>
            At Doozie-Do.com, we strive to ensure that your orders are delivered
            to you in a timely and efficient manner. We currently offer the
            following shipping methods:
          </p>
          <div>
          <ul className="ps-3" type={"circle"}>
            <li> Standard Shipping: Delivery within 5-7 business days.</li>
            <li>Expedited Shipping: Delivery within 2-3 business days.</li>
          </ul>
          </div>
          <p>
            Please note that these shipping times are estimates, and actual
            delivery times may vary based on factors such as product
            availability, destination, and carrier delays.
          </p>
          <h3 className="mt-3">2. Order Processing</h3>
          <p>
            Orders are processed and shipped within 1-2 business days after the
            order is placed, excluding weekends and holidays. If there are any
            issues with your order that may cause a delay, our customer service
            team will contact you promptly.
          </p>
          <h3 className="mt-3">3. Shipping Rates</h3>
          <p>
            Shipping rates are calculated based on the weight of your order and
            the shipping method selected during checkout. The exact shipping
            cost will be displayed at the time of purchase.
          </p>
          <h3 className="mt-3">4. International Shipping</h3>
          <p>
            At this time, we only offer shipping within [list of countries].
            International customers are responsible for any customs duties,
            taxes, or fees that may apply to their orders.
          </p>
          <h3 className="mt-3">5. Order Tracking</h3>
          <p>
            Once your order has been shipped, you will receive a confirmation
            email with a tracking number. You can use this tracking number to
            monitor the progress of your shipment through our website or the
            carrier's tracking system.
          </p>
          <h3 className="mt-3">6. Shipping Address</h3>
          <p>
            Customers are responsible for providing accurate shipping
            information. Please double-check your shipping address during
            checkout to ensure that your order is delivered to the correct
            location. We are not responsible for orders shipped to incorrect or
            incomplete addresses provided by the customer.
          </p>
          <h3 className="mt-3">7. Missing or Damaged Items</h3>
          <p>
            If your order arrives with missing or damaged items, please contact
            our customer service team within 2 days of receiving your order. We
            will work to resolve the issue promptly.
          </p>
          <h3 className="mt-3">8. Returns and Exchanges</h3>
          <p>
            For information on returns and exchanges, please refer to our
            [Return Policy] page.
          </p>
          <h3 className="mt-3">9. Contact Information</h3>
          <p>
            If you have any questions or concerns regarding our shipping policy,
            please contact our customer service team at support@doozie-do.com
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ShipingPolicy;
