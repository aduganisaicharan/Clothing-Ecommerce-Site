import React from 'react'
import Hero from '../components/Hero'
import Latestcollection from '../components/Latestcollection'
import Bestseller from '../components/Bestseller'
import Ourpolicy from '../components/Ourpolicy'
import NewsLetterBox from '../components/NewsLetterBox'

const Home = () => {
    return(
        <div>
            <Hero/>
            <Latestcollection/>
            <Bestseller/>
            <Ourpolicy/>
            <NewsLetterBox/>
        </div>
    )
}
export default Home