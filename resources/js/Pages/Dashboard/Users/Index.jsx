import React from 'react'
import Admin from '@/Layouts/Admin'
import { Head, Link } from '@inertiajs/inertia-react'
import NavLink from '@/Components/NavLink'
import { PencilAltIcon, TrashIcon } from '@heroicons/react/solid'

export default function Index({ customers, ...props }) {
    return (
        <>
            <Head title="Users"/>

            {customers.length ?
                (
                    <>
                        <div
                            className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-xl border border-slate-200">
                            <header className="px-5 py-4 border-b border-slate-100 flex justify-between">
                                <h2 className="font-semi-bold text-slate-800">User</h2>
                                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                                    <Link
                                        href={route('users.create')}
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                    >
                                        Add User
                                    </Link>
                                </div>
                            </header>
                            <div className="p-3">

                                {/* Table */}
                                <div className="overflow-x-auto">
                                    <table className="table-auto w-full">
                                        {/* Table header */}
                                        <thead className="text-xs font-semi-bold uppercase text-slate-400 bg-slate-50">
                                        <tr>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semi-bold text-left">Name</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semi-bold text-left">Email</div>
                                            </th>
                                            <th className="p-2 whitespace-nowrap">
                                                <div className="font-semi-bold text-left">Action</div>
                                            </th>
                                        </tr>
                                        </thead>
                                        {/* Table body */}
                                        <tbody className="text-sm divide-y divide-slate-100">
                                        {
                                            customers.map(customer => {
                                                return (
                                                    <tr key={customer.id}>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="flex items-center">
                                                                <div className="w-10 h-10 shrink-0 mr-2 sm:mr-3">
                                                                    <img className="rounded-full"
                                                                         src={`https://ui-avatars.com/api/name=${customer.name}?background=random`}
                                                                         width="40" height="40" alt={customer.name}/>
                                                                </div>
                                                                <div
                                                                    className="font-medium text-slate-800">{customer.name}</div>
                                                            </div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left">{customer.email}</div>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <div className="text-left">
                                                                <NavLink>
                                                                    <PencilAltIcon className='w-6 h-6'/>
                                                                </NavLink>
                                                                <NavLink href={route('users.destroy', customer.id)}>
                                                                    <TrashIcon className='w-6 h-6 text-red-600'/>
                                                                </NavLink>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>

                                </div>

                            </div>
                        </div>
                    </>
                )
                : (

                    <div className="text-center">
                        <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/>
                        </svg>

                        <h3 className="mt-2 text-sm font-medium text-gray-900">No Item</h3>
                    </div>

                )
            }
        </>
    );
}

Index.layout = page => <Admin children={page} />
