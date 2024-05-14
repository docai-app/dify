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
        startTimer
    } = useChatWithHistoryContext()

    return (
        <div className='flex flex-row justify-between items-center pr-4'>
            <div
                className={`
                    sticky top-0 flex items-center px-8 h-16 bg-white/80 text-base font-medium 
                    text-gray-900 border-b-[0.5px] border-b-gray-100 backdrop-blur-md z-10
                    ${isMobile && '!h-12'}
                    `}
            >
                {title}
            </div>
            <Countdown
                minute={15}
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
    )
}

export default memo(Header)
