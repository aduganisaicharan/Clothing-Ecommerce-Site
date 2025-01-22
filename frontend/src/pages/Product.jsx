import React, {  useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState();
  const [image, setImage] = useState('');
  const [size,setSize] = useState('');

  const fetchProductData = ()=>{
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item)
        setImage(item.image[0])
        return null;
      }
    })
  }
 
  useEffect(()=>{
    fetchProductData();
  },[productId])


  return productData?(
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* productdata */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row' >
         {/* product images */}
         <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row '>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
            {
              productData.image.map((item,index)=>(
                 <img src={item} onClick={()=>{setImage(item)}} key={index} className='w-[24%] sm:w-full sm:mb-2 flex-shrink-0 cursor-pointer' alt="" /> 
                ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
         </div>

            {/* product information  */}
            <div className='flex-1'>
              <h1 className='font-medium text-2xl mt-2 '>{productData.name}</h1>
              <div className='flex items-center gap-1 mt-2 '>
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_icon} alt="" className="w-3 5" />
                <img src={assets.star_dull_icon} alt="" className="w-3 5" />
                <p className='pl-2'>(122)</p>
              </div>
              <p className='mt-5 text-3xl font-medium '>{currency}{productData.price}</p>
              <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
              <div className='flex flex-col gap-4 my-8 '>
                <p>Select Size</p>
                <div className='flex gap-2 '>
                  {productData.sizes.map((item, index)=>{
                    return <button onClick={()=>setSize(item)} className={`border py-1 px-3 bg-gray-300 ${item === size ?'border-slate-800':''}`} key={index}>{item}</button>
                  })}
                </div>
              </div>
              <button onClick={()=>addToCart(productData._id, size)} className='uppercase bg-black text-white px-8 py-3 text-sm active:bg-gray-600'>Add to Cart</button>
              <hr className='mt-8 sm:w-4/5'/>
              <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1 '>
                <p>100% Original product.</p>
                <p>Cash on Delivery is available on this product.</p>
                <p>Easy return and exchange policy within 7 days.</p>
              </div>
            </div>
          </div>
          
          {/* Description and review section */}
          <div className='mt-20'>
            <div className='flex'>
              <b className='border px-5 py-3 text-sm'>Description</b>
              <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
            </div>
            <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
              <p>As 2024 nears its conclusion, this article will reflect on significant trends transforming fashion ecommerce. These developments have dramatically changed online consumer shopping behavior while helping brands stay relevant in ecommerce.</p>
              <p>Marketplaces provide valuable sources of data and insight, with information available about consumer behaviors and preferences known to be exploited to make more competent inventory management, pricing strategies, and marketing efforts decisions.</p>
            </div>
          </div>

        {/* Display related products */}
        <RelatedProducts category={productData.category} SubCategory={productData.SubCategory}/>

    </div>
  ):
  <div className='opacity-0'>

  </div>
}

export default Product

// ₹₹₹₹₹
// useState
// useParams
// useNavigate
// useContext
// useRef
// useCallback
// useLocation
// useEffect
