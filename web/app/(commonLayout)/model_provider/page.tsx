"use client"

import type { FC } from 'react'
import React from 'react'

import ModelProviderPage from '@/app/components/header/account-setting/model-provider-page'
import type { IMainProps } from '@/app/components/share/chat'

const ModelProvider: FC<IMainProps> = () => {
    return (
        <div className='p-8  flex justify-center w-full items-center'>
            <div className='max-w-7xl'>
                <ModelProviderPage />
            </div>

        </div>

    )
}

export default React.memo(ModelProvider)
