import React, { useEffect, useState } from 'react' 
import Cta from '../Parts/Cta'; 
import Footer from '../Footer/Footer';
import Navbar from '../Header/Navbar';
import { useSelector } from 'react-redux';  
import { ToastContainer } from 'react-toastify'; 
import queryString from 'query-string';
import ProductSmall from '../Parts/ProductSmall'; 
import { useParams } from 'react-router-dom';

const ProductsCharacter = () => {
    const {character} = useParams()
    const changeLocation = window.location.href
    const characterAllData = useSelector(store => store.character.data)
    const productAllData = useSelector(store => store.product.data)
    const [product, setProduct] = useState([])  
    const [allProduct, setAllProduct] = useState([])  
    const [subCharacterValue, setSubCharacterValue] = useState('')
     

    const sortByFunc = (keyValue) => {
        let sortedProducts = [];
        switch (keyValue) {
          case 'bestDeal':
            sortedProducts = allProduct.filter(data => data.salePrice < data.mrp || data.discount > 0);
            break;
          case 'newArrival':
            sortedProducts = [...allProduct];
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
            sortedProducts = [...allProduct];
        }
        setProduct(sortedProducts);
      }
      
 
    const productFilterFunc = async()=>{  
        const queryParams = queryString.parse(window.location.search);
        const {subcharacter } = queryParams;  
        if(subcharacter){   
            const response = await productAllData.filter(value=>
                {
                    let characterVal = character.replace(/-/g, ' ')
                    let subcharacterVal = subcharacter.replace(/-/g, ' ')
                    setSubCharacterValue(subcharacterVal)
                    return value.character === characterVal && value.subcharacter === subcharacterVal
                })
            setProduct(response)
            setAllProduct(response)
        } 
        else{ 
            const response = await productAllData.filter( value=>{ 
                let characterVal = character.replace(/-/g, ' ')
                setSubCharacterValue('')
                return value.character === characterVal 
            })  
            setProduct(response)
            setAllProduct(response)
        }
    }
    useEffect(()=>{
        productFilterFunc() 
    },[changeLocation, productAllData]) 

  return (
    <>
    <Navbar/> 
    <ToastContainer /> 
    {characterAllData && characterAllData.filter((item)=>{
        let characterSlug = character.toLowerCase().replace('-', ' '); 
        return item.character == characterSlug
    }).map((cv, i)=>{ 
        
        return( 
          cv.imageUrl ?
            <section key={i}>
                <img src={cv.imageUrl} alt={cv.character || 'image'} className='img-fluid' />  
            </section> : null
        )
    })}

    <section className='py-5'>
      <div className="container">
      {product.length > 0 &&
        <div className="text-end d-flex gap-2 align-items-center justify-content-end">
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
        <div className="d-flex justify-centent-center align-items-center ">
          <div className=" flex-grow-1 border borderPrimarySecond "></div>
          <h2 className="  text-center px-2 text-uppercase fw-bold cl-welcome">{subCharacterValue?subCharacterValue:'All'}</h2>
          <div className=" flex-grow-1 border borderPrimarySecond"></div>
        </div> }
        {product.length > 0? 
        <div className="row">
        {productAllData && product.map((cv, index)=>{ 
            return (  
            <div key={index} className='col-lg-3 col-sm-4 col-6 p-2'> 
                <ProductSmall productData={cv}  />
            </div> 
            )
          })} 
        </div>:
        <div className="h-200px no-product-wrap d-flex align-items-center justify-content-center">
        <span className="fs-32 text-uppercase border rounded shadow-sm p-3">no products found</span>
    </div>
    }
      </div>

    </section> 
    <Cta/> 
    <Footer/>  
    </>
  )
}

export default ProductsCharacter