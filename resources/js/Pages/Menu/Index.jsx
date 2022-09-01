import React, { Fragment } from 'react';
import App from '@/Layouts/App';
import { Head, Link, usePage } from '@inertiajs/inertia-react';
import Hero from '/Public/img/menu-hero.jpg';
import ProductItem from '@/Components/ProductItem';
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Pagination from '@/Components/Pagination';
import clsx from 'clsx';

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Index({ category, ...props }) {
    const { data: products, meta, links } = props.products;
    // const { categories_global } = usePage().props;
    return (
        <>
            <Head title="Our Menu" />
            <section className="py-20 bg-white">
                <div className="flex flex-col px-8 mx-auto space-y-12 max-w-7xl xl:px-12">
                    <div className="flex flex-col mb-8 animated fadeIn sm:flex-row">
                        <div className="flex items-center mb-8 sm:w-1/2 md:w-5/12 sm:order-last">
                            <img className="rounded-lg shadow-xl" src={Hero} alt="" />
                        </div>
                        <div className="flex flex-col justify-center mt-5 mb-8 md:mt-0 sm:w-1/2 md:w-7/12 sm:pr-16">
                            <p className="mb-2 text-sm font-semibold leading-none text-left text-indigo-600 uppercase">
                                Kedai Gambling</p>
                            <h3 className="mt-2 text-2xl sm:text-left md:text-4xl">Cozy Place To Get Lunch and Coffe</h3>
                        </div>
                    </div>
                </div>
            </section>
            <div className="bg-white border-b">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="flex items-center justify-between space-x-4">
                        <h2 className="text-lg font-medium text-gray-900">Our Menu</h2>
                        <Menu as="div" className="relative inline-block text-left z-10">
                            <div>
                                <Menu.Button className="inline-flex justify-center w-full rounded-md  px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                    Category
                                    <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        {category.map(category => (
                                            <Menu.Item key={category.slug}>
                                                {({ active }) => (
                                                    <Link
                                                        href={`/menu?category=${category.slug}`}
                                                        className={clsx(
                                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                            'block px-4 py-2 text-sm'
                                                        )}
                                                    >
                                                        {category.name}
                                                    </Link>
                                                )}
                                            </Menu.Item>
                                        ))}

                                    </div>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    </div>

                    {products.length ?
                        (
                            <>
                                <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                                    {products.map(product => (
                                        <ProductItem key={product.id} product={product} />
                                    ))}
                                </div>
                            </>
                        )
                        : (

                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                                </svg>

                                <h3 className="mt-2 text-sm font-medium text-gray-900">No Item</h3>
                            </div>

                        )
                    }
                    <Pagination meta={meta} links={links} />
                </div>
            </div>
        </>
    );
}

Index.layout = page => <App children={page} />
