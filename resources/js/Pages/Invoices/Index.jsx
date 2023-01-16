import React from 'react';
import App from '@/Layouts/App';
import Logo from '/public/img/Logo.png';
import { Head } from '@inertiajs/inertia-react';
import { numberFormat } from '@/Libs/Helper';

export default function Index({ props, invoice}) {
    console.log(invoice);
    return (
        <>
            <Head title="Your Invoices " />

            <div className='min-w-xl min-h-screen p-4'>
                <div className="invoice-box">
                    <table cellSpacing={0} cellPadding={0}>
                        <tbody><tr className="top">
                            <td colSpan={2}>
                                <table>
                                    <tbody><tr>
                                        <td className="title">
                                            <img src={Logo} style={{ width: '100%', maxWidth: '300px' }} />
                                        </td>
                                        <td>
                                            Invoice #: {invoice.order_id}<br />
                                            Created: January 1, 2015<br />
                                            Due: February 1, 2015
                                        </td>
                                    </tr>
                                    </tbody></table>
                            </td>
                        </tr>
                            <tr className="information">
                                <td colSpan={2}>
                                    <table>
                                        <tbody><tr>
                                            <td>
                                                Keda Gambling, Inc.<br />
                                                Jln. Pesantren<br />
                                            </td>
                                            <td>
                                                {invoice.name}<br />
                                            </td>
                                        </tr>
                                        </tbody></table>
                                </td>
                            </tr>
                            <tr className="heading">
                                <td>Payment Method</td>
                                <td className='uppercase'>{invoice.payment_info.bank.name} #</td>
                            </tr>
                            <tr className="details">
                                <td className='uppercase'>{invoice.payment_info.bank.name}</td>
                                <td>Rp. {numberFormat(invoice.gross_amount)}</td>
                            </tr>
                            <tr className="heading">
                                <td>Item</td>
                                <td>Price</td>
                            </tr>
                            <tr className="item">
                                <td>Website design</td>
                                <td>$300.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

Index.layout = page => <App children={page} />
