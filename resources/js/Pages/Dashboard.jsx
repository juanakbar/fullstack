import React from 'react'
import { Head } from '@inertiajs/inertia-react'
import Admin from '@/Layouts/Admin'
import WelcomeBanner from '@/Layouts/Dashboard/WelcomeBanner'
import Income from '@/Layouts/Dashboard/Income'
import Customer from '@/Layouts/Dashboard/Customer'

export default function Dashboard({ customers, ...props }) {
    // const { data: customers, meta, links } = props.customers
    // console.log(customers)
    return (
        <>
            <Head title="Dashboard" />

            <div className="grid grid-cols-12 gap-6">
                <Income />
            </div>
        </>
    )
}

Dashboard.layout = (page) => <Admin children={page} />
