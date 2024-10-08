import React from 'react'

const ProgressBar = ({progress}) => {
  return (
    <div className='bg-gray-400 w-full  mt-3 rounded-full  '>
            <div className=' bg-primary rounded-full py-0.2 text-white text-center'
             style={{width:`${progress}%`}}
            >
            {`${Number(progress).toFixed(0)}%`}
            </div>
    </div>
  )
}

export default ProgressBar ;
