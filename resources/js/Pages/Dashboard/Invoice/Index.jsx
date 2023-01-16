import React from 'react'
import Admin from '@/Layouts/Admin'
import { Head, Link } from '@inertiajs/inertia-react'
import { numberFormat } from '@/Libs/Helper'
import Pagination from '@/Components/Pagination'

export default function Index({ ...props }) {
    const { data: invoice, meta, links } = props.invoice
    return (
        <>
            <Head title="All Invoice" />

            <div className='container mx-auto min-h-screen mt-10'>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="sm:flex sm:items-center">
                        <div className="sm:flex-auto">
                            <h1 className="text-xl font-semibold text-gray-900">Your Invoice</h1>
                            <p className="mt-2 text-sm text-gray-700">
                                A list of all the Invoices in your account.
                            </p>
                        </div>
                    </div>
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="py-3 px-6">
                                                    Order ID
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    Nama Pemesan
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    No. Meja
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    Payment
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    Total
                                                </th>
                                                <th scope="col" class="py-3 px-6">
                                                    <span class="sr-only">Show</span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {invoice.map(item => (
                                                <tr key={item.key} class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                                        {item.order_id}
                                                    </th>
                                                    <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                                        {item.name}
                                                    </td>
                                                    <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                                        {item.table}
                                                    </td>
                                                    <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                                        {item.payment_info.bank.name}
                                                    </td>
                                                    <td class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase ">
                                                        Rp. {numberFormat(item.gross_amount)}
                                                    </td>
                                                    <td class="py-4 px-6 text-right font-medium text-gray-900 whitespace-nowrap dark:text-white uppercase">
                                                        <Link href={route('invoice.receipt', item)} class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show</Link>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

Index.layout = page => <Admin children={page} />
