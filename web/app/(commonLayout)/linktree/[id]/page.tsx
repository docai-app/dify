'use client'
import LinktreeDetail from '@/app/components/linktree/detail/page'
import { fetchLinksetList } from '@/service/linktree'
import { useParams } from 'next/navigation'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useSWR from 'swr'
const Layout: FC = () => {
    const { t } = useTranslation()
    const { id } = useParams()

    const {
        data, mutate
    } = useSWR({ url: `link_sets/${id}.json` }, fetchLinksetList)

    useEffect(() => {
        document.title = `${t('tools.title')} - DocAI`
    }, [])

    return (
        <div className='relative flex flex-col overflow-y-auto bg-gray-100 shrink-0 h-0 grow pb-6'>
            <div className='shrink-0 pt-6 mb-4 px-12'>
                <div className={`mb-1 text-xl font-semibold`}>{data?.link_set?.name}</div>
                <div className='text-gray-500 text-sm'>{data?.link_set?.description}</div>
            </div>
            <LinktreeDetail data={data} onRefresh={mutate} />
        </div>
    )
}
export default React.memo(Layout)
