"use client"
import React from 'react' ;
import Image from 'next/image';
import { X } from 'lucide-react';

const FilePreView = ({file,removeFile}) => {
  return (
    <div className='flex items-center gap-2 justify-between mt-5 border rounded-md p-2 border-blue-400'>
      <div className='flex items-center p-2'>
      <Image src={"/FilePreview.png"}  width={50} height={50} alt="file" />
      <div className='flex flex-col gap-y-[0px] relative left-[20px]'>
            <h2 className='w-full  text-[32px] text-black'>
            {file?.name}
            </h2>
            <h2 classname="text-[32px] text-gray-100 ">
                <br/>{(file?.size/1024/1024).toFixed(2)} MB
            </h2>
            
      </div>
      </div>
      <X className="text-red-500 cursor-pointer" 
      onClick={()=>{
        removeFile() ;
      }}
      />
    </div>
  )
}

export default FilePreView ;
