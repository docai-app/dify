'use client'
import Linktree from '@/app/components/linktree'
import { LinktreeListResponse } from '@/models/linktree'
import { fetchLinkList } from '@/service/linktree'
import type { FC } from 'react'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import useSWRInfinite from 'swr/infinite'

const getKey = (
    pageIndex: number,
    previousPageData: LinktreeListResponse,
) => {
    //     if (!pageIndex || previousPageData.has_more) {
    if (!pageIndex) {
        const params: any = { url: 'link_sets.json', params: { page: pageIndex + 1, count: 30 } }
        return params
    }
    return null
}

const Layout: FC = () => {
    const { t } = useTranslation()

    const { data, isLoading, setSize, mutate } = useSWRInfinite(
        (pageIndex: number, previousPageData: LinktreeListResponse) => getKey(pageIndex, previousPageData),
        fetchLinkList,
        { revalidateFirstPage: true },
    )

    useEffect(() => {
        document.title = `${t('tools.title')} - DocAI`
    }, [])



    return (
        <div className='relative flex flex-col overflow-y-auto bg-gray-100 shrink-0 h-0 grow pb-6'>
            <Linktree data={data} onRefresh={mutate} />
        </div>
    )
}
export default React.memo(Layout)
