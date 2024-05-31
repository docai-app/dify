'use client'

import { FilePlus01 } from '@/app/components/base/icons/src/vender/line/files'
import { ToastContext } from '@/app/components/base/toast'
import CreateLinkModal, { CreateLinkModalProps } from '@/app/components/linktree/create-link-modal'
import { useProviderContext } from '@/context/provider-context'
import { createLinkSet } from '@/service/linktree'
import { forwardRef, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'

export type CreateLinkCardProps = {
    onSuccess?: () => void
}

// eslint-disable-next-line react/display-name
const NewLinkCard = forwardRef<HTMLAnchorElement, CreateLinkCardProps>(({ onSuccess }, ref) => {
    const { t } = useTranslation()
    const { onPlanInfoChanged } = useProviderContext()
    const { notify } = useContext(ToastContext)

    const [showNewLinkModal, setShowNewLinkModal] = useState(false)

    const onEdit: CreateLinkModalProps['onConfirm'] = useCallback(async ({
        name,
        description,
    }) => {
        try {
            await createLinkSet({
                name: name,
                description: description
            })
            setShowNewLinkModal(false)
            notify({
                type: 'success',
                message: t('app.editDone'),
            })
            if (onSuccess)
                onSuccess()
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
                <div className='px-6 pt-2 pb-1 text-xs font-medium leading-[18px] text-gray-500'>{"創建AI Apps"}</div>
                <div className='flex items-center mb-1 px-6 py-[7px] rounded-lg text-[13px] font-medium leading-[18px] text-gray-600 cursor-pointer hover:text-primary-600 hover:bg-white' onClick={() => setShowNewLinkModal(true)}>
                    <FilePlus01 className='shrink-0 mr-2 w-4 h-4' />
                    {"創建空白AI Apps"}
                </div>
            </div>
            <CreateLinkModal
                isEditModal
                appName={''}
                appDescription={''}
                show={showNewLinkModal}
                onConfirm={onEdit}
                onHide={() => setShowNewLinkModal(false)}
            />
        </a>
    )
})

export default NewLinkCard
