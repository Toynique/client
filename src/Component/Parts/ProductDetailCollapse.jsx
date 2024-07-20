import React, { useState } from 'react'
import parse from 'html-react-parser';
import '../../Css/ProductDetailCollapse.css'

const ProductDetailCollapse = (props) => {
    const { product } = props
    const [feature, setFeature] = useState(false)
    const [description, setDescription] = useState(false)
    const [specifications, setSpecifications] = useState(false)
    const [other, setOther] = useState(false)
    return (
        <>
            {product &&
                <div className="collapse-wrap accordion" id="accordionExample">

                    {product.description !== '<p><br></p>' && product.description !== null && product.description &&
                        <div className='collapse-item-box'>
                            <div className='collapse-item d-flex align-items-center justify-content-between ' data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne" >
                                <h3 className='mb-0'>Description</h3>
                                <span>{!description ? <><h3 className='fw-bold mb-0'>+</h3></> : <><h3 className='fw-bold mb-0'>-</h3></>}</span>
                            </div>
                            <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                                {parse(product && product.description)}
                            </div>
                        </div>}
                    {product.keyFeature !== '<p><br></p>' && product.keyFeature !== null && product.keyFeature &&
                        <div className='collapse-item-box'>
                            <div className='collapse-item d-flex align-items-center justify-content-between collapsed' data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo" >
                                <h3 className='mb-0'>Key Features</h3>
                                <span>{!feature ? <><h3 className='fw-bold mb-0'>+</h3></> : <><h3 className='fw-bold mb-0'>-</h3></>}</span>
                            </div>
                            <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                <p>{parse(product && product.keyFeature)}</p>
                            </div>
                        </div>}
                    {product.specification !== '<p><br></p>' && product.specification !== null && product.specification &&
                        <div className='collapse-item-box'>
                            <div className='collapse-item d-flex align-items-center justify-content-between collapsed' data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree" >
                                <h3 className='mb-0'>Specifications</h3>
                                <span>{!specifications ? <><h3 className='fw-bold mb-0'>+</h3></> : <><h3 className='fw-bold mb-0'>-</h3></>}</span>
                            </div>
                            <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                {parse(product && product.specification)}
                            </div>
                        </div>}
                    {product.otherInfo !== '<p><br></p>' && product.otherInfo !== null && product.otherInfo &&
                        <div className='collapse-item-box'>
                            <div className='collapse-item d-flex align-items-center justify-content-between collapsed' data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour"  >
                                <h3 className='mb-0'>Other Information</h3>
                                <span>{!other ? <><h3 className='fw-bold mb-0'>+</h3></> : <><h3 className='fw-bold mb-0'>-</h3></>}</span>
                            </div>
                            <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                {parse(product && product.otherInfo)}

                            </div>
                        </div>}

                </div>}
            {/* <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div> */}
            {/* {product && 
    <div className="collapse-wrap">
        
        {product.description !== '<p><br></p>' && product.description !== null && product.description &&
        <div className='collapse-item-box'>
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setDescription(!description)} >
                <h3 className='mb-0'>Description</h3> 
                <span>{!description? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {description ? 
            <div>
                {parse(product && product.description)}
            </div> : null }
        </div>}
        {product.keyFeature !== '<p><br></p>' && product.keyFeature !== null && product.keyFeature &&
        <div className='collapse-item-box'>
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setFeature(!feature)} >
                <h3 className='mb-0'>Key Features</h3>
                <span>{!feature? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {feature ? 
            <div>
                <p>{parse(product && product.keyFeature)}</p>
            </div> : null }
        </div>} 
        {product.specification !== '<p><br></p>' && product.specification !== null && product.specification &&
        <div className='collapse-item-box'> 
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setSpecifications(!specifications)} >
                <h3 className='mb-0'>Specifications</h3> 
                <span>{!specifications? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {specifications ? 
            <div>
                {parse(product && product.specification)}
            </div> : null }
        </div>}
        {product.otherInfo !== '<p><br></p>' && product.otherInfo !== null && product.otherInfo &&
        <div className='collapse-item-box'> 
            <div className='collapse-item d-flex align-items-center justify-content-between' onClick={e=>setOther(!other)}  >
                <h3 className='mb-0'>Other Information</h3> 
                <span>{!other? <><h3 className='fw-bold mb-0'>+</h3></> :  <><h3 className='fw-bold mb-0'>-</h3></>}</span>
            </div>
            {other ? 
            <div>
                {parse(product && product.otherInfo)}
            </div> : null }
        </div>}

    </div> } */}
        </>
    )
}

export default ProductDetailCollapse