'use client'

import type { ReactNode } from 'react'
import { createContext, useContext } from 'use-context-selector'
import type { ChatProps } from './index'

export type ChatContextValue = Pick<ChatProps, 'config'
    | 'isResponding'
    | 'chatList'
    | 'showPromptLog'
    | 'questionIcon'
    | 'answerIcon'
    | 'allToolIcons'
    | 'onSend'
    | 'onAnnotationEdited'
    | 'onAnnotationAdded'
    | 'onAnnotationRemoved'
    | 'onFeedback'
    | 'lastResponseItem'
>

const ChatContext = createContext<ChatContextValue>({
    chatList: [],
})

type ChatContextProviderProps = {
    children: ReactNode
} & ChatContextValue

export const ChatContextProvider = ({
    children,
    config,
    chatList,
    showPromptLog,
    questionIcon,
    answerIcon,
    allToolIcons,
    onSend,
    onAnnotationEdited,
    onAnnotationAdded,
    onAnnotationRemoved,
    onFeedback,
    lastResponseItem
}: ChatContextProviderProps) => {
    return (
        <ChatContext.Provider value={{
            config,
            chatList: chatList || [],
            showPromptLog,
            questionIcon,
            answerIcon,
            allToolIcons,
            onSend,
            onAnnotationEdited,
            onAnnotationAdded,
            onAnnotationRemoved,
            onFeedback,
            lastResponseItem
        }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => useContext(ChatContext)

export default ChatContext
