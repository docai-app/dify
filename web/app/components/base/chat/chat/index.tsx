import { useStore as useAppStore } from '@/app/components/app/store'
import AgentLogModal from '@/app/components/base/agent-log-modal'
import Button from '@/app/components/base/button'
import { StopCircle } from '@/app/components/base/icons/src/vender/solid/mediaAndDevices'
import PromptLogModal from '@/app/components/base/prompt-log-modal'
import type { Emoji } from '@/app/components/tools/types'
import classNames from 'classnames'
import { debounce } from 'lodash-es'
import type {
    FC,
    ReactNode,
} from 'react'
import {
    memo,
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { useShallow } from 'zustand/react/shallow'
import { useChatWithHistoryContext } from '../chat-with-history/context'
import type {
    ChatConfig,
    ChatItem,
    Feedback,
    OnSend,
} from '../types'
import Answer from './answer'
import ChatInput from './chat-input'
import { ChatContextProvider } from './context'
import { useChat } from './hooks'
import Question from './question'
import RecordingView from './recording'
import TryToAsk from './try-to-ask'

export type ChatProps = {
    chatList: ChatItem[]
    config?: ChatConfig
    isResponding?: boolean
    noStopResponding?: boolean
    onStopResponding?: () => void
    noChatInput?: boolean
    onSend?: OnSend
    chatContainerClassName?: string
    chatContainerInnerClassName?: string
    chatFooterClassName?: string
    chatFooterInnerClassName?: string
    suggestedQuestions?: string[]
    showPromptLog?: boolean
    questionIcon?: ReactNode
    answerIcon?: ReactNode
    allToolIcons?: Record<string, string | Emoji>
    onAnnotationEdited?: (question: string, answer: string, index: number) => void
    onAnnotationAdded?: (annotationId: string, authorName: string, question: string, answer: string, index: number) => void
    onAnnotationRemoved?: (index: number) => void
    chatNode?: ReactNode
    onFeedback?: (messageId: string, feedback: Feedback) => void
    chatAnswerContainerInner?: string
    hideProcessDetail?: boolean
    lastResponseItem?: ChatItem
    unSpeakContent?: any
    setUnSpeakContent?: any;
}
const Chat: FC<ChatProps> = ({
    config,
    onSend,
    chatList,
    isResponding,
    noStopResponding,
    onStopResponding,
    noChatInput,
    chatContainerClassName,
    chatContainerInnerClassName,
    chatFooterClassName,
    chatFooterInnerClassName,
    suggestedQuestions,
    showPromptLog,
    questionIcon,
    answerIcon,
    allToolIcons,
    onAnnotationAdded,
    onAnnotationEdited,
    onAnnotationRemoved,
    chatNode,
    onFeedback,
    chatAnswerContainerInner,
    hideProcessDetail,
    lastResponseItem,
    unSpeakContent,
    setUnSpeakContent
}) => {
    const { t } = useTranslation()
    const { isEndTimer } = useChatWithHistoryContext()
    const { currentLogItem, setCurrentLogItem, showPromptLogModal, setShowPromptLogModal, showAgentLogModal, setShowAgentLogModal } = useAppStore(useShallow(state => ({
        currentLogItem: state.currentLogItem,
        setCurrentLogItem: state.setCurrentLogItem,
        showPromptLogModal: state.showPromptLogModal,
        setShowPromptLogModal: state.setShowPromptLogModal,
        showAgentLogModal: state.showAgentLogModal,
        setShowAgentLogModal: state.setShowAgentLogModal,
    })))
    const [width, setWidth] = useState(0)
    const chatContainerRef = useRef<HTMLDivElement>(null)
    const chatContainerInnerRef = useRef<HTMLDivElement>(null)
    const chatFooterRef = useRef<HTMLDivElement>(null)
    const chatFooterInnerRef = useRef<HTMLDivElement>(null)
    const userScrolledRef = useRef(false)
    const [showRecordView, setShowRecordView] = useState(false)

    const {
        clearSpeak
    } = useChat()

    const handleScrolltoBottom = useCallback(() => {
        if (chatContainerRef.current && !userScrolledRef.current)
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }, [])

    const handleWindowResize = useCallback(() => {
        if (chatContainerRef.current)
            setWidth(document.body.clientWidth - (chatContainerRef.current?.clientWidth + 16) - 8)

        if (chatContainerRef.current && chatFooterRef.current)
            chatFooterRef.current.style.width = `${chatContainerRef.current.clientWidth}px`

        if (chatContainerInnerRef.current && chatFooterInnerRef.current)
            chatFooterInnerRef.current.style.width = `${chatContainerInnerRef.current.clientWidth}px`
    }, [])

    useEffect(() => {
        handleScrolltoBottom()
        handleWindowResize()
    }, [handleScrolltoBottom, handleWindowResize])

    useEffect(() => {
        if (chatContainerRef.current) {
            requestAnimationFrame(() => {
                handleScrolltoBottom()
                handleWindowResize()
            })
        }
    })

    useEffect(() => {
        window.addEventListener('resize', debounce(handleWindowResize))
        return () => window.removeEventListener('resize', handleWindowResize)
    }, [handleWindowResize])

    useEffect(() => {
        if (chatFooterRef.current && chatContainerRef.current) {
            const resizeObserver = new ResizeObserver((entries) => {
                for (const entry of entries) {
                    const { blockSize } = entry.borderBoxSize[0]

                    chatContainerRef.current!.style.paddingBottom = `${blockSize}px`
                    handleScrolltoBottom()
                }
            })

            resizeObserver.observe(chatFooterRef.current)

            return () => {
                resizeObserver.disconnect()
            }
        }
    }, [handleScrolltoBottom])

    useEffect(() => {
        const chatContainer = chatContainerRef.current
        if (chatContainer) {
            const setUserScrolled = () => {
                if (chatContainer)
                    userScrolledRef.current = chatContainer.scrollHeight - chatContainer.scrollTop >= chatContainer.clientHeight + 300
            }
            chatContainer.addEventListener('scroll', setUserScrolled)
            return () => chatContainer.removeEventListener('scroll', setUserScrolled)
        }
    }, [])

    const hasTryToAsk = config?.suggested_questions_after_answer?.enabled && !!suggestedQuestions?.length && onSend

    return (
        <ChatContextProvider
            config={config}
            chatList={chatList}
            isResponding={isResponding}
            showPromptLog={showPromptLog}
            questionIcon={questionIcon}
            answerIcon={answerIcon}
            allToolIcons={allToolIcons}
            onSend={onSend}
            onAnnotationAdded={onAnnotationAdded}
            onAnnotationEdited={onAnnotationEdited}
            onAnnotationRemoved={onAnnotationRemoved}
            onFeedback={onFeedback}
            lastResponseItem={lastResponseItem}
        >
            <div className={classNames('relative h-full ', !showRecordView && 'hidden')}>
                {showRecordView &&
                    <RecordingView
                        config={config}
                        onSend={onSend}
                        showRecordView={showRecordView}
                        setShowRecordView={setShowRecordView}
                        lastItem={chatList[chatList.length - 1]}
                        lastResponseItem={lastResponseItem}
                        isResponding={isResponding}
                        unSpeakContent={unSpeakContent}
                    />
                }
            </div>
            <div className={classNames('relative h-full ', showRecordView && '')}>
                <div
                    ref={chatContainerRef}
                    className={classNames('relative h-full overflow-y-auto', chatContainerClassName)}
                >
                    <div onClick={() => {
                        setUnSpeakContent([])
                        setShowRecordView(!showRecordView)
                    }}>
                        {chatNode}
                    </div>

                    <div
                        ref={chatContainerInnerRef}
                        className={`${chatContainerInnerClassName}`}
                    >
                        {
                            chatList.map((item, index) => {
                                if (item.isAnswer) {
                                    const isLast = item.id === chatList[chatList.length - 1]?.id
                                    return (
                                        <Answer
                                            key={item.id}
                                            item={item}
                                            question={chatList[index - 1]?.content}
                                            index={index}
                                            config={config}
                                            answerIcon={answerIcon}
                                            responding={isLast && isResponding}
                                            allToolIcons={allToolIcons}
                                            showPromptLog={showPromptLog}
                                            chatAnswerContainerInner={chatAnswerContainerInner}
                                            hideProcessDetail={hideProcessDetail}
                                        />
                                    )
                                }
                                return (
                                    <Question
                                        key={item.id}
                                        item={item}
                                        questionIcon={questionIcon}
                                    />
                                )
                            })
                        }
                    </div>
                </div>
                <div
                    className={`absolute bottom-0 ${(hasTryToAsk || !noChatInput || !noStopResponding) && chatFooterClassName}`}
                    ref={chatFooterRef}
                    style={{
                        background: 'linear-gradient(0deg, #F9FAFB 40%, rgba(255, 255, 255, 0.00) 100%)',
                    }}
                >
                    <div
                        ref={chatFooterInnerRef}
                        className={`${chatFooterInnerClassName}`}
                    >
                        {
                            !noStopResponding && isResponding && (
                                <div className='flex justify-center mb-2'>
                                    <Button className='py-0 px-3 h-7 bg-white shadow-xs' onClick={onStopResponding}>
                                        <StopCircle className='mr-[5px] w-3.5 h-3.5 text-gray-500' />
                                        <span className='text-xs text-gray-500 font-normal'>{t('appDebug.operation.stopResponding')}</span>
                                    </Button>
                                </div>
                            )
                        }
                        {
                            hasTryToAsk && (
                                <TryToAsk
                                    suggestedQuestions={suggestedQuestions}
                                    onSend={onSend}
                                />
                            )
                        }
                        {
                            !noChatInput && !isEndTimer && (
                                <ChatInput
                                    visionConfig={config?.file_upload?.image}
                                    speechToTextConfig={config?.speech_to_text}
                                    onSend={onSend}
                                />
                            )
                        }
                    </div>
                </div>
                {showPromptLogModal && (
                    <PromptLogModal
                        width={width}
                        currentLogItem={currentLogItem}
                        onCancel={() => {
                            setCurrentLogItem()
                            setShowPromptLogModal(false)
                        }}
                    />
                )}
                {showAgentLogModal && (
                    <AgentLogModal
                        width={width}
                        currentLogItem={currentLogItem}
                        onCancel={() => {
                            setCurrentLogItem()
                            setShowAgentLogModal(false)
                        }}
                    />
                )}
            </div>
        </ChatContextProvider>
    )
}

export default memo(Chat)
