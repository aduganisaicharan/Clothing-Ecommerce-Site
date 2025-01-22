import React from "react";
const NewsLetterBox = ()=>{
    const onSubmithandler=(event)=>{
        event.preventDefault();
    }
    return(
        <div className="text-center">
            <p className="text-2xl  font-medium text-gray-4=600">Support now and get 20% Off</p>
            <p className="text-gray-400 mt-3 "> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quisquam.</p>
            <form onSubmit={onSubmithandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3">
                <input className="w-full sm:flex-1 outline-none" required type="email" placeholder="Enter your email" />
                <button className="bg-black text-white text-xs px-8 py-2" type="submit" >Submit</button>
            </form>
        </div>
    )
}
export default NewsLetterBox