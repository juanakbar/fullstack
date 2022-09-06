import React from 'react';
import App from '@/Layouts/App';
import Hero from '/public/img/img-hero.svg';
import Bg from '/public/img/bg-image.png'
import { Head, Link } from '@inertiajs/inertia-react';
import ProductItem from '@/Components/ProductItem';

export default function Index(props) {
    const { data: products, meta, links } = props.products;
    return (
        <>
            <Head title="Home" />
            <div style={{
                backgroundImage: `url("${Bg}")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
                {/* <section className="min-h-screen -mt-[4.5rem] bg-back flex items-center justify-center text-gray-700 body-font">
                    <div className="container mx-auto flex md:flex-row flex-col items-center">
                        <div
                            className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-3 md:mb-0 items-center text-center">
                            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Enjoy your
                                <span className="text-pops"> coffee </span>
                                before your activity
                            </h1>


                            <p className="mb-8 leading-relaxed font-light">Boost your productivity and build your mood with a
                                glass
                                of
                                coffee in the morning .</p>
                            <Link href='/menu' className="flex justify-between items-center">
                                <div
                                    className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
                                    <button type="button" className="">
                                        Order Now
                                    </button>
                                    <div className="text-white rounded-full p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" className="w-5 h-5 text-white">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </div>
                        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
                            <img className="object-cover object-center rounded" alt="hero"
                                src={Hero} />
                        </div>
                    </div>
                </section> */}
                <div className="min-h-screen flex items-center pt-10  sm:pt-16 lg:pt-8 lg:pb-14 lg:overflow-hidden">
                    <div className="mx-auto max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                            <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 sm:text-center lg:px-0 lg:text-left lg:flex lg:items-center">
                                <div className="lg:py-24">
                                    <h1 className="mt-4 text-4xl tracking-tight font-extrabold text-[#2F2105] sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                                        <span className="block">Enjoy Your Coffe </span>
                                        <span className="block text-[#2F2105]">Before Your Actvity</span>
                                    </h1>
                                    <p className="mt-3 text-base text-gray-700 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Boost your productivity and build your mood with a
                                        glass
                                        of
                                        coffee in the morning .
                                    </p>
                                    <div className="mt-10 sm:mt-12">
                                        <form action="#" className="sm:max-w-xl sm:mx-auto lg:mx-0">
                                            <div className="sm:flex">
                                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                                    <Link
                                                        href='/menu'
                                                        type="submit"
                                                        className="block w-full py-3 px-4 rounded-md shadow bg-[#2F2105] text-white font-medium hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300 focus:ring-offset-gray-900"
                                                    >
                                                        Get Your Coffe Now
                                                    </Link>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-12 -mb-16 sm:-mb-48 lg:m-0 lg:relative">
                                <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:max-w-none lg:px-0">
                                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                                    <img
                                        className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                        src={Hero}
                                        alt="Hero"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                < div className="bg-white border-b" >
                    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                        <div className="flex items-center justify-between space-x-4">
                            <h2 className="text-lg font-medium text-gray-900">Our Menu</h2>
                            <Link href={route('menu.index')} className="whitespace-nowrap text-sm font-medium text-indigo-600 hover:text-indigo-500">View all<span aria-hidden="true"> →</span>
                            </Link>
                        </div>

                        {products.length ?
                            (
                                <>
                                    <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                                        {products.map(product => (
                                            <ProductItem key={product.id} product={product} />
                                        ))}
                                    </div>
                                </>)
                            : (

                                <div className="text-center">
                                    <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                    </svg>

                                    <h3 className="mt-2 text-sm font-medium text-gray-900">No Item</h3>
                                </div>

                            )
                        }
                    </div>
                </ div>
            </div>
        </>
    );
}

Index.layout = page => <App children={page} />
