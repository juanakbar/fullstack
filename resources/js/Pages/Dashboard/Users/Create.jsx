import React, { useEffect } from 'react'
import Button from '@/Components/Button'
import Guest from '@/Layouts/Guest'
import Input from '@/Components/Input'
import InputError from '@/Components/InputError'
import Label from '@/Components/Label'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import Admin from '@/Layouts/Admin'
import {Editor} from "@tinymce/tinymce-react";

export default function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation')
        }
    }, [])

    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        post(route('users.store'))
    }

    return (
        <>
            <Head title="Register" />
            <form className="space-y-8 divide-y divide-gray-200" onSubmit={submit}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div className="space-y-6 sm:pt-10 sm:space-y-5">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Information</h3>
                        </div>
                        <div className="space-y-6 sm:space-y-5">
                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="name"
                                       className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Name
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={onHandleChange}
                                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            onChange={onHandleChange}
                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                            placeholder="www.example.com"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="mt-1 flex rounded-md shadow-sm">

                                        <input
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            onChange={onHandleChange}
                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div
                                className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="mt-1 flex rounded-md shadow-sm">

                                        <input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={onHandleChange}
                                            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button

                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </>


    )
}

Create.layout = page => <Admin children={page} />
