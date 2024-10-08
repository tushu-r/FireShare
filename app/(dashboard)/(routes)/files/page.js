"use client"
import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';
import app from '../../../../firebaseConfig';
import { useUser } from '@clerk/nextjs';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import Image from 'next/image';
import File from './_component/File';

const Files = () => {
  const [files, setFiles] = useState([]);

  // Initialize Firestore
  const db = getFirestore(app);

  // Initialize Firebase Storage
  const storage = getStorage(app);

  // Get user details from Clerk
  const { user } = useUser();

  // Fetch user files on component mount and when user changes
  useEffect(() => {
    if (user) {
      getAllUserFiles();
    }
  }, [user , files ]);

  // Function to get all files for the logged-in user
  const getAllUserFiles = async () => {
    if (!user) return;
  
    const userEmail = user.primaryEmailAddress.emailAddress;
    const userFilesQuery = query(
      collection(db, 'UploadedFiles'),
      where('userEmail', '==', userEmail)
    );
  
    try {
      const querySnapshot = await getDocs(userFilesQuery);
  
      // Use map to transform querySnapshot into an array of file data
      const filesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      setFiles(filesData);
    } catch (error) {
      console.error('Error fetching user files:', error);
    }
  };


  const deleteFileFromStorage = async (filePath) => {
    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath);
  
    try {
      // Delete the file
      await deleteObject(fileRef);
      console.log(`File deleted successfully from: ${filePath}`);
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  // Function to delete a file
  const handleDeleteFile = async (file) => {
    try {
      // Delete document from Firestore
      const docRef = doc( db, 'UploadedFiles', file?.id );
      await deleteDoc( docRef ) ;
      console.log('File document deleted from Firestore');

      // Delete file from Firebase Storage
      await deleteFileFromStorage(`FILES/${file?.fileName}`) ;

      // Fetch updated list of files after deletion
      getAllUserFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  

  return (
    <div className="user-files-container">
       

      <h2 className="user-name">
          {user ? user.firstName : 'Loading...'}
      </h2>

      <div className="file-list">

        {files.map((file) => (
          <div key={file.id} className="flex flex-row justify-between file-item mb-[15px] mt-[5px]">
              <File  file={file} handleDeleteFile={handleDeleteFile}
              />
              <div className='flex flex-col'>
                <Image src="/logo.gif" width={100} height={100} />
                <div className='flex flex-row justify-center'>
                  {(file?.fileSize/1024/1024).toFixed(2)} MB 
                </div>
              </div>
            
          </div>
        ))}

      </div>

      <style jsx>{`
        .user-files-container {
          padding: 20px;
          border-radius: 20px;
          margin: 25px;
        }
        .user-name {
          display:fixed;
          font-size: 32px;
          color: #1e2a31;
          margin-bottom: 15px;
          padding-bottom: 10px;
        }
        .file-list {
          border-top:1px solid gray ;
          padding:10px;
          border-radius:30px;
          display: grid;
          max-height:689px;
          gap-x: 40px;
          overflow-y:scroll;
        }
        .file-list::-webkit-scrollbar {
           width: 0%;
         }
         .file-list::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      }
       
      .file-list::-webkit-scrollbar-thumb {
        background-color: darkgrey;
        outline: 1px solid slategrey;
      }
        .file-item {
          border: 1px solid #ccc;
          border-radius: 25px;
          overflow: hidden;
          transition: transform 0.2s;
          position: relative;
          display: flex;
          align-items: center;
          padding: 10px;
        }
        .file-item:hover {
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .file-details {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-right: 10px;
        }
        .file-details p {
          margin: 0;
          font-size: 19px;
          color: #333;
        }
        .file-actions {
          display: flex;
          align-items: center;
        }
        button {
          background-color: transparent;
          color: #666;
          border: none;
          padding: 5px;
          cursor: pointer;
          transition: color 0.2s;
        }
        button:hover {
          color: #333;
        }
      `}</style>
    </div>
  );
};

export default Files;
