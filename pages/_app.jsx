import '../styles/globals.css'
import Head from 'next/head';
import Router from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Transition } from "@headlessui/react";

function MyApp({ Component, pageProps }) {

  let [load,setLoad] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setLoad(true);
        document.documentElement.style = 'pointer-events: all;'
      }, 1000)
    }, [])
    Router.events.on('routeChangeStart', () => {
        setLoad(false);
        document.documentElement.style = 'pointer-events: none;'
    });
    Router.events.on('routeChangeComplete', () => {
      setTimeout(() => {
        setLoad(true);
        document.documentElement.style = 'pointer-events: all;'
      }, 1000)
    });
    Router.events.on('routeChangeError', () => {
      setTimeout(() => {
        setLoad(true);
        document.documentElement.style = 'pointer-events: all;'
      }, 1000)
    });

  return (
    <>
    <Head>
      <title>Loading... | NextShare</title>
    </Head>

    <Component {...pageProps} />

    <Transition
          as={Fragment}
          show={!load ? true : false}
          enter="transform transition duration-[100ms]"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transform duration-[250ms] transition ease-in-out"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
      >
        <div style={{ zIndex: 99999 }} className="fixed bg-black/50 w-full h-screen flex justify-center items-center pointer-events-none">
            <div className="flex items-center gap-x-6 animate-pulse">
                <div className="text-center">
                    <p className="text-6xl mb-5 font-semibold text-white">NextShare</p>
                    <p className="uppercase text-xl font-semibold text-white"><i className="fal fa-spinner-third fa-spin" /></p>
                </div>
            </div>
        </div>
    </Transition>
    </>
  )
}

export default MyApp
