import { ChatBubbleOvalLeftEllipsisIcon, MicrophoneIcon } from '@heroicons/react/24/solid'
import { useSearchParams } from 'next/navigation'
import type { FC } from 'react'
import { memo } from 'react'
import Toast from '../../toast'
import { useChatWithHistoryContext } from './context'
import Countdown from './sidebar/Countdown'

type HeaderProps = {
    title: string
    isMobile: boolean
}
const Header: FC<HeaderProps> = ({
    title,
    isMobile,
}) => {
    const {
        currentConversationId,
        isStartTimer,
        handleTimer,
        startTimer,
        showRecordView,
        handleShowRecordView
    } = useChatWithHistoryContext()
    const searchParams = useSearchParams()

    return (
        <div className={`absolute top-0  flex flex-row  justify-between items-center pr-4  z-10  h-16 bg-white w-full border border-b-gray-100 `}>

            <div
                className={`
                    sticky top-0 flex items-center px-8 h-16 bg-white  text-base font-medium 
                    text-gray-900 border-b-[0.5px] backdrop-blur-md z-10 
                    ${isMobile && '!h-12'}
                    `}
            >
                {title}
            </div>

            <div className='flex flex-row items-center '>
                <div onClick={() => {
                    handleShowRecordView()
                }}>
                    {!showRecordView ?
                        <MicrophoneIcon className="w-5 text-blue-600  cursor-pointer " />
                        : <ChatBubbleOvalLeftEllipsisIcon className="w-5 text-blue-600  cursor-pointer " />}
                </div>
                <Countdown
                    minute={searchParams.get('timer') || 5}
                    visible={isStartTimer && true}
                    started={isStartTimer}
                    currentConversationId={currentConversationId}
                    handleNext={() => {
                        startTimer()
                    }}
                    finish={() => {
                        handleTimer()
                        Toast.notify({
                            type: 'info',
                            message: '正在为你生成報告!',
                        })
                    }} />
            </div>
        </div>
    )
}

export default memo(Header)
