import HeroCarousal from '@/components/HeroCarousal'
import ProductCard from '@/components/ProductCard'
import Searchbar from '@/components/Searchbar'
import { getAllProducts } from '@/lib/actions'
import Image from 'next/image'
import React from 'react'

const Home = async() => {
  const products=await getAllProducts();
  // console.log({products})
  return (
   <>
     <section className='px-6 md:px-20 py-24' >
    <div className="flex max-xl:flex-col gap-16" >
      <div className="flex flex-col justify-center">
        <p className="small-text capitalize ">Smart shopping starts here:
        <Image src='/assets/icons/arrow-right.svg' alt='right' width={16} height={16} />
        </p>
        <h1 className="head-text">
          Unleash the power of <span className="text-primary"> Prise wise</span>
        </h1>
        <p className="mt-6">
        Powerful, self-serve product and growth analytics to help you convert, engage, and retain more.
        </p>
        <Searchbar/>
      </div>
      <HeroCarousal/>
    </div>
     </section>
     <section  className='trending-section'>
      <h2 className="section-text">Trending</h2>
      <div className="flex flex-wrap gap-x-8 gap-y-16">
       {
        products?.map((product)=>(
       <ProductCard product={product} key={product._id} />
        ))
       }         
      </div>
     </section>
   </>
  )
}

export default Home