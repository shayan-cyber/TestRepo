import '../styles/globals.css'
import Link from 'next/link'
function MyApp({ Component, pageProps }) {
  return(
    <>
    <div className="flex justify-center h-screen   items-center">
      <div className="w-[20%] h-full bg-primary px-8 py-6">
            <div className="text-xl text-indigo-100 ">
                <Link href="/">
                <h1 className="my-6 cursor-pointer">Records</h1>
                </Link>
                <Link href="/login">
                <h1 className="my-6 cursor-pointer">Login</h1>
                </Link>

                <Link href="/register">
                <h1 className="my-6 cursor-pointer">Register</h1>
                </Link>

            </div>

      </div>
      <div className="w-[80%] bg-light-bg h-screen overflow-y-scroll  px-8 py-4">

       <Component {...pageProps} />
      </div>

    </div>
    </>
  )
}

export default MyApp
