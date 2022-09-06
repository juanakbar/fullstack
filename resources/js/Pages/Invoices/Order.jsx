import React from 'react';
import App from '@/Layouts/App';
import { Head } from '@inertiajs/inertia-react';
import { numberFormat } from '@/Libs/Helper';

export default function Order({invoices,props}) {
    // const {data: invoices, meta, links} = props.invoices;
    console.log(invoices);
    return (
        <>
            <Head title="Your Order" />
            <div className='container mx-auto min-h-screen mt-10'>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Your Order</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the Order in your account.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                    Nama Pemesan
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Meja
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Menu
                                                </th>
                                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                    Total
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                            {invoices.length ? <>
                                                {invoices.map(invoice => (
                                                <tr key={invoice.id}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        {invoice.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.table}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{invoice.cart_ids}</td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Rp. {numberFormat(invoice.gross_amount)}</td>
                                                </tr>
                                            ))}
                                            </> : <>
                                            No Item
                                            </>}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

Order.layout = page => <App children={page} />
