"use client"
import React, { useState } from 'react'
import {Copy,CopyIcon} from "lucide-react" ;
import { CopyCheck } from 'lucide-react';
import { ShieldCheck } from 'lucide-react';
import {useUser} from "@clerk/nextjs" ;
import {CopyToClipboard} from 'react-copy-to-clipboard';

const FileShareForm = ({file,onPasswordSave}) => {

    const [copySuccess, setCopySuccess] = useState('') ;
    const [ copy , setCopy ] = useState( false ) ;
    const [save,setsave] = useState(false) ;
    
    

    const {user} = useUser();
        const [ isPasswordEnable , setIsEnablePassword ] = useState(false) ;
        const [Password,setPassword] = useState("") ;
        const [email,setemail] = useState( null ) ;

        const sendEmail = ()=>{
            const data ={
                emailtoSend:email ,
                userName:user?.fullName ,
                fileName:file?.fileName,
                fileSize:file?.fileSize,
                fileType:file?.fileType,
                shortUrl:file?.ShortUrl
            };
             console.log("Sending Email Function Is Diabled RIght NOw")
        };

  return (
    file&&(
      <div className='flex fex-col gap-2'>
        <div className=''> 
            <label className='text-[14px] text-gray-500'>Short Url</label>
            <div className='flex gap-5 p-2 border rounded-md justify-end'>
                <input type="text" value={file?.shortUrl} disabled
                className='disabled:text-gray-500 bg-transparent outline-none' />
                
                <CopyToClipboard 
                className='text-gray-400 hover:text-gray-600'
                text={file?.shortUrl}
                onCopy={() => {
                    setCopy(true) ;
                }}>
                { copy ? <CopyCheck/> : <Copy />} 
                </CopyToClipboard>
                
            </div>
            <div className='gap-3 flex mt-5'>
                <input type="checkbox" onChange={(e)=>{
                    setIsEnablePassword(!isPasswordEnable)
                }} />
                <label>Enable Password?</label>
            </div>
            {isPasswordEnable?(
                <div className='flex gap-3 items-center'>
                <div className='border rounded-md w-full p-2'>
                    <input type="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    className='disabled:text-gray-500 bg-transparent outline-none' />
                </div>
                <button disabled={Password?.length<=3} 
                onClick={()=>{
                    onPasswordSave(Password) ;
                    setsave(true) ;
                }}
                className='p-2 bg-primary text-white rounded-md disabled:bg-gray-300 hover:bg-blue-600' >
                { save ? <ShieldCheck/> : "Save" } 
                </button>
                </div>
            ):null}
            <div className="border rounded-md p-3 mt-5">
                <label className="text-[14px] text-gray-500">
                Send Email</label>
                <div className='border rounded-md p-2'>
                    <input disabled
                    onChange={(e)=>{
                        setemail(e.target.value)
                    }}
                    className='bg-transparent outline-none' 
                    type="email" placeholder='abc@gmail.com' />
                </div>
                <button disabled={ email?.includes("@gmail.com")? false:true }
                className='p-2 disabled:bg-gray-300
                 bg-primary text-white 
                  w-full mt-2 rounded-md '
                    onClick={()=>sendEmail()}
                  >
                 Send Email
                </button>
            </div>
        </div>
      </div>
    )
  )
}

export default FileShareForm ;
