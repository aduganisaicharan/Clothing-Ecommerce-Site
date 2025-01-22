import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'
const About = ()=>{
    return(
        <div>
            <div className='text-2xl text-center pt-8 border-t'>
                <Title text1={'ABOUT'} text2={'US'}/>
            </div>
            <div className='my-10 flex flex-col md:flex-row gap-16'>
                <img className='w-full max-w-[450px]' src={assets.about_img} alt="" />
                <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Itaque, dolorum!Lorem Lorem ipsum dolor sit amet consectetur, adipisicing elit. Recusandae non doloribus laudantium consequuntur hic repellat voluptatem, illum minus exercitationem voluptas?</p>
                    <p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam tenetur corrupti molestias repudiandae velit eius. Reiciendis voluptas voluptate iure molestias. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eum, culpa.</p>
                    <b className='text-gray-800'>Our Mission</b>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, totam? Voluptas alias odit facere id?</p>
                </div>
            </div>
            <div className='text-xl py-4'>
                <Title text1={'WHY'} text2={'CHOOSE US'}/>
            </div>
            <div className='flex flex-col md:flex-row text-sm mb-20'>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                    <b className='text-lg font-semibold'>Quality Assurance:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at, placeat est fugit maiores modi tempore explicabo facere itaque perferendis excepturi corporis inventore expedita assumenda nulla, unde deserunt alias eum.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                    <b className='text-lg font-semibold'>Convinence:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at, placeat est fugit maiores modi tempore explicabo facere itaque perferendis excepturi corporis inventore expedita assumenda nulla, unde deserunt alias eum.</p>
                </div>
                <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
                    <b className='text-lg font-semibold'>Exceptional Customer Service:</b>
                    <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit at, placeat est fugit maiores modi tempore explicabo facere itaque perferendis excepturi corporis inventore expedita assumenda nulla, unde deserunt alias eum.</p>
                </div>
            </div>
            <NewsLetterBox/>
        </div>
    )
}
export default About