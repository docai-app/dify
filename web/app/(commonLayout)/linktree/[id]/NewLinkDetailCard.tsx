'use client'

import { FilePlus01 } from '@/app/components/base/icons/src/vender/line/files'
import { ToastContext } from '@/app/components/base/toast'
import CreateLinkDetailModal, { CreateLinkDetailModalProps } from '@/app/components/linktree/create-link-detail-modal'
import { createLink } from '@/service/linktree'
import { useParams } from 'next/navigation'
import { forwardRef, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'

export type CreateLinkDetailCardProps = {
    onSuccess?: () => void
}

// eslint-disable-next-line react/display-name
const NewLinkDetailCard = forwardRef<HTMLAnchorElement, CreateLinkDetailCardProps>(({ onSuccess }, ref) => {
    const { t } = useTranslation()
    const { id } = useParams()
    const { notify } = useContext(ToastContext)
    const [showNewLinkModal, setShowNewLinkModal] = useState(false)

    const onEdit: CreateLinkDetailModalProps['onConfirm'] = useCallback(async ({
        title,
        url,
        is_required_time_limit
    }) => {
        try {
            const res = await createLink({
                id: id,
                title: title,
                url: url,
                meta: {
                    is_required_time_limit: is_required_time_limit
                }
            })
            setShowNewLinkModal(false)
            if (res.success) {
                notify({
                    type: 'success',
                    message: t('app.editDone'),
                })
                if (onSuccess)
                    onSuccess()
            } else {
                notify({
                    type: 'error',
                    message: '請輸入正確的連結',
                })
            }
        }
        catch (e) {
            notify({ type: 'error', message: t('app.editFailed') })
        }
    }, [])

    return (
        <a
            ref={ref}
            className='relative col-span-1 flex flex-col justify-between min-h-[160px] bg-gray-200 rounded-xl border-[0.5px] border-black/5'
        >
            <div className='grow p-2 rounded-t-xl'>
                <div className='px-6 pt-2 pb-1 text-xs font-medium leading-[18px] text-gray-500'>{"創建連結"}</div>
                <div className='flex items-center mb-1 px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-gray-600 cursor-pointer hover:text-primary-600 hover:bg-white' onClick={() => setShowNewLinkModal(true)}>
                    <FilePlus01 className='shrink-0 mr-2 w-4 h-4' />
                    {"創建空白連結"}
                </div>
            </div>
            <CreateLinkDetailModal
                isEditModal
                appName={''}
                appDescription={''}
                appIs_required_time_limit={false}
                show={showNewLinkModal}
                onConfirm={onEdit}
                onHide={() => setShowNewLinkModal(false)}
            />
        </a>
    )
})

export default NewLinkDetailCard
