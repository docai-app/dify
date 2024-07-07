/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import Input from '../input';
import Toast from '../toast';

export default function InputNameModal(props: any) {
    const cancelButtonRef = useRef(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (props.content) {
            setContent(props.content);
        }
    }, [props]);
    const validate = () => {
        if (!content) return Toast.notify({ type: 'info', message: 'Please enter file name' });
        props.confirmClick(content);
    };

    return (
        <Transition.Root show={props.visable || false} as={Fragment}>
            <Dialog
                as="div"
                className="fixed z-10 inset-0 overflow-y-auto"
                initialFocus={cancelButtonRef}
                onClose={props.cancelClick}
            >
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span
                        className="hidden sm:inline-block sm:align-middle sm:h-screen"
                        aria-hidden="true"
                    >
                        &#8203;
                    </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="relative inline-block align-center bg-white rounded-lg px-4 pt-0 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="sm:flex sm:items-center justify-center">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <div className="mt-2">
                                        <p className="text-xl text-black">{props.description}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-4">
                                <div className=' flex justify-start'>
                                    <label className="text-left">File name:</label>
                                </div>
                                <Input
                                    value={content}
                                    onChange={(value) => {
                                        setContent(value);
                                    }} />
                            </div>
                            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse justify-center">
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm mx-2 px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        validate();
                                    }}
                                >
                                    {props.confirmText || 'Confirm'}
                                </button>

                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm mx-2 px-4 py-2 bg-red-500 text-base font-medium text-white hover:bg-red-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:white sm:mt-0 sm:w-auto sm:text-sm"
                                    onClick={() => {
                                        props.cancelClick();
                                    }}
                                    ref={cancelButtonRef}
                                >
                                    {props.cancelText || 'Cancel'}
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
