"use client"
  import React from 'react'
import Image from 'next/image'
const Div4 = () => {
  return (<>
  <div>
    <div className="fashiionone flex gap-8  p-5 ">
      <div className="fasonecontent">
        <h1 className='text-5xl leading-normal'> Surf Through Trendy <br></br>OUTFITS AT 50% OFF</h1>
        <p className='my-5 text-2xl'>Get your faviourate outfits at just 50% OFF  </p>
        <span><button className='border-black h-[40px] p-2 border-2 '>View More</button></span>
      </div>
      <Image width={20} height={20} className='w-[50vw]' alt='missing' src='/fashionone.webp'></Image>

      
    </div>
    </div>
    </>
  )
}

export default Div4
