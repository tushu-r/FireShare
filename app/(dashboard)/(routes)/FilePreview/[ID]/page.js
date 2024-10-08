"use client" ;
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore , getDoc , doc, updateDoc  } from 'firebase/firestore';

import React, { useEffect , useState} from 'react' ;

import app from "../../../../../firebaseConfig"  ;
import Link from 'next/link' ;

import { ArrowLeftSquare } from 'lucide-react';


import FileInfo from "../../../_components/FileInfo" ;
import FileShareForm from "../../../_components/FileShareForm" ;

const FilePreview = ({params}) => {

  const db = getFirestore(app) ;

  const [ fileInfo , setfileInfo ] = useState() ;


  useEffect(()=>{
      console.log(params?.ID) ;
      params?.ID&&getFileInfo() ;
  },[]); 

  const getFileInfo = async()=>{
    const querySnapshot = await getDocs(collection(db, "UploadedFiles"));
    querySnapshot.forEach((doc) => {
      if( doc.id == params?.ID) {
        console.log("Document Data:", doc.data() ) ;
        setfileInfo( doc.data()  ) ;
        console.log(`${doc.id} => ${doc.data()}`);
      }
    });

      // if( docSnap.exists() ){
      //   console.log("Docaument DAta:", docSnap.data() ) ;
      //   setfileInfo( docSnap.data()  ) ;
      // }else{
      //   console.log("No such document!!") ;
      // }
  };

  const onPasswordSave = async(password)=>{
        const  docRef = doc(db,"UploadedFiles",params?.ID) ;
        await updateDoc(docRef,{
          password:password
        });
  }

  return (
    <div className='py-10 px-20'>
    <Link href="/upload" className='flex gap-3'>
      <ArrowLeftSquare />Go to Upload
    </Link>

    <div className='grid grid-cols-1 md:grid-cols-2 mt-5'>
      <FileInfo file={fileInfo} />
      <FileShareForm file={fileInfo} onPasswordSave={(password)=>{
        onPasswordSave(password) ;
      }} />
    </div>
     
    </div>
  )
}

export default FilePreview ;
