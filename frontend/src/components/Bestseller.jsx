import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const Bestseller = () => {
    const {products} = useContext(ShopContext);
    const [bestseller, setBestseller] = useState([]);

    useEffect(()=>{
        const bestproduct = products.filter((item)=>(item.bestSeller));
        // console.log(bestproduct)
        setBestseller(bestproduct.slice(0,5));
    },[products])
  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'Best'} text2={'Sellers'}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'></p>
                This is the exact place to find the new you!!
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestseller.map((item,index)=>(
                    <ProductItem key={index} id={item.id} image={item.image} name= {item.name} price={item.price}/>
                ))
            }
        </div>
    </div>
  )
}

export default Bestseller