"use client"
import React, { useEffect } from 'react' ;
import { useState } from 'react';
import ProgressBar from "../_components/ProgressBar" ;
import FilePreView from ".././_components/FilePreView";
import Alert from '@mui/material/Alert';


const UploadForm = ({uploadBtnClick,progress}) => {
    const [ File , setFile ] = useState() ;
    const [errorMsg , setErrorMsg ] = useState("") ;
    const onFileSelect=(file)=>{
        if( file&&file.size > 35000000 )
        {
            setErrorMsg('Maximum File Upload  Size is 35MB');
            return ;
        }
        setErrorMsg(null) ;
        console.log(file) ;
        setFile(file) ;
    }

  return (
    <div className='text-center '>    
        <div className="flex items-center justify-center w-full">
            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-blue-50 dark:hover:bg-gray-800  hover:bg-gray-300 ">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 mb-4 text-blue-500 dark:text-black-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-md text-black-500 ">
                    <span className="font-semibold">
                      Click to upload
                    </span> or <strong className='text-blue-500'>drag </strong>and <strong className='text-blue-500'>drop </strong>
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" 
                 onChange={ (event)=>{
                    onFileSelect( event.target.files[0] ) 
                 }}
                />
            </label>
        </div> 
       { errorMsg ? <Alert severity="error">{errorMsg}</Alert>:null } 
       {  File ? <FilePreView file={File} removeFile={()=>{
         console.log(document.getElementById("dropzone-file").value = null  )
         setFile()  
       }}/> : null }
        <button onClick={()=>{
            uploadBtnClick(File) ;
        }} className='disabled:bg-gray-400 p-2 bg-primary text-white w-[30%] rounded-full mt-5'>
            Upload
        </button>
       { progress >= 0 ? <ProgressBar progress={progress} /> : null } 
    </div>
   
  )
}
export default UploadForm ;


















