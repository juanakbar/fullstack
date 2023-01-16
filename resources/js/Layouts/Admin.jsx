import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Header from './Dashboard/Header'
import Income from './Dashboard/Income'
import Sidebar from './Dashboard/Sidebar'

export default function Admin({ children, Banner }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (
        <>
            <div className="bg-white flex h-screen overflow-hidden">
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                    {
                        Banner && (
                            { Banner }
                        )
                    }
                    <main>
                        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
