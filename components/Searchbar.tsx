"use client";
import { scrapeAndStoreProduct } from '@/lib/actions';
import React,{FormEvent, useState} from 'react'


const isValidAmazonProductUrl=(url:string)=>{
    try {
        const parsedURL=new URL(url);
        const hostname=parsedURL.hostname;
        if(hostname.includes('amazon.com')|| hostname.includes('amazon.in')){
            return true;
        }
    } catch (error) {
        return false;
    }
    return false;
}


const Searchbar = () => {
    const [searchPromt, setSearchPromt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const handleSubmit=async(event:FormEvent<HTMLFormElement>)=>{
     event.preventDefault();
   const isValidLink=isValidAmazonProductUrl(searchPromt);
     if(!isValidLink){
        return alert('Please provide a amazon valid link')
     }
     try {
        setIsLoading(true);
        const product=await scrapeAndStoreProduct(searchPromt)
     } catch (error) {
        console.log(error)
     }finally{
        setIsLoading(false);
     }
    }
  return (
    <form action="" className="flex flex-wrap gap-4 mt-12" onSubmit={handleSubmit} >
          <input value={searchPromt} onChange={(e)=>setSearchPromt(e.target.value)} type="text" className="searchbar-input" placeholder='Enter producut link' />
          <button disabled={searchPromt===''} type="submit" className='searchbar-btn' >{isLoading?'Searching...':'Search'}</button>
    </form>
  )
}

export default Searchbar