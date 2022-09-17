import React from 'react'

export default function Income() {
    return (
        <div className="col-span-full xl:col-span-6 bg-white shadow-lg rounded-xl border border-slate-200">
            <header className="px-5 py-4 border-b border-slate-100">
                <h2 className="font-semibold text-slate-800">Income/Expenses</h2>
            </header>
            <div className="p-3">
                <div>
                    <header className="text-xs uppercase text-slate-400 bg-slate-50 rounded-sm font-semibold p-2">Today</header>
                    <ul className="my-1">
                        {/* Item */}
                        <li className="flex px-2">
                            <div className="w-9 h-9 rounded-full shrink-0 bg-rose-500 my-2 mr-3">
                                <svg className="w-9 h-9 fill-current text-rose-50" viewBox="0 0 36 36">
                                    <path d="M17.7 24.7l1.4-1.4-4.3-4.3H25v-2H14.8l4.3-4.3-1.4-1.4L11 18z" />
                                </svg>
                            </div>
                            <div className="grow flex items-center border-b border-slate-100 text-sm py-2">
                                <div className="grow flex justify-between">
                                    <div className="self-center"><a className="font-medium text-slate-800 hover:text-slate-900" href="#0">Qonto</a> billing</div>
                                    <div className="shrink-0 self-start ml-2">
                                        <span className="font-medium text-slate-800">-$49.88</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
