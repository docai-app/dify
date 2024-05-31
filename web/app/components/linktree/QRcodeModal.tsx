/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from '@headlessui/react';
import { ClipboardDocumentIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { toPng } from 'html-to-image';
import QRCode from 'qrcode.react';
import { Fragment, useRef } from 'react';

export default function QRcodeModal(props: any) {
    const cancelButtonRef = useRef(null);
    const downloadQRCode = async () => {
        const qrcode = document.getElementById('qr-code');
        if (qrcode) {
            const png = await toPng(qrcode);
            const link = document.createElement('a');
            link.download = 'qr-code.png';
            link.href = png;
            link.click();
        }
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
                        <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-center overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                            <div className="flex items-center justify-end">
                                <XMarkIcon className=' text-gray-600 hover:text-gray-400 w-6' onClick={props.cancelClick} />
                            </div>
                            <div className="w-full mt-4">
                                <div className="w-full">
                                    <div
                                        id="qr-code"
                                        className="w-full flex flex-col items-center p-4"
                                    >
                                        <QRCode value={props.link} size={200} />
                                        <p className="text-md my-2">{props.name}</p>
                                        <p className="text-md text-gray-500">{props?.title}</p>
                                    </div>
                                    <button
                                        type="button"
                                        className="hidden w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => {
                                            downloadQRCode();
                                        }}
                                    >
                                        {'Download QR Code'}
                                    </button>
                                    <div className="w-full flex justify-center items-center mt-4">
                                        <div className=" w-full sm:w-3/4 flex items-center rounded-md shadow-sm">
                                            <div className="relative flex items-stretch flex-grow focus-within:z-10">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <LinkIcon
                                                        className="h-5 w-5 text-gray-400"
                                                        aria-hidden="true"
                                                    />
                                                </div>
                                                <input
                                                    type={'url'}
                                                    value={props.link}
                                                    readOnly
                                                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md pl-10 sm:text-sm border-gray-300"
                                                    placeholder={props.link}
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                                                onClick={() => {
                                                    copy(props.link);
                                                    // setAlert({
                                                    //     title: '已複製到粘貼板',
                                                    //     type: 'success'
                                                    // });
                                                }}
                                            >
                                                <ClipboardDocumentIcon
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                                <span>Copy</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
}
