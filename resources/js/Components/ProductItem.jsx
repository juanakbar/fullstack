import { numberFormat } from '@/Libs/Helper'
import { Link } from '@inertiajs/inertia-react'
import React from 'react'

export default function ProductItem({ product }) {
    return (
        <>
            <div className="relative group">
                <div className="aspect-w-4 aspect-h-3 rounded-lg overflow-hidden bg-gray-100">
                    <img src={product.picture} alt={product.name} className="object-center object-cover" />
                    <div className="flex items-end opacity-0 p-4 group-hover:opacity-100" aria-hidden="true">
                        <Link className="w-full bg-gray-900 bg-opacity-75 backdrop-filter backdrop-blur py-2 px-4 rounded-md text-sm font-medium text-gray-50 text-center">View Product</Link>
                    </div>
                </div>
                <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900 space-x-8">
                    <h3>
                        <Link href={route('menu.show', { product })}>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.name}
                        </Link>
                    </h3>
                    <p>Rp. {numberFormat(product.price)}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
            </div>
        </>
    )
}
