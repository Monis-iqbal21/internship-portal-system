import Link from 'next/link'

const page = () => {
  return (
    <div className='flex justify-center items-center h-[60vh] bg-gray-200  '>
      <span className='text-[1.5rem] font-extrabold px-8 py-4 '>Page not Found !</span>
      <Link href={"/"} className='no-underline text-[1.5rem] border-0 rounded-2xl hover:bg-blue-600 text-white font-extrabold px-8 py-4 bg-blue-800'>
        Home Page
      </Link>
    </div>
  )
}

export default page;
