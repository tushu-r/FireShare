"use client" ;
import React ,{useEffect, useState} from 'react' ;
import UploadForm from "../../_components/UploadForm" ;
import app from "../../../../firebaseConfig"  ;

import { getStorage, ref } from "firebase/storage";
import { uploadBytes ,  uploadBytesResumable  , getDownloadURL } from "firebase/storage";

import { getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 


import {useUser} from "@clerk/nextjs" ;

import {generateRandomString} from "../../../_utils/GenerateRandomString"
import { useRouter } from 'next/navigation';

const Upload = () => {
  
 
  const {user} = useUser();
  console.log(user) ;

  const router = useRouter() ;

  const [  Progress , setProgress  ] = useState() ;
  const [ fileDocId , setfileDocId ] = useState() ;


  const db  = getFirestore(app) ;


  
  
  const saveFileToFirestore = async ( docId , file , downloadURL ,Name ) => {
    const fileData = {
            fileName:Name ,
            fileSize:file?.size ,
            fileType:file?.type ,
            fileUrl:downloadURL,
            userEmail:user?.primaryEmailAddress.emailAddress ,
            userName:user?.fullName ,
            password:"",
            id:docId,
            shortUrl:process.env.NEXT_PUBLIC_BASE_URL+"FileView/"+docId,
            uploadedAt: new Date(), // Timestamp of the upload
    };
  
    try {
      // Save the file information as a document in Firestore
      await setDoc(doc(db, "UploadedFiles", docId), fileData);
      
      console.log(`File saved to Firestore with ID: ${docId}`);
    } catch (error) {
      console.error("Error saving file to Firestore:", error);
    }
  };

  
  const uploadFile=(file)=>{
    const storage = getStorage(app) ;
    const sanitizedFileName = file.name.replace(/\s+/g, "_")  ; 
    const storageRef = ref( storage , `FILES/${sanitizedFileName}` ) ;
    const uploadTask =  uploadBytesResumable( storageRef , file ) ;

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress monitoring (optional)
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log(`Upload is ${progress}% done`);
        setProgress(progress);
      },
      (error) => {
        // Handle errors during file upload
        console.error("Error during file upload:", error);
      },
      async () => {
        // Once the upload is complete, get the download URL
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          console.log("File available at:", downloadURL);
  
          // Save the file information to Firestore
          const docId = generateRandomString() // Generate a unique document ID
          await saveFileToFirestore(docId, file, downloadURL , sanitizedFileName);
          router.push(`/FilePreview/${docId}`)
        } catch (error) {
          console.error("Error getting download URL:", error);
        }
      }
    );
    

  }
 

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[27px] text-center'>Start 
      <strong className='text-primary'>Uploading</strong> 
      File  and <strong className='text-primary'>Share
      </strong>It</h2>
      <UploadForm uploadBtnClick={(file)=>uploadFile(file)} 
      progress={Progress}
    />
    
      {Progress==100?(
        <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4">
        <div className="flex items-start gap-4">
          <span className="text-green-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </span>
      
          <div className="flex-1">
            <strong className="block font-medium text-gray-900"> Done !! </strong>
      
            <p className="mt-1 text-sm text-gray-700">Files Uploaded</p>
          </div>
      
          <button className="text-gray-500 transition hover:text-gray-600">
            <span className="sr-only">Dismiss popup</span>
      
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      ):null}
    </div>
  )
}

export default Upload ;
