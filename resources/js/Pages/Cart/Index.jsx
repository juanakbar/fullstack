import React, { Fragment } from 'react';
import App from '@/Layouts/App';
import { Head, Link, useForm } from '@inertiajs/inertia-react';
import { CheckIcon, ChevronDownIcon, ClockIcon, QuestionMarkCircleIcon, XIcon } from '@heroicons/react/solid'
import Label from '@/Components/Label';
import Input from '@/Components/Input';
import InputError from '@/Components/InputError';
import { numberFormat } from '@/Libs/Helper';
import { Inertia } from '@inertiajs/inertia';
import toast from 'react-hot-toast';
import Dropdown from '@/Components/Dropdown';
import DropdownMenu from '@/Components/DropdownMenu';
import { Menu, Transition } from '@headlessui/react';
import clsx from 'clsx';

export default function Index({ props, carts }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: '',
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
    return (
        <>
            <Head title="Your Cart" />
            <div className="bg-white">
                <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>
                    <form className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
                        <section aria-labelledby="cart-heading" className="lg:col-span-7">
                            <h2 id="cart-heading" className="sr-only">
                                Items in your shopping cart
                            </h2>

                            <ul role="list" className="border-t border-b border-gray-200 divide-y divide-gray-200">
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
                            </dl>

                            <div className="mt-6 flex justify-end items-center">
                                <Menu as="div" className="relative inline-block text-left z-10">
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
                                                            href={`/`}
                                                            className={clsx(
                                                                active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                                                'block px-4 py-2 text-sm'
                                                            )}
                                                        >
                                                            Gopay
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                            </div>
                        </section>
                    </form>
                </div>
            </div>
        </>
    );
}

Index.layout = page => <App children={page} />
