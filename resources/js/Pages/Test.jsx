import React from 'react'

export default function Test(order) {
    return (
        <>
            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
                {order.map(order => (
                    <li key={order.id} order={order} />
                ))}
            </div>
        </>
    )
}
