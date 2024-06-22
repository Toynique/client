import React, { useEffect, useState } from 'react' 
import Cta from '../Parts/Cta'; 
import Footer from '../Footer/Footer';
import Navbar from '../Header/Navbar';
import { useSelector } from 'react-redux';  
import { ToastContainer } from 'react-toastify'; 
import queryString from 'query-string';
import ProductSmall from '../Parts/ProductSmall'; 

const ProductsPage = () => {
    const characterAllData = useSelector(store => store.character.data)
    const productAllData = useSelector(store => store.product.data)
    const [product, setProduct] = useState([]) 
    const [allProduct, setAllProduct] = useState([])
    const [newPro, setNewPro] = useState(false)
   
    const categoryImg = {
        "sunshine buddies" : "/assets/img/sunshine-CATAGORY.webp",
        "study buddies" : "/assets/img/STUDY-CATAGORY.webp",
        "play buddies" : "/assets/img/PLAY-CATAGORY.webp",
        "dream buddies" : "/assets/img/dream-CATAGORY.webp",
    }  

    const sortByFunc = (keyValue) => {
      let sortedProducts = [];
      switch (keyValue) {
        case 'bestDeal':
          sortedProducts = allProduct.filter(data => data.salePrice < data.mrp || data.discount > 0);
          break;
        case 'newArrival':
          sortedProducts = [...productAllData];
          break;
        case 'inStock':
          sortedProducts = allProduct.filter(data => data.totalProduct > 0);
          break;
        case 'lowToHigh':
          sortedProducts = [...allProduct].sort((a, b) => {
            const discountedPriceA = a.salePrice - Math.floor(a.salePrice * a.discount / 100);
            const discountedPriceB = b.salePrice - Math.floor(b.salePrice * b.discount / 100);
            return discountedPriceA - discountedPriceB;
          });
          break;
        case 'highToLow':
          sortedProducts = [...allProduct].sort((a, b) => {
            const discountedPriceA = a.salePrice - Math.floor(a.salePrice * a.discount / 100);
            const discountedPriceB = b.salePrice - Math.floor(b.salePrice * b.discount / 100);
            return discountedPriceB - discountedPriceA;
          });
          break;
        default:
          sortedProducts = [...productAllData];
      }
      setProduct(sortedProducts);
    }

    const productFilterFunc = async()=>{ 
        setNewPro(false)
        const queryParams = queryString.parse(window.location.search);
        const {key } = queryParams; 
        if(key === 'newarrivals'){ 
            setNewPro(true)
            setProduct(productAllData.slice(0, 20))
            setAllProduct(productAllData)
        }
        else if(key === 'bestdeals'){
            const response = await productAllData.filter(value=>(Number(value.salePrice) < Number(value.mrp)) || Number(value.discount) > 0)  
            setProduct(response)
            setAllProduct(response)
        }
        else{
            setProduct(productAllData)
            setAllProduct(productAllData)
        }
    }
    useEffect(()=>{
        productFilterFunc() 
    },[productAllData])

  return (
    <>
    <Navbar/> 
    <ToastContainer /> 
    {characterAllData && characterAllData.filter((item)=>{
        let characterSlug = ('sunshine-buddies').toLowerCase().replace('-', ' '); 
        return item.character == characterSlug
    }).map((cv, i)=>{
        return( 
            <section>
                <img src={categoryImg[cv.character]} alt={cv.character} className='img-fluid' />  
            </section>
        )
    })}

    <section className='py-5'>
      <div className="container"> 
      {product.length > 0 &&
        <div className="text-end border-bottom mb-3 pb-2 d-flex gap-2 align-items-center justify-content-end">
            <span>Sort by : </span>
            <select name="" id="" onChange={(e)=>sortByFunc(e.target.value)} className=' border px-2 rounded sort-select'>
                <option value="">All</option>
                <option value="bestDeal">Best Deal</option>
                <option value="newArrival">New Arrivals</option>
                <option value="inStock">In Stock</option>
                <option value="lowToHigh">Low To High</option>
                <option value="highToLow">High To Low</option> 
            </select>
        </div>} 
        {product.length > 0 &&
        <div className="row">
        {productAllData && product.map((cv, index)=>{ 
            return (  
            <div key={index} className='col-lg-3 col-sm-4 col-6 p-2'> 
                <ProductSmall productData={cv} newActive={newPro}/>
            </div> 
            )
          })} 
        </div>}
      </div>

    </section> 
    <Cta/> 
    <Footer/>  
    </>
  )
}

export default ProductsPage