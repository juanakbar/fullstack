import React, { Fragment } from 'react';
import { usePage, Link } from '@inertiajs/inertia-react';
import NavLink from '@/Components/NavLink';
import DropdownMenu from '@/Components/DropdownMenu';
import ResponsiveNavigation from '@/Layouts/ResponsiveNavigation';
import Logo from '/public/img/Logo.png';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
export default function Navbar() {
    const { auth, carts_global_count } = usePage().props;
    return (
        <>
            <ResponsiveNavigation />
            <nav className="hidden sticky top-0 z-50 border-b border-dashed border-gray-800 backdrop-blur-sm bg-white/30 py-4 shadow lg:block">
                <div className="mx-auto max-w-screen-2xl px-4">
                    <div className="flex items-center justify-between">
                        <img src={Logo} alt="Logo" className='w-10 h-10' />
                        <div className="flex flex-1 items-center justify-between">
                            <div>
                                <NavLink
                                    href='/'
                                    className={'text-red-500 '}
                                >
                                    Kedai Gambling
                                </NavLink>
                            </div>
                            <div className='flex justify-between'>
                                <NavLink
                                    href={route('index')}
                                    active={route().current('index')}
                                    className={` mr-5`}
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    href={route('menu.index')}
                                    active={route().current('menu.index')}
                                    className={` mr-5`}
                                >
                                    Our Menu
                                </NavLink>
                            </div>
                            <div className="flex items-center gap-x-3">

                                {auth.user ? (
                                    <>
                                        <Link class="inline-flex relative items-center rounded-lg border border-white/10 p-2.5 px-3.5 text-gray-800"
                                            href={route('cart.index')}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" width="24" height="24"
                                                viewBox="0 0 24 24" stroke-width="1" stroke="currentColor" fill="none" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <polyline points="7 10 12 4 17 10"></polyline>
                                                <path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z"></path>
                                                <circle cx="12" cy="15" r="2"></circle>
                                            </svg>
                                            <span class="sr-only">Notifications</span>
                                            <div
                                                class="inline-flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white dark:border-gray-900">
                                                {carts_global_count > 0 ? carts_global_count : 0}
                                            </div>
                                        </Link>
                                        <div className="flex items-center">
                                            <DropdownMenu label={auth.user.name}>
                                                <DropdownMenu.Link
                                                    href={route('index')}
                                                >
                                                    Home
                                                </DropdownMenu.Link>
                                                <DropdownMenu.Link href={`/${auth.user.username}`}>
                                                    My profile
                                                </DropdownMenu.Link>
                                                <DropdownMenu.Link href={route('order.index')}>
                                                    Your Order
                                                </DropdownMenu.Link>
                                                <DropdownMenu.Link
                                                    href={route('logout')}
                                                    method="POST"
                                                    as="button"
                                                >
                                                    Logout
                                                </DropdownMenu.Link>
                                            </DropdownMenu>
                                        </div>
                                    </>
                                ) : (
                                    <Link href={route('login')} as='button' className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'> Login</Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
