'use client'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import LogoSite from '@/app/components/base/logo/logo-site'
import Modal from '@/app/components/base/modal'
import { useTranslation } from 'react-i18next'
import s from './index.module.css'

type IAccountSettingProps = {
    onCancel: () => void
}
const buttonClassName = `
shrink-0 flex items-center h-8 px-3 rounded-lg border border-gray-200
text-xs text-gray-800 font-medium
`
export default function AccountHelp({
    onCancel,
}: IAccountSettingProps) {
    const { t } = useTranslation()

    return (
        <Modal
            isShow
            onClose={() => { }}
            className={s.modal}
        >
            <div className='relative pt-4'>
                <div className='absolute -top-2 -right-4 flex justify-center items-center w-8 h-8 cursor-pointer' onClick={onCancel}>
                    <XClose className='w-4 h-4 text-gray-500' />
                </div>
                <div>
                    <LogoSite className='mx-auto mb-2' />
                    <div className='mb-3 text-center text-xs font-normal text-gray-500'>Help </div>
                    <div className='mb-4 text-center text-xs font-normal text-gray-700'>
                        <div>請電郵至support@hospidocai.com</div>
                    </div>
                </div>
                <div className='mb-4 -mx-8 h-[0.5px] bg-gray-200' />
            </div>
        </Modal>
    )
}
