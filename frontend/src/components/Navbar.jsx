import React, { useContext, useState }  from "react";
import {assets} from '../assets/assets'
import { NavLink,Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const Navbar = ()=>{
    const {setShowSearch, getCartCount, showSearch, navigate, token, setToken, setCartItems} = useContext(ShopContext)
    const [visible, setVisible] = useState(false);
    const logout = ()=>{
        navigate('/login')
        localStorage.removeItem('token')
        setToken('')
        setCartItems({})
    }
    return(
        <div className="flex items-center justify-between py-5 font-medium">
            <Link to={'/'}>
            <img src={assets.logo} className="w-36" alt='Logo'/>
            </Link>
            <ul className="hidden sm:flex gap-5 text-md text-gray-500">
                <NavLink to='/' className="flex flex-col items-center gap-1">
                    <p className="uppercase">Home</p>
                    <hr className="border-none w-2/4 h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
                
                <NavLink to='/collection' className="flex flex-col items-center gap-1">
                    <p className="uppercase">Collection</p>
                    <hr className="border-none w-2/4 h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
                
                <NavLink to='/about' className="flex flex-col items-center gap-1">
                    <p className="uppercase">about</p>
                    <hr className="border-none w-2/4 h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
                
                <NavLink to='/contact' className="flex flex-col items-center gap-1">
                    <p className="uppercase">contact</p>
                    <hr className="border-none w-2/4 h-[1.5px] bg-gray-700 hidden"/>
                </NavLink>
            </ul>
            <div className="flex gap-6 items-center p-3">
                <img onClick={()=>setShowSearch(!showSearch)} src={assets.search_icon} className="w-4 cursor-pointer" alt="" />
                <div className=" p-2 group relative">
                    <img onClick={()=>token?null:navigate('/login')} src={assets.profile_icon} className="w-5 cursor-pointer " alt="" />
                    {/* dropdown */}
                    {
                    token&&
                    <div className="hidden group-hover:block absolute dropdown-menu right-0 pt-4">
                        <div className="flex flex-col gap-2 w-36 px-5 bg-slate-200 text-slate-500 py-3">
                            <p className="cursor-pointer hover:font-semibold hover:text-black">My profile</p>
                            <p onClick={()=>navigate('/orders')} className="cursor-pointer hover:font-semibold hover:text-black">Orders</p>
                            <p onClick={logout} className="cursor-pointer hover:font-semibold hover:text-black">Logout</p>
                        </div>
                    </div>
                    }
                    
                </div>
                <Link to='/cart' className="relative">
                    <img src={assets.cart_icon} className="w-5 min-w-5" alt="" />
                    <p className="bg-black right-[-5px] bottom-[-5px] absolute text-center w-4 leading-4 text-white aspect-square rounded-full text-[10px]">{getCartCount()}</p>
                </Link>
                <img src={assets.menu_icon} className="w-6 sm:hidden cursor-pointer" onClick={()=>setVisible(true)} alt="" />

                <div className={`absolute top-0 bottom-0 right-0 bg-white overflow-hidden ${visible? 'w-full':'w-0'} transition-all`}>
                    <div className="flex flex-col text-gray-600">            
                        <div onClick={()=>setVisible(false)} className="flex items-center cursor-pointer gap-4 p-3">
                            <img className="h-4 rotate-180 text-1xl" src={assets.dropdown_icon} alt="" />
                            <p >Back</p>
                        </div>
                        <NavLink onClick={()=>{setVisible(false)}} className='uppercase py-2 pl-4 border' to='/'>Home</NavLink>
                        <NavLink onClick={()=>{setVisible(false)}} className='uppercase py-2 pl-4 border' to='/collection'>Collection</NavLink>
                        <NavLink onClick={()=>{setVisible(false)}} className='uppercase py-2 pl-4 border' to='/about'>About</NavLink>
                        <NavLink onClick={()=>{setVisible(false)}} className='uppercase py-2 pl-4 border' to='/contact'>Contact</NavLink>
                    </div>
                </div>

            </div>
            
        </div>
    )
}
export default Navbar