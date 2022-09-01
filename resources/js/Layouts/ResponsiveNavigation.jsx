import React from 'react';
import { Link, usePage } from '@inertiajs/inertia-react';
import DropdownMenu from '../Components/DropdownMenu';
import Logo from '/public/img/Logo.png';

export default function ResponsiveNavigation() {
    const { auth, carts_global_count } = usePage().props;
    return (
        <nav className="border-b border-gray-800 backdrop-blur-sm bg-white/30 px-4 py-4 lg:hidden">
            <div className="flex items-center justify-between">
                <Link className="text-xl font-semibold text-gray-900" href="/">
                    {/* {import.meta.env.VITE_APP_NAME} */}
                    <img src={Logo} alt="Logo" className='w-10 h-10' />

                </Link>
                {auth.user ? (
                    <>
                        <Link class="inline-flex relative items-center rounded-lg border border-white/10 p-2.5 px-3.5 text-gray-800"
                            href="{{ route('cart.index') }}">
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
                    </>
                ) : (
                    null
                )}
                <DropdownMenu
                    toggleAnimate={false}
                    label={
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16m-7 6h7"
                            />
                        </svg>
                    }
                >

                    <DropdownMenu.Link href={'/'}>Home</DropdownMenu.Link>
                    <DropdownMenu.Link href={route('menu.index')}>Menu</DropdownMenu.Link>
                    <DropdownMenu.Link href={'#'}>Our Galery</DropdownMenu.Link>
                    {auth.user ? (
                        <>
                            <DropdownMenu.Divider />
                            <DropdownMenu.Link href={'#'}>
                                Cart
                            </DropdownMenu.Link>
                            <DropdownMenu.Link href={"#"}>
                                History
                            </DropdownMenu.Link>
                            <DropdownMenu.Link href={'#'}>
                                My profile
                            </DropdownMenu.Link>
                            <DropdownMenu.Link href={'#'}>
                                Settings
                            </DropdownMenu.Link>
                            <DropdownMenu.Divider />
                            <DropdownMenu.Link
                                href={route('logout')}
                                method="POST"
                                as="button"
                            >
                                Logout
                            </DropdownMenu.Link>
                        </>
                    ) : (
                        <>
                            <DropdownMenu.Divider />
                            <DropdownMenu.Link href={route('login')}>
                                Login
                            </DropdownMenu.Link>
                            <DropdownMenu.Link href={route('register')}>
                                Register
                            </DropdownMenu.Link>
                        </>
                    )}
                </DropdownMenu>
            </div>
        </nav>
    );
}
