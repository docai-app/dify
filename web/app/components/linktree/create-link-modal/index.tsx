'use client'
import Button from '@/app/components/base/button'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import Modal from '@/app/components/base/modal'
import Toast from '@/app/components/base/toast'
import AppsFull from '@/app/components/billing/apps-full-in-dialog'
import { useProviderContext } from '@/context/provider-context'
import { CubeIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export type CreateLinkModalProps = {
    show: boolean
    isEditModal?: boolean
    appName: string
    appDescription?: string
    onConfirm: (info: {
        name: string,
        description: string
    }) => Promise<void>
    onHide: () => void
}

const CreateLinkModal = ({
    show = false,
    isEditModal = false,
    appName,
    appDescription,
    onConfirm,
    onHide,
}: CreateLinkModalProps) => {
    const { t } = useTranslation()

    const [name, setName] = React.useState(appName)
    const [showEmojiPicker, setShowEmojiPicker] = useState(false)
    const [description, setDescription] = useState(appDescription || '')

    const { plan, enableBilling } = useProviderContext()
    const isAppsFull = (enableBilling && plan.usage.buildApps >= plan.total.buildApps)

    const submit = () => {
        if (!name.trim()) {
            Toast.notify({ type: 'error', message: t('explore.appCustomize.nameRequired') })
            return
        }
        onConfirm({
            name,
            description,
        })
        onHide()
    }

    return (
        <>
            <Modal
                isShow={show}
                onClose={() => { }}
                wrapperClassName='z-40'
                className='relative !max-w-[480px] px-8'
            >
                <div className='absolute right-4 top-4 p-2 cursor-pointer' onClick={onHide}>
                    <XClose className='w-4 h-4 text-gray-500' />
                </div>
                <div className='mb-9 font-semibold text-xl leading-[30px] text-gray-900'>{t('linktree.link_set.edit')}</div>
                <div className='mb-9'>
                    {/* icon & name */}
                    <div className='pt-2'>
                        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{t('linktree.name')}</div>
                        <div className='flex items-center justify-between space-x-2'>
                            <div className='w-10 h-10 items-center flex justify-center bg-green-200 rounded-md' >
                                <CubeIcon className='w-5 h-5 text-blue-600' />
                            </div>
                            <input
                                value={name}
                                onChange={e => setName(e.target.value)}
                                placeholder={t('linktree.name') || ''}
                                className='grow h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs'
                            />
                        </div>
                    </div>
                    {/* description */}
                    <div className='pt-2'>
                        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{t('linktree.input_description')}</div>
                        <textarea
                            className='w-full h-10 px-3 py-2 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs h-[80px] resize-none'
                            placeholder={t('app.newApp.appDescriptionPlaceholder') || ''}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </div>
                    {!isEditModal && isAppsFull && <AppsFull loc='app-explore-create' />}
                </div>
                <div className='flex flex-row-reverse'>
                    <Button disabled={!isEditModal && isAppsFull} className='w-24 ml-2' type='primary' onClick={submit}>{!isEditModal ? t('common.operation.create') : t('common.operation.save')}</Button>
                    <Button className='w-24' onClick={onHide}>{t('common.operation.cancel')}</Button>
                </div>
            </Modal>
        </>

    )
}

export default CreateLinkModal
