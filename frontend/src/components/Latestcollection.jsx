import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem';

const Latestcollection = ()=>{
    const [latestproducts, setLatestproducts] = useState([]);
    const {products} = useContext(ShopContext);
    useEffect(()=>{
        setLatestproducts(products.slice(0,10));
    },[products])
    return(
        <div className='my-10'>
            <div className='py-8 text-center text-3xl'>
                <Title text1={'Latest'} text2={'Collections'}/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600 '>hello Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel eos ab eius consequuntur et amet voluptas quisquam blanditiis perferendis non!</p>
            </div>

            {/* rendering products */}
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>

                {
                    latestproducts.map((item,index)=>(
                        <div className='p-2' key={index} >
                            <ProductItem id={item._id} image={item.image} name={item.name} price={item.price}/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Latestcollection