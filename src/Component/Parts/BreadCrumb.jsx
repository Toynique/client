import React from 'react'
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

const BreadCrumb = () => {
  return (
    <section className='py-5 breadcrumb-wrap'>
        <div className="container">
            <div className='mb-3'>
                <h1 className='text-capitalize cl-pink'>Blog Details With tittle</h1>
            </div>
        <MDBBreadcrumb>
            <MDBBreadcrumbItem>
            <Link to="/" > <i className="fa-solid fa-house"></i> Home</Link>
            </MDBBreadcrumbItem> 
            <MDBBreadcrumbItem>
            <Link to="/" > <i className="fa-solid fa-layer-group"></i> Category</Link>
            </MDBBreadcrumbItem> 
            {/* <MDBBreadcrumbItem active>Category</MDBBreadcrumbItem> */}
        </MDBBreadcrumb>
        </div>
    </section>
  )
}

export default BreadCrumb