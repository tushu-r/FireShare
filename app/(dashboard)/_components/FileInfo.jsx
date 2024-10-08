"use client" ;
import React, { useEffect , useState } from 'react'
import Image from "next/image" ;

const FileInfo = ({file}) => {
   console.log(file)

  return (
    file&&
    <div className='text-center border flex justify-center 
    m-4 flex-col items-center p-2 rounded-md hover:border-blue-200'>

        <Image src={ '/File.png' } 
          width={200} height={200} 
        className='h-[200px] rounded-md object-contain'/>

        <div className=''>
            <h2 className='text-black text-2xl'>{file?.fileName}</h2>
            
        </div>
    </div>
  )
}

export default FileInfo ;
