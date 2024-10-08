import React, { useState } from 'react' ;
import { Download } from 'lucide-react';
import Image from 'next/image';

const FileItem = ({file}) => {
  const [pass , setpass ] = useState() ;
  console.log("File" ,file) ;
  return (
    <div className='w-[450px]'>
    <div className='p-5 rounded-md bg-white flex flex-col items-center'>
      <div className='text-center flex-col gap-3 items-center flex'>
      <h2 className='text-[20px] text-gray-600'>
        <strong className='text-primary'>
            {file?.userName}<br/>
        </strong>
        Shared the file with you 
      </h2>
      <h2 className='text-[18px] text-gray-400'>
        Find File Below 
      </h2>
      <Image className="w-[150px] h-[150px] p-5"  
      src="/logo.gif" width={150} height={150} />
      <h2 className='text-black-500 text-[15px]'>
          {file?.fileName}<br/>
          {(file?.fileSize/1024/1024).toFixed(2)} MB 
      </h2>
      </div>
      {
        file?.password?.length>3 ? (
        <input onChange={(e)=>{
          setpass(e.target.value) ;
        }}
        type="password" className='p-2 border rounded-md text-[14px]
        mt-5 text-center outline-blue-400' placeholder='Enter passowrd to Access' 
        />):null
      }
      {
        file?.password == 0 ? (
          <button
         href="" onClick={()=>window.open(`${file?.fileUrl}`)}
        className='flex gap-2 p-2 bg-primary text-white wounded-full w-full *:items-center hover:bg-blue-500
        text-[14px] mt-5 text-center justify-center disabled:bg-gray-300'>
            <Download className='h-4 w-4'/>
            Download
      </button>
        ):(<a disabled={file?.password == pass ? false : true } 
          href={`${file?.fileUrl}`} 
         className='flex gap-2 p-2 bg-primary text-white wounded-full w-full *:items-center hover:bg-blue-500
         text-[14px] mt-5 text-center justify-center disabled:bg-gray-300'>
             <Download className='h-4 w-4'/>
             Download
       </a>)
      }
        
      <h2 className='text-gray-400 text-[12px]'>
        Terms and Conditions are applied 
        </h2>

    </div>
    </div>
  )
}

export default FileItem
