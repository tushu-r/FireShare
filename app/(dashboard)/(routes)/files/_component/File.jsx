import React from 'react'
import { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { CopyCheck , Trash2 , Share2 , CheckCheck} from 'lucide-react';

const File = ({file , handleDeleteFile}) => {
    const [ showTrash , setshowTrash ]  = useState(false) ;
    const [ showShare , setShare ] = useState(false) ;
  return (
    <div className="text-[22px] flex  flex-col gap-y-[22px]">
              <p>{file.fileName}</p>
              <div className="flex flex-row gap-x-[10px]">
                 { showTrash ?  <CheckCheck className='hover:text-pink-600'/>  :  <Trash2 className={'hover:text-red-600'}
                   size={22} onClick={()=>{
                     handleDeleteFile(file) ;
                     setshowTrash(true) ;
            }}/>} 
                <CopyToClipboard 
                className=' hover:text-pink-600'
                text={file?.shortUrl}
                onCopy={() => {
                    setShare(true) ;
                }}>
                { showShare  ?  <CopyCheck /> : <Share2 size={26} />} 
                </CopyToClipboard>

              </div>
    </div>
  )
}

export default File
