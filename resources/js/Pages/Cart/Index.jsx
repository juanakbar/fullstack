import React, { Fragment, useState } from 'react';
import App from '@/Layouts/App';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { CheckIcon, ChevronDownIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import { numberFormat } from '@/Libs/Helper';
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';
import { Dialog, Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import axios from 'axios';

export default function Index({ props, carts, auth }) {
    const [open, setOpen] = useState(true)
    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: '',
        name: ''
    });
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    };

    const submit = (e) => {
        e.preventDefault();
        Inertia.post(route('cart.store', product), {
            ...data,

        }, {
            onSuccess: () => toast.success('Product added to cart'),
        });
    };

    const onDeleteHandler = (cart) => {
        Inertia.delete(route('cart.destroy', cart), {
            onSuccess: () => toast.success('Removed')
        })
    }
    let subtotal = carts.reduce((acc, carts) => acc + carts.total, 0)
    let ppn = (11 / 100) * subtotal
    let total = subtotal + ppn
    let name = auth.user.name
    return (
        <>
            <Head title="Your Cart" />
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    {carts.length ? (
                        <>
                            <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                                <section aria-labelledby="cart-heading" className="lg:col-span-7">
                                    <h2 id="cart-heading" className="sr-only">
                                        Items in your shopping cart
                                    </h2>
                                    <ul ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
                                        {carts.map((cart) => (
                                            <li key={cart.id} className="flex py-6 sm:py-10">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={cart.product.picture}
                                                        alt={cart.product.name}
                                                        className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                                                    />
                                                </div>

                                                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                                                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                        <div>
                                                            <div className="flex justify-between">
                                                                <h3 className="text-sm">
                                                                    <a href={`/menu/${cart.product.slug}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                                        {cart.product.name}
                                                                    </a>
                                                                </h3>
                                                            </div>
                                                            <div className="mt-1 flex text-sm">
                                                                <p className="text-gray-500">{cart.product.category.name}</p>
                                                            </div>
                                                            <p className="mt-1 text-sm font-medium text-gray-900">Rp. {numberFormat(cart.price)} x {cart.quantity}</p>
                                                        </div>

                                                        <div className="mt-4 sm:mt-0 sm:pr-9">
                                                            <Label forInput="quantity" value="Total" />

                                                            <Input
                                                                type="text"
                                                                name="quantity"
                                                                value={`Rp. ${numberFormat(cart.total)}`}
                                                                className="mt-1 block w-full"
                                                                handleChange={onHandleChange}
                                                                required
                                                            />

                                                            <InputError message={errors.quantity} className="mt-2" />

                                                            <div className="absolute top-0 right-0">
                                                                <button onClick={() => onDeleteHandler(cart)} type="button" className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500">
                                                                    <span className="sr-only">Remove</span>
                                                                    <XIcon className="h-5 w-5" aria-hidden="true" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                                                        {cart.product.status == 1 ? (
                                                            <ClockIcon className="flex-shrink-0 h-5 w-5 text-gray-300" aria-hidden="true" />
                                                        ) : (
                                                            <CheckIcon className="flex-shrink-0 h-5 w-5 text-green-500" aria-hidden="true" />
                                                        )}
                                                        <span>{cart.product.status == 1 ? 'Out Off stock' : `In Stock`}</span>
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </section>
                                {/* Order summary */}
                                <section
                                    aria-labelledby="summary-heading"
                                    className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
                                >
                                    <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                        Order summary
                                    </h2>

                                    <dl className="mt-6 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <dt className="text-sm text-gray-600">Subtotal</dt>
                                            <dd className="text-sm font-medium text-gray-900">Rp. {numberFormat(subtotal)}</dd>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                            <dt className="flex items-center text-sm text-gray-600">
                                                <span>PPN (11%)</span>
                                                <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                                                    <span className="sr-only">Learn more about how shipping is calculated</span>
                                                    <QuestionMarkCircleIcon className="h-5 w-5" aria-hidden="true" />
                                                </a>
                                            </dt>
                                            <dd className="text-sm font-medium text-gray-900">Rp. {numberFormat(ppn)}</dd>
                                        </div>
                                        <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
                                            <dt className="text-base font-medium text-gray-900">Order total</dt>
                                            <dd className="text-base font-medium text-gray-900">Rp. {numberFormat(total)} </dd>
                                        </div>
                                        <div className="bg-gray-300 w-full block h-px my-2"></div>
                                        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                                            Detail Customer
                                        </h2>
                                        <div className="mt-4">
                                            <Label forInput="name" value="Nama Pemesan" />

                                            <Input
                                                type="text"
                                                name="name"
                                                value={data.name}
                                                className="mt-1 block w-full"
                                                handleChange={onHandleChange}
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                        <div className="mt-4">
                                            <Label forInput="table" value="No. Meja" />

                                            <Input
                                                type="text"
                                                name="table"
                                                value={data.table}
                                                className="mt-1 block w-full"
                                                handleChange={onHandleChange}
                                            />
                                            <InputError message={errors.password} className="mt-2" />
                                        </div>
                                    </dl>

                                    <div className="mt-6 flex justify-end items-center">
                                        {/* <Menu as="div" className="relative inline-block text-left z-10">
                                            <div>
                                                <Menu.Button className="inline-flex w-full bg-indigo-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">
                                                    Payment Method
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
                                                        <Menu.Item >
                                                            {({ active }) => (
                                                                <Link
                                                                    method='post'
                                                                    data={{ carts: carts, total: total, name: data.name, table: data.table, payment_type: 'gopay' }}
                                                                    href={`/invoice`}
                                                                    className={clsx(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    Gopay
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <div className="bg-gray-300 w-full block h-px my-2"></div>
                                                        <Menu.Item >
                                                            {({ active }) => (
                                                                <Link
                                                                    method='post'
                                                                    data={{ carts: carts, total: total, name: data.name, table: data.table, payment_type: 'bank_transfer', bank: 'bca' }}
                                                                    href={`/invoice`}
                                                                    className={clsx(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    BCA Virtual Account
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                        <Menu.Item >
                                                            {({ active }) => (
                                                                <Link
                                                                    method='post'
                                                                    data={{ carts: carts, total: total, name: data.name, table: data.table, payment_type: 'bank_transfer', bank: 'bni' }}
                                                                    href={`/invoice`}
                                                                    className={clsx(
                                                                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                        'block px-4 py-2 text-sm'
                                                                    )}
                                                                >
                                                                    BNI Virtual Account
                                                                </Link>
                                                            )}
                                                        </Menu.Item>
                                                    </div>
                                                </Menu.Items>
                                            </Transition>
                                        </Menu> */}
                                        <a type="button" href="#checkout" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="mr-2 w-5 h-5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
                                            </svg>
                                            Checkout
                                        </a>
                                    </div>
                                </section>
                            </form>
                        </>
                    ) : (
                        <>
                            <Link href={`/menu`}
                                type="button"
                                className=" mt-10 block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <svg
                                    className="mx-auto h-12 w-12 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 48 48"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6"
                                    />
                                </svg>
                                <span className="mt-2 block text-sm font-medium text-gray-900">The cart is currently empty.</span>
                                <span className="mt-2 block text-sm font-medium text-gray-900">Countinue <Link className='text-blue-500'>shopping</Link></span>
                            </Link>
                        </>
                    )}
                </div>
            </div>


            <div className="modal" id="checkout">
                <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <a href='#' class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="crypto-modal">
                        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                        <span class="sr-only">Close modal</span>
                    </a>
                    {/* Modal header */}
                    <div className="py-4 px-6 rounded-t border-b dark:border-gray-600">
                        <h3 className="text-base font-semibold text-gray-900 lg:text-xl dark:text-white">
                            Choose Payment Method
                        </h3>
                    </div>
                    {/* Modal body */}
                    <div className="p-6">
                        <ul className="my-4 space-y-3">
                            <li>
                                <Link
                                    as='button'
                                    method='post'
                                    data={{ carts: carts, total: total, name: data.name, table: data.table, payment_type: 'bank_transfer', bank: 'bca' }}
                                    href={`/invoice`}
                                    className={'w-full bg-gray-100 text-gray-900 block px-4 py-2 text-sm rounded-lg hover:bg-blue-500 hover:text-white'}
                                >
                                    BCA Virtual Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    as='button'
                                    method='post'
                                    data={{ carts: carts, total: total, name: data.name, table: data.table, payment_type: 'bank_transfer', bank: 'bni' }}
                                    href={`/invoice`}
                                    className={'w-full bg-gray-100 text-gray-900 block px-4 py-2 text-sm rounded-lg hover:bg-orange-500 hover:text-white'}
                                >
                                    BNI Virtual Account
                                </Link>
                            </li>
                            <li>
                                <Link
                                    as='button'
                                    method='post'
                                    data={{ carts: carts, total: total, name: data.name, table: data.table, payment_type: 'gopay' }}
                                    href={`/invoice`}
                                    className={'w-full bg-gray-100 text-gray-900 block px-4 py-2 text-sm rounded-lg hover:bg-green-500 hover:text-white'}
                                >
                                    Gopay
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

Index.layout = page => <App children={page} />
