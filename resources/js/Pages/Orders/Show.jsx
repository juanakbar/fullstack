import React from 'react';
import App from '@/Layouts/App';
import { Head } from '@inertiajs/inertia-react';
import Logo from '/public/img/Logo.png';
import { numberFormat } from '@/Libs/Helper';

export default function Show({ orderedBy }) {
    let subtotal = orderedBy.reduce((acc, orderedBy) => acc + orderedBy.cart.total, 0)
    let ppn = (11 / 100) * subtotal
    let total = subtotal + ppn
    console.log(orderedBy);
    return (
        <>
            <Head title="Invoice - `${orderid}`" />
            <div className="container mx-auto py-2 min-h-screen ">
                {orderedBy.length > 0 ? (
                    <>
                        <table className="relative flex justify-center" aria-labelledby="pricing-heading" key={orderedBy.id}>
                            <h2 id="pricing-heading" className="sr-only">Pricing</h2>
                            {/* Tiers */}
                            <div className="max-w-2xl mx-auto px-4 space-y-12 sm:px-6 lg:max-w-7xl lg:space-y-0 lg:px-8 lg:grid lg:grid-cols-3 lg:gap-x-8">
                                <div className="relative p-8 bg-white border border-gray-200 rounded-2xl shadow-sm flex flex-col">
                                    <div className="flex-1">
                                        <div className='flex justify-center items-center'>
                                            <img src={Logo} alt="" className='w-16 h-16' />
                                            <h3 className="text-xl font-semibold text-gray-900 text-center">Kedai Gambling</h3>
                                        </div>
                                        <p className="text-gray-500 text-center">Alamat</p>
                                        <div className="border-dashed border-2 border-gray-400 rounded-md flex justify-between px-4 text-sm">
                                            <div>Order-Id : </div>
                                            <div>{orderedBy[0].order_id}</div>
                                        </div>
                                        <div className="mt-5 flex justify-between px-4 text-sm">
                                            <div>Customer Name : </div>
                                            <div>{orderedBy[0].invoice.name}</div>
                                        </div>
                                        <div className="mt-2 flex justify-between px-4 text-sm">
                                            <div>Customer Table : </div>
                                            <div>{orderedBy[0].invoice.table}</div>
                                        </div>
                                        <div className="mt-2 flex justify-between px-4 text-sm">
                                            <div>Payment Type : </div>
                                            <div className='uppercase'>{orderedBy[0].invoice.bank.name}</div>
                                        </div>
                                        <div className="border-b mt-5 border-dashed border-gray-400 rounded-lg flex justify-between px-4 mb-5" />

                                        {/* Feature list */}
                                        <thead className='border-b mt-5 border-dashed border-gray-400'>
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">qty</th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Name</th>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Price</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {orderedBy.map(cart => (
                                                <tr>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{cart.cart.quantity}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{cart.product.name}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{numberFormat(cart.cart.total)}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                        <div className="border-b mt-5 border-dashed border-gray-400 rounded-lg flex justify-between px-4 mb-5" />
                                        <div className="mt-5 flex justify-between px-4 text-sm">
                                            <div>Amount : </div>
                                            <div>Rp. {numberFormat(subtotal)}</div>
                                        </div>
                                        <div className="mt-2 flex justify-between px-4 text-sm">
                                            <div>PPN(11%) : </div>
                                            <div>Rp. {numberFormat(ppn)}</div>
                                        </div>
                                        <div className="mt-2 flex justify-between px-4 text-sm">
                                            <div>Total : </div>
                                            <div>Rp. {numberFormat(total)}</div>
                                        </div>
                                        <div className="border-b mt-5 border-dashed border-gray-400 rounded-lg flex justify-between px-4 mb-5" />
                                        <div className='font-semibold text-center'>Thank You!</div>
                                    </div>
                                </div>
                            </div>
                        </table>
                    </>) : (<>No item</>)}

            </div>

        </>
    );
}

Show.layout = page => <App children={page} />
