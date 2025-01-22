import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';
const Collection = ()=>{
    const {products, search, showSearch} = useContext(ShopContext);
    const [showfilter, setShowFilter] = useState(false);
    const [filterproduct, setFilterProduct] = useState([]);
    const [category,setCategory] = useState([]);
    const [subCategory,setSubcategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');


    // check and uncheck implementing using toggle function add if not there 
    // delete if there for both category and sub category
    const toggleCategory = (e)=>{

        if(category.includes(e.target.value)){
            setCategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory=(e)=>{
        if(subCategory.includes(e.target.value)){
            setSubcategory(prev => prev.filter(item => item !== e.target.value))
        }
        else{
            setSubcategory(prev=>[...prev, e.target.value])
        }
    }

    // applying the filters using the category and subcategory 

    const applyFilters = ()=>{
        let productsCopy = products.slice();

        if(showSearch && search){
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if(category.length > 0){
            productsCopy = productsCopy.filter(item => category.includes(item.category));
        }
        
        if(subCategory.length >0){
            productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
        }
        setFilterProduct(productsCopy)
    }

    // setting the products into the filterproduct 
   
    useEffect(()=>{
        applyFilters();
    },[category,subCategory,search,showSearch,products])

    // sort products 
    const sortProduct = ()=>{
        let fpcopy = filterproduct.slice();
        switch(sortType){
            case 'Low to High':
                setFilterProduct(fpcopy.sort((a,b)=>(a.price - b.price)));
                break;
            case 'High to Low':
                setFilterProduct(fpcopy.sort((a,b)=>(b.price - a.price)));
                break;
            default:
                applyFilters();
                break;
        }
    }

    useEffect(()=>{
        sortProduct()
    },[sortType])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            {/* filter options */}
            <div className='min-w-60'>
                <p onClick={()=>setShowFilter(!showfilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img className={`h-3 sm:hidden ${showfilter?'rotate-90':''}`} src={assets.dropdown_icon} alt="" />
                </p>
                {/* category filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' :'hidden'} sm:block`}>
                    <p className='mb-3 font-medium text-sm'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 font-light text-sm text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Men'} onChange={toggleCategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Women'} onChange={toggleCategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Kids'} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>
                {/* subcategory */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showfilter ? '' :'hidden'} sm:block`}>
                    <p className='mb-3 font-medium text-sm'>TYPE</p>
                    <div className='flex flex-col gap-2 font-light text-sm text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />TopWear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />BottomWear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />WinterWear
                        </p>
                    </div>
                </div>
            </div>

                {/* rightside */}
                <div className='flex-1'>
                    <div className='flex justify-between text-base sm:text-2xl mb-4'>
                        <Title text1={'All'} text2={'Collections'}/>
                        {/* product sort */}
                        <select onChange={(e)=>(setSortType(e.target.value))} className='border-2 border-gray-300 text-sm px-2'>
                            <option value="Relevent">Sort By: Relevent</option>
                            <option value="Low to High">Sort By: Low to High</option>
                            <option value="High to Low">Sort By: High to Low</option>
                        </select>

                    </div>                
                {/* map products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                    filterproduct.map((item, index)=>(
                        <ProductItem key={index} id={item._id} image={item.image} name={item.name}  price={item.price}/>
                    ))
                }
                </div>
            </div>
        </div>

    )
}
export default Collection