'use client'
import InputNameModal from '@/app/components/base/modal/InputNameModal'
import Toast from '@/app/components/base/toast'
import Tooltip from '@/app/components/base/tooltip'
import { randomString } from '@/utils'
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { getSession, signIn } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

type IUploadDriveBtnBtnProps = {
    value: string
    className?: string
    isPlain?: boolean
}

const UploadDriveBtn = ({
    value,
    className,
    isPlain,
}: IUploadDriveBtnBtnProps) => {
    const selector = useRef(`copy-tooltip-${randomString(4)}`)
    const [session, setSession] = useState<any>()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        handleSeesion()
    }, [])

    const handleSeesion = async () => {
        const session: any = await getSession()
        if (session) {
            setSession(session)
        }
    }

    const saveToDrive = (name: string) => {
        const parasm = {
            title: name || "doc.pdf",
            content: value,
            token: session.accessToken
        }

        axios.post('/api/drive/creat_file', parasm)
            .then((res) => {
                if (res.data.success) {
                    Toast.notify({
                        type: 'success',
                        message: 'Save successful'
                    })
                } else {
                    console.log('res', res.data);
                    Toast.notify({
                        type: 'error',
                        message: res.data.error?.toString() || ''
                    })
                }
            })
    }


    return (
        <div className={`${className}`}>
            <Tooltip
                selector={selector.current}
                content={"Save To Google Drive"}
                className='z-10'
            >
                <div
                    className={'box-border p-0.5 flex items-center justify-center rounded-md bg-white cursor-pointer'}
                    style={!isPlain
                        ? {
                            boxShadow: '0px 4px 8px -2px rgba(16, 24, 40, 0.1), 0px 2px 4px -2px rgba(16, 24, 40, 0.06)',
                        }
                        : {}}
                    onClick={() => {
                        if (session) {
                            setVisible(true)
                        } else {
                            signIn('google', { params: { access_type: 'offline' } });
                        }
                    }}
                >
                    <div className='w-6 h-6 rounded-md hover:bg-gray-50 flex justify-between items-center'>
                        <CloudArrowUpIcon className='w-5 h-6 text-gray-500 hover:text-black' />
                    </div>
                </div>
            </Tooltip>
            {
                visible &&
                <InputNameModal
                    visable
                    description={'Input file name'}
                    cancelClick={() => {
                        setVisible(false)
                    }}
                    confirmClick={(name: string) => {
                        setVisible(false)
                        if (!name?.endsWith('.pdf')) {
                            saveToDrive(name + ".pdf")
                        } else {
                            saveToDrive(name)
                        }
                    }}
                />
            }
        </div>
    )
}

export default UploadDriveBtn
