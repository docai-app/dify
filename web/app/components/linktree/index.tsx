'use client'

import LinkCard from "@/app/(commonLayout)/linktree/LinkCard";
import NewLinkCard from "@/app/(commonLayout)/linktree/NewLinkCard";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    data?: any;
    onRefresh?: () => void
}

const Linktree: FC<Props> = ({
    data,
    onRefresh
}) => {
    const { t } = useTranslation()

    return (
        <>
            <div className='h-full'>
                <nav className='grid content-start grid-cols-1 gap-4 px-12 pb-4 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0'>
                    <NewLinkCard onSuccess={onRefresh} />


                    {data?.map(({ link_sets: apps }: any) => apps.map((app: any) => (
                        <LinkCard key={app.id} app={app} onRefresh={onRefresh} />
                    )))}
                </nav>
            </div>
        </>
    )
}
export default React.memo(Linktree)