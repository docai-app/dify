'use client'

import LinkDetailCard from "@/app/(commonLayout)/linktree/[id]/LinkDetailCard";
import NewLinkDetailCard from "@/app/(commonLayout)/linktree/[id]/NewLinkDetailCard";
import { LinksetResponse } from "@/models/linktree";
import { Link } from "@/types/app";
import React, { FC } from "react";
import { useTranslation } from "react-i18next";

type Props = {
    data?: LinksetResponse;
    onRefresh?: () => void
}

const LinktreeDetail: FC<Props> = ({
    data,
    onRefresh
}) => {
    const { t } = useTranslation()

    return (
        <>
            <div className='h-full'>
                <nav className='grid content-start grid-cols-1 pb-4 gap-4 px-12 pt-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grow shrink-0'>
                    <NewLinkDetailCard onSuccess={onRefresh} />
                    {data?.link_set?.links?.map((app: Link) => (
                        <LinkDetailCard key={app.id} app={app} onRefresh={onRefresh} />
                    ))}
                </nav>
            </div>
        </>
    )
}
export default React.memo(LinktreeDetail)