import React, { useRef } from 'react'
import Admin from '@/Layouts/Admin'
import { Head, useForm, usePage } from '@inertiajs/inertia-react'
import { Inertia } from '@inertiajs/inertia'
import { Editor } from '@tinymce/tinymce-react'

export default function Create({ product, category }) {
    console.log(category);
    console.log(product);
    const { data, setData, errors } = useForm({
        name: product.name,
        price: product.price,
        category_id: product.category_id,
        description: product.description,
        picture: product.picture,
        status: product.status,
    });

    const editorRef = useRef(null)


    const onHandleChange = (event) => {
        setData(event.target.name, event.target.type === 'checkbox' ? event.target.checked : event.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        Inertia.post(route('products.update', product.slug), {
            ...data,
            _method: 'PUT',
            // category_id: category.id
        });
    }
    return (
        <>
            <Head title="Edit Product" />
            <form className="space-y-8 divide-y divide-gray-200" onSubmit={onSubmit}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div className="space-y-6 sm:pt-10 sm:space-y-5">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">Product Information</h3>
                        </div>
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Product Name
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

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                    Price
                                </label>
                                <div className="mt-1 relative rounded-md shadow-sm">
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                            Rp.
                                        </span>
                                        <input
                                            type="text"
                                            name="price"
                                            value={data.price}
                                            onChange={onHandleChange}
                                            className="flex-1 min-w-0 block max-w-lg rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                            placeholder="www.example.com"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Category
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        name="category_id"
                                        value={data.category_id}
                                        onChange={onHandleChange}
                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option selected>{product.category.name}</option>
                                        {category.map(category => (
                                            <option category={category} value={category.id}
                                                onChange={onHandleChange}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 border-t border-gray-200 pt-5">
                                <label htmlFor="description" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Description
                                </label>
                                <div className='items-start mt-3'>
                                    <Editor
                                        value={data.description}
                                        onEditorChange={(content, editor) => {
                                            setData('description', content)
                                        }}
                                        apiKey='moepazaeowxvvlmqfwx11o5clw1au584q8wq0gmpa10ng4c2'
                                        onInit={(evt, editor) => editorRef.current = editor}
                                        init={{
                                            height: 500,
                                            menubar: false,
                                            plugins: [
                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount'
                                            ],
                                            toolbar: 'undo redo | blocks | ' +
                                                'bold italic forecolor | alignleft aligncenter ' +
                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                'removeformat | help',
                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                        }}
                                    />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-1 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    htmlFor='picture'>
                                    Upload file
                                </label>
                                <input
                                    class="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                    name='picture'
                                    type="file"
                                    id='picture'
                                    onChange={(e) => setData('picture', e.target.files[0])}
                                />
                                <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="picture">
                                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                                </p>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label htmlFor="status" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                                    Status
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        id="status"
                                        name="status"
                                        value={data.status}
                                        onChange={onHandleChange}
                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option selected>Select Status</option>
                                        <option value={1}>Tersedia</option>
                                        <option value={0}>Tidak Tersedia</option>
                                    </select>
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
                            type="submit"
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
