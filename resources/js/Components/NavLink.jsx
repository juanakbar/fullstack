import { Link } from '@inertiajs/inertia-react';
import clsx from 'clsx';
import React from 'react';

export default function NavLink({ active = false, children, className, ...props }) {
    return (
        <Link
            className={clsx(
                active && 'text-white md:text-blue-700 md:p-0 hover:text-gray-600',
                'inline-block rounded px-4 text-gray-400' + className
            )}
            {...props}
        >
            {children}
        </Link>
    );
}
