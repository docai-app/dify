'use client'

import Confirm from '@/app/components/base/confirm'
import Divider from '@/app/components/base/divider'
import { DotsHorizontal } from '@/app/components/base/icons/src/vender/line/general'
import CustomPopover, { HtmlContentProps } from '@/app/components/base/popover'
import { ToastContext } from '@/app/components/base/toast'
import CreateLinkDetailModal, { CreateLinkDetailModalProps } from '@/app/components/linktree/create-link-detail-modal'
import { useAppContext } from '@/context/app-context'
import { deleteLink, updateLinkInfo } from '@/service/linktree'
import type { Link } from '@/types/app'
import { LinkIcon } from '@heroicons/react/24/solid'
import cn from 'classnames'
import { useParams, useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useContext } from 'use-context-selector'
import s from './style.module.css'


export type AppCardProps = {
    app: Link
    onRefresh?: () => void
}

const LinkDetailCard = ({ app, onRefresh }: AppCardProps) => {
    const { t } = useTranslation()
    const { notify } = useContext(ToastContext)
    const { isCurrentWorkspaceManager } = useAppContext()
    const { push } = useRouter()
    const { id } = useParams()

    const [showEditModal, setShowEditModal] = useState(false)
    const [showConfirmDelete, setShowConfirmDelete] = useState(false)

    const onEdit: CreateLinkDetailModalProps['onConfirm'] = useCallback(async ({
        title,
        url,
        is_required_time_limit,
        time_limit
    }) => {
        try {
            await updateLinkInfo({
                linktree_id: id as string,
                id: app.id,
                title: title,
                url: url,
                meta: {
                    ...app.meta,
                    is_required_time_limit: is_required_time_limit,
                    time_limit
                }
            })
            setShowEditModal(false)
            notify({
                type: 'success',
                message: t('app.editDone'),
            })
            if (onRefresh)
                onRefresh()
        }
        catch (e) {
            notify({ type: 'error', message: t('app.editFailed') })
        }
    }, [])

    const onConfirmDelete = useCallback(async () => {
        try {
            await deleteLink({
                linktree_id: id as string,
                id: app.id
            })
            notify({ type: 'success', message: t('app.appDeleted') })
            if (onRefresh)
                onRefresh()
        }
        catch (e: any) {
            notify({
                type: 'error',
                message: `${t('app.appDeleteFailed')}${'message' in e ? `: ${e.message}` : ''}`,
            })
        }
        setShowConfirmDelete(false)
    }, [])

    const Operations = (props: HtmlContentProps) => {
        const onMouseLeave = async () => {
            props.onClose?.()
        }
        const onClickSettings = async (e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation()
            props.onClick?.()
            e.preventDefault()
            setShowEditModal(true)
        }
        const onClickDelete = async (e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation()
            props.onClick?.()
            e.preventDefault()
            setShowConfirmDelete(true)
        }
        return (
            <div className="relative w-full py-1" onMouseLeave={onMouseLeave}>
                <button className={s.actionItem} onClick={onClickSettings}>
                    <span className={s.actionName}>{t('app.editApp')}</span>
                </button>
                <Divider className="!my-1" />
                <div
                    className={cn(s.actionItem, s.deleteActionItem, 'group')}
                    onClick={onClickDelete}
                >
                    <span className={cn(s.actionName, 'group-hover:text-red-500')}>
                        {t('common.operation.delete')}
                    </span>
                </div>
            </div>
        )
    }
    return (
        <>
            <a
                href={app.url}
                target='_blank'
                className='group flex col-span-1 bg-white border-2 border-solid border-transparent rounded-xl shadow-sm min-h-[160px] flex flex-col transition-all duration-200 ease-in-out cursor-pointer hover:shadow-lg'
            >
                <div className='flex pt-[14px] px-[14px] pb-3 h-[66px] items-center gap-3 grow-0 shrink-0'>
                    <div className='relative shrink-0'>
                        <div className='w-10 h-10 items-center flex justify-center bg-green-200 rounded-md' >
                            <LinkIcon className='w-5 h-5 text-blue-600' />
                        </div>
                    </div>
                    <div className='grow w-0 py-[1px]'>
                        <div className='flex items-center text-sm leading-5 font-semibold text-gray-800'>
                            <div className='truncate' title={app.title}>{app.title}</div>
                        </div>
                        <div className='flex items-center text-[10px] leading-[18px] text-gray-500 font-medium'>
                            Link
                        </div>
                    </div>

                </div>
                <div
                    className={cn(
                        'grow mb-2 px-[14px] max-h-[72px] text-xs leading-normal text-gray-500 group-hover:line-clamp-2 group-hover:max-h-[36px]',
                        'line-clamp-4',
                    )}
                    title={app.url}
                >
                    {app.url}
                </div>
                <div className={cn(
                    'items-center shrink-0 mt-1 pt-1 pl-[14px] pr-[6px] pb-[6px] h-[42px]',
                    '!hidden group-hover:!flex'
                )}>
                    <div className={cn('grow flex items-center gap-1 w-0')} onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                    }}>
                        <div className={cn(
                            'group-hover:!block group-hover:!mr-0 mr-[41px] grow w-full',
                            <p>ass</p>
                        )}>

                        </div>
                    </div>

                    <div className='!hidden group-hover:!flex shrink-0'>
                        <CustomPopover
                            htmlContent={<Operations />}
                            position="br"
                            trigger="click"
                            btnElement={
                                <div
                                    className='flex items-center justify-center w-8 h-8 cursor-pointer rounded-md'
                                >
                                    <DotsHorizontal className='w-4 h-4 text-gray-700' />
                                </div>
                            }
                            btnClassName={open =>
                                cn(
                                    open ? '!bg-black/5 !shadow-none' : '!bg-transparent',
                                    'h-8 w-8 !p-2 rounded-md border-none hover:!bg-black/5',
                                )
                            }
                            popupClassName={
                                '!w-[238px] translate-x-[-110px]'
                            }
                            className={'!w-[128px] h-fit !z-20'}
                        />
                    </div>
                </div>
            </a>
            {showEditModal && (
                <CreateLinkDetailModal
                    isEditModal
                    appName={app.title}
                    appDescription={app.url}
                    appIs_required_time_limit={app.meta?.is_required_time_limit}
                    appTimeLimit={app.meta?.time_limit}
                    show={showEditModal}
                    onConfirm={onEdit}
                    onHide={() => setShowEditModal(false)}
                />
            )}
            {showConfirmDelete && (
                <Confirm
                    title={t('linktree.delete_modal.title')}
                    content={t('linktree.delete_modal.description')}
                    isShow={showConfirmDelete}
                    onClose={() => setShowConfirmDelete(false)}
                    onConfirm={onConfirmDelete}
                    onCancel={() => setShowConfirmDelete(false)}
                />
            )}
        </>
    )
}

export default LinkDetailCard
