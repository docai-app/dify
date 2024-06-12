import {
    fetchSuggestedQuestions,
    getUrl,
    stopChatMessageResponding,
} from '@/service/share'
import { useSearchParams } from 'next/navigation'
import { useCallback, useEffect, useMemo } from 'react'
import Chat from '../chat'
import { useChat } from '../chat/hooks'
import type {
    ChatConfig,
    OnSend,
} from '../types'
import ConfigPanel from './config-panel'
import { useChatWithHistoryContext } from './context'
import Header from './header'

const ChatWrapper = () => {
    const {
        appParams,
        appPrevChatList,
        currentConversationId,
        currentConversationItem,
        inputsForms,
        newConversationInputs,
        handleNewConversationCompleted,
        isMobile,
        isInstalledApp,
        appId,
        appMeta,
        handleFeedback,
        currentChatInstanceRef,
        startTimer
    } = useChatWithHistoryContext()
    const searhParams = useSearchParams()
    const appConfig = useMemo(() => {
        const config = appParams || {}
        return {
            ...config,
            supportFeedback: true,
            opening_statement: currentConversationId ? currentConversationItem?.introduction : (config as any).opening_statement,
        } as ChatConfig
    }, [appParams, currentConversationItem?.introduction, currentConversationId])
    const {
        chatList,
        handleSend,
        handleStop,
        isResponding,
        suggestedQuestions,
        lastResponseItem,
        unSpeakContent,
        setUnSpeakContent
    } = useChat(
        appConfig,
        {
            inputs: (currentConversationId ? currentConversationItem?.inputs : newConversationInputs) as any,
            promptVariables: inputsForms,
        },
        appPrevChatList,
        taskId => stopChatMessageResponding('', taskId, isInstalledApp, appId),
    )

    useEffect(() => {
        if (currentChatInstanceRef.current) {
            currentChatInstanceRef.current.handleStop = handleStop
        }
    }, [])

    useEffect(() => {
        const timer = searhParams.get('timer')
        if (timer) {
            startTimer()
        }
    }, [currentConversationId, searhParams])

    const doSend: OnSend = useCallback((message, files) => {
        const data: any = {
            query: message,
            inputs: currentConversationId ? currentConversationItem?.inputs : newConversationInputs,
            conversation_id: currentConversationId,
        }

        if (appConfig?.file_upload?.image.enabled && files?.length)
            data.files = files

        handleSend(
            getUrl('chat-messages', isInstalledApp, appId || ''),
            data,
            {
                onGetSuggestedQuestions: responseItemId => fetchSuggestedQuestions(responseItemId, isInstalledApp, appId),
                onConversationComplete: currentConversationId ? undefined : handleNewConversationCompleted,
                isPublicAPI: !isInstalledApp,
            },
        )
    }, [
        appConfig,
        currentConversationId,
        currentConversationItem,
        handleSend,
        newConversationInputs,
        handleNewConversationCompleted,
        isInstalledApp,
        appId,
    ])
    const chatNode = useMemo(() => {
        if (inputsForms.length) {
            return (
                <>
                    <Header
                        isMobile={isMobile}
                        title={currentConversationItem?.name || ''}
                    />
                    {
                        !currentConversationId && (
                            <div className={`mx-auto w-full max-w-[720px] ${isMobile && 'px-4'}`}>
                                <div className='mb-6' />
                                <ConfigPanel />
                                <div
                                    className='my-6 h-[1px]'
                                    style={{ background: 'linear-gradient(90deg, rgba(242, 244, 247, 0.00) 0%, #F2F4F7 49.17%, rgba(242, 244, 247, 0.00) 100%)' }}
                                />
                            </div>
                        )
                    }
                </>
            )
        }

        return (
            <Header
                isMobile={isMobile}
                title={currentConversationItem?.name || ''}
            />
        )
    }, [
        currentConversationId,
        inputsForms,
        currentConversationItem,
        isMobile,
    ])

    return (
        <Chat
            config={appConfig}
            chatList={chatList}
            isResponding={isResponding}
            chatContainerInnerClassName={`mx-auto pt-6 w-full max-w-[720px] ${isMobile && 'px-4 pt-12'}`}
            chatFooterClassName='pb-4'
            chatFooterInnerClassName={`mx-auto w-full max-w-[720px] ${isMobile && 'px-4'}`}
            onSend={doSend}
            onStopResponding={handleStop}
            chatNode={chatNode}
            allToolIcons={appMeta?.tool_icons || {}}
            onFeedback={handleFeedback}
            suggestedQuestions={suggestedQuestions}
            hideProcessDetail
            lastResponseItem={lastResponseItem}
            unSpeakContent={unSpeakContent}
        />
    )
}

export default ChatWrapper
