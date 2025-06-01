import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"
import axios from 'axios'

export const ShopContext = createContext();

const ShopContextProvider = (props)=>{

    const currency='$'
    const delivery_fee = 10

    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setcartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token,setToken] = useState('');
    const navigate = useNavigate()

    const addToCart = async(itemId, size)=>{

        if(!size){
            toast.error('Please Select Size')
            return;
        }
        else{
            toast.success("Added to cart")
        }

        let cartData = structuredClone(cartItems);
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size]+=1;
            }
            else{
                cartData[itemId][size] = 1; 
            }
        }
        else{
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setcartItems(cartData)
        // if token is available then we are logged in and add these cart data into database 
        if(token){
            try{
                await axios.post(backendUrl+'/api/cart/add',{itemId,size},{headers:{token}})    // when ever we are logged in our prodct will be addedin database 
            }catch(error){
                console.log(error);
                // res.json({success:false,message:error.message })
                toast.error(error.message)
            }
        }

    }

    const getCartCount = ()=>{
        let totalCount = 0;
        for(const items in cartItems){
            for(const size in cartItems[items]){
                try{
                    if(cartItems[items][size]>0){
                        totalCount += cartItems[items][size];
                    }
                }
                catch(error){
                    
                }
            }
        }
        return totalCount;
    }

    const updateQuantity = async(itemId,size,quantity)=>{
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setcartItems(cartData);
        if(token){
            try {
                await axios.post(backendUrl+'/api/cart/update', {itemId,size,quantity},{headers:{token}})
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }

    }

    const getTotalAmount = ()=>{
        let totalamount = 1;
        for(const items in cartItems){
            const itemInfo = products.find((product)=>product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalamount += itemInfo.price*cartItems[items][item];
                    }
                }
                catch(error){

                }
            }
        }
        return totalamount;
    }

    const getProductsData = async()=>{
        try{
            console.log(import.meta.env.VITE_BACKEND_URL)
            const response = await axios.get(backendUrl+'/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
            else{
                toast.error(response.data.message)
            }

        } catch(error){
            console.log(error)
            toast.error(error.message)
        }
        
    }

    const getUserData = async(token)=>{
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers:{token}});
            if(response.data.success){
                setcartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        getProductsData();
    },[])
    

    useEffect(()=>{
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'));
            getUserData(localStorage.getItem('token'));
        }
    },[])

    const value={
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount,updateQuantity, getTotalAmount, navigate,
        backendUrl, token, setToken, setcartItems
    }
    return(
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )

}
export default ShopContextProvider