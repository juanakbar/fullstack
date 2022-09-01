import React, { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/inertia-react';
import Navbar from './Navbar';
import Footer from '@/Components/Footer';
import { Toaster } from 'react-hot-toast';

export default function App({ auth, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            <Navbar />


            {
                header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )
            }

            <main>{children}
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
            </main>
            <Footer />
        </div >

    );
}
