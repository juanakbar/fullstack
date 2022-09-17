import React from 'react'
import App from '@/Layouts/App'
import { Head, Link, useForm } from '@inertiajs/inertia-react'
import { numberFormat } from '@/Libs/Helper'
import { Inertia } from '@inertiajs/inertia'
import Button from '@/Components/Button'
import Label from '@/Components/Label'
import Input from '@/Components/Input'
import InputError from '@/Components/InputError'
import toast from 'react-hot-toast'

export default function Show({ props, product }) {
    const htmlString = product.description

    const { data, setData, post, processing, errors, reset } = useForm({
        quantity: '',
    })
    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
    }

    const submit = (e) => {
        e.preventDefault()
        Inertia.post(route('cart.store', product), {
            ...data,

        }, {
            onSuccess: () => toast.success('Product added to cart'),
        })
    }
    return (
        <>
            <Head title={product.name} />
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
                    {/* Product details */}
                    <div className="lg:max-w-lg lg:self-end">
                        <nav aria-label="Breadcrumb">
                            <ol role="list" className="flex items-center space-x-2">
                                <li>
                                    <div className="flex items-center text-sm">
                                        <Link href={route('menu.index')} className="font-medium text-gray-500 hover:text-gray-900"> Menu </Link>
                                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300">
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center text-sm">
                                        <Link href={`/menu?category=${product.category.slug}`} className="font-medium text-gray-500 hover:text-gray-900"> {product.category.name} </Link>
                                        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300">
                                            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                        </svg>
                                    </div>
                                </li>
                                <li>
                                    <div className="flex items-center text-sm">
                                        <a href="#" className="font-medium text-gray-500 hover:text-gray-900"> {product.name} </a>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className="mt-4">
                            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">{product.name}</h1>
                        </div>
                        <section aria-labelledby="information-heading" className="mt-4">
                            <h2 id="information-heading" className="sr-only">Product information</h2>
                            <div className="flex items-center">
                                <p className="text-lg text-gray-900 sm:text-xl mr-3">Rp. {numberFormat(product.price)} </p>
                            </div>
                            <div className="mt-4 space-y-6">
                                <div className="text-base leading-relaxed text-gray-500" dangerouslySetInnerHTML={{ __html: htmlString }} />
                            </div>
                            <div className="mt-6 flex items-center">
                                {/* Heroicon name: solid/check */}
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <p className="ml-2 text-sm text-gray-500">In stock</p>
                            </div>
                        </section>
                    </div>
                    <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
                        <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-xl">
                            <img src={product.picture} alt={product.name} className="w-full h-full object-center object-cover" />
                        </div>
                    </div>
                    {/* Product form */}
                    <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
                        <section aria-labelledby="options-heading">
                            <h2 id="options-heading" className="sr-only">Product options</h2>
                            <form onSubmit={submit}>
                                <div className="sm:flex sm:justify-between">
                                    <div className="mt-4">
                                        <Label forInput="quantity" value="Quantity" />

                                        <Input
                                            type="number"
                                            name="quantity"
                                            value={data.quantity}
                                            className="mt-1 block w-full"
                                            handleChange={onHandleChange}
                                            required
                                        />
                                        <InputError message={errors.email} className="mt-2" />
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <Button type='submit' className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500">Add to cart</Button>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>

        </>
    )
}

Show.layout = page => <App children={page} />
