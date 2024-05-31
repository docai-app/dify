'use client'

import { CubeIcon } from '@heroicons/react/24/outline'
import { CubeIcon as CubeSoildIcon } from '@heroicons/react/24/solid'
import classNames from 'classnames'
import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'
import { useTranslation } from 'react-i18next'
type ExploreNavProps = {
    className?: string
}

const LinktreeNav = ({
    className,
}: ExploreNavProps) => {
    const { t } = useTranslation()
    const selectedSegment = useSelectedLayoutSegment()
    const actived = selectedSegment === 'linktree'

    return (
        <Link href="/linktree" className={classNames(
            className, 'group',
            actived && 'bg-white shadow-md',
            actived ? 'text-primary-600' : 'text-gray-500 hover:bg-gray-200',
        )}>
            {
                actived
                    ? <CubeSoildIcon className='mr-2 w-4 h-4' />
                    : <CubeIcon className='mr-2 w-4 h-4' />
            }
            {'AI Apps'}
        </Link>
    )
}

export default LinktreeNav
