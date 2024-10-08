import React from 'react'

 const HeroBanner = () => {
  return (
    <div >
    <section className="bg-gray-50">
    <div className="mx-auto max-w-screen-md px-4 py-32 lg:flex lg:h-80vh lg:items-center">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-extrabold sm:text-5xl">
          <span className='text-primary'> Upload</span> and Save 
          <strong className="font-extrabold text-gray-600 sm:block"> 
             Then Share 
           </strong>
        </h1>
  
        <p className="mt-4 sm:text-xl/relaxed  text-black-700">
            Share Files Easily With Email or with a  Link
        </p>
  
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            className="block w-full rounded bg-black px-12 py-3 text-sm font-medium text-white shadow hover:bg-gray focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
            href="/sign-in"
          >
            Get Started
          </a>
  
          
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default HeroBanner
