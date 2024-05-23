import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import type { FC } from 'react'
import { createPortal } from 'react-dom'

type PdfPreviewProps = {
    url: string
    onCancel: () => void
}
const PdfPreview: FC<PdfPreviewProps> = ({
    url,
    onCancel,
}) => {
    return createPortal(
        <div className='fixed inset-0 p-8 flex items-center justify-center bg-black/80 z-[1000]' onClick={e => e.stopPropagation()}>
            <object
                className="object-center object-cover w-full h-full flex justify-center items-center"
                type="application/pdf"
                data={url + '#toolbar=0'}
            >
                <img
                    src={
                        'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/833px-PDF_file_icon.svg.png'
                    }
                    alt="PDF file icon"
                    className="w-full "
                />
            </object>
            <div
                className='absolute top-6 right-6 flex items-center justify-center w-8 h-8 bg-white/[0.08] rounded-lg backdrop-blur-[2px] cursor-pointer'
                onClick={onCancel}
            >
                <XClose className='w-4 h-4 text-white' />
            </div>
        </div>,
        document.body,
    )
}

export default PdfPreview
