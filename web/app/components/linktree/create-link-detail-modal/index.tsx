'use client'
import Button from '@/app/components/base/button'
import { XClose } from '@/app/components/base/icons/src/vender/line/general'
import Modal from '@/app/components/base/modal'
import Toast from '@/app/components/base/toast'
import { AppListResponse } from '@/models/app'
import { fetchAppDetail, fetchAppList } from '@/service/apps'
import { App } from '@/types/app'
import { CheckCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { LinkIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import useSWRInfinite from 'swr/infinite'
import FeatureItem from '../../app/configuration/config/feature/choose-feature/feature-item'

export type CreateLinkDetailModalProps = {
    show: boolean
    isEditModal?: boolean
    appName: string
    appDescription: string,
    appIs_required_time_limit?: boolean,
    appTimeLimit?: number,
    onConfirm: (info: {
        title: string,
        url: string,
        is_required_time_limit: boolean
        time_limit: number
    }) => Promise<void>
    onHide: () => void
}

const getKey = (
    pageIndex: number,
    previousPageData: AppListResponse
) => {
    if (!pageIndex || previousPageData.has_more) {
        const params: any = { url: 'apps', params: { page: pageIndex + 1, limit: 30, name: '' } }
        return params
    }
    return null
}

const CreateLinkDetailModal = ({
    show = false,
    isEditModal = false,
    appName,
    appDescription,
    appIs_required_time_limit,
    appTimeLimit,
    onConfirm,
    onHide,
}: CreateLinkDetailModalProps) => {
    const { t } = useTranslation()
    const anchorRef = useRef<HTMLDivElement>(null)

    const [title, setTitle] = React.useState(appName)
    const [url, setUrl] = useState(appDescription || '')
    const [is_required_time_limit, set_is_required_time_limit] = useState(appIs_required_time_limit || false)
    const [time_limit, setTimeLimit] = useState<any>(appTimeLimit || 5)


    const { data, isLoading, setSize, mutate } = useSWRInfinite(
        (pageIndex: number, previousPageData: AppListResponse) => getKey(pageIndex, previousPageData),
        fetchAppList,
        { revalidateFirstPage: true },
    )

    const hasMore = data?.at(-1)?.has_more ?? true
    useEffect(() => {
        let observer: IntersectionObserver | undefined
        if (anchorRef.current) {
            observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !isLoading && hasMore)
                    setSize((size: number) => size + 1)
            }, { rootMargin: '100px' })
            observer.observe(anchorRef.current)
        }
        return () => observer?.disconnect()
    }, [anchorRef])

    const submit = () => {
        if (!title.trim()) {
            Toast.notify({ type: 'error', message: t('explore.appCustomize.nameRequired') })
            return
        }
        onConfirm({
            title,
            url,
            is_required_time_limit,
            time_limit
        })
        onHide()
    }

    const handleClickApp = (app: App) => {
        setTitle(app.name)
        setUrl('')
        fetchAppDetail({ url: '/apps', id: app.id }).then(async (res: any) => {
            setUrl(`${window.location.hostname}/chat/${res.site.code || res.site.access_token}`)
        })
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
                <div className='mb-9 font-semibold text-xl leading-[30px] text-gray-900'>{t('linktree.link.edit')}</div>
                <div className='mb-9'>
                    {/* icon & name */}
                    <div className='pt-2'>
                        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{t('linktree.name')}</div>
                        <div className='flex items-center justify-between space-x-2'>
                            <div className='w-10 h-10 items-center flex justify-center bg-green-200 rounded-md' >
                                <LinkIcon className='w-5 h-5 text-blue-600' />
                            </div>
                            <input
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder={t('linktree.name') || ''}
                                className='grow h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs'
                            />
                        </div>
                    </div>
                    {/* description */}
                    <div className='pt-2'>
                        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{t('linktree.link.title')}</div>
                        <input
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                            placeholder={t('linktree.link.title') || ''}
                            className='w-full grow h-10 px-3 text-sm font-normal bg-gray-100 rounded-lg border border-transparent outline-none appearance-none caret-primary-600 placeholder:text-gray-400 hover:bg-gray-50 hover:border hover:border-gray-300 focus:bg-gray-50 focus:border focus:border-gray-300 focus:shadow-xs'
                        />
                    </div>
                    <div className='pt-2'>
                        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{`Select Apps`}</div>
                        <div className='max-h-[300px] overflow-auto bg-gray-100 rounded-lg p-2'>
                            {data?.map(({ data: apps }: any) => apps.map((app: App) => (
                                <div key={app.id} className=' bg-white p-2 w-full flex justify-between my-1 rounded-lg items-center hover:bg-gray-200 shadow cursor-pointer'
                                    onClick={() => {
                                        handleClickApp(app)
                                    }}>
                                    <span className='text-sm text-gray-900'>{app.name}</span>
                                    <div
                                        className=' cursor-pointer'
                                    >
                                        <CheckCircleIcon className='w-6 hover:text-gray-500' />
                                    </div>
                                </div>
                            )))}
                            <div ref={anchorRef} className='h-0'> </div>
                        </div>
                    </div>
                    <div className='pt-2'>
                        <FeatureItem
                            previewImgClassName='openingStatementPreview'
                            title={t('linktree.link.create_report')}
                            description={t('linktree.link.create_report_tip')}
                            value={is_required_time_limit}
                            onChange={value => { set_is_required_time_limit(value) }}
                            icon={<DocumentTextIcon className='w-4 h-4 text-green-600' />}
                        />
                    </div>
                    <div className={cn('pt-2', !is_required_time_limit && 'hidden')}>
                        <div className='py-2 text-sm font-medium leading-[20px] text-gray-900'>{t('linktree.link.set_time')}</div>
                        <input
                            className='shrink-0 block pl-3 w-16 h-8 appearance-none outline-none rounded-lg bg-gray-100 text-[13px] text-gra-900'
                            type='number'
                            defaultValue={appTimeLimit}
                            step={1}
                            min={2}
                            max={59}
                            onChange={(e) => {
                                setTimeLimit(parseInt(e.target.value))
                            }}
                        />
                    </div>
                </div>
                <div className='flex flex-row-reverse'>
                    <Button className='w-24 ml-2' type='primary' onClick={submit}>{!isEditModal ? t('common.operation.create') : t('common.operation.save')}</Button>
                    <Button className='w-24' onClick={onHide}>{t('common.operation.cancel')}</Button>
                </div>
            </Modal>
        </>

    )
}

export default CreateLinkDetailModal
