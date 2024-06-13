import { FC, memo, useCallback, useEffect, useRef, useState } from "react"
import { useAudioRecorder } from "react-audio-voice-recorder"
import { ChatItem, OnSend } from "../../types"
import ChatInput from "../chat-input"
import AudioRecorderView from "./AudioRecorderView"
import BgView from "./BgView"
import HeadView from "./HeadView"
import InputTextView from "./InputTextView"
import MessageContentView from "./MessageContentView"
import MicrophoneButton from "./MicrophoneButton"
import PencilButton from "./PencilButton"
import ShowSpeakView from "./ShowSpeakView"

export type ChatProps = {
    config: any;
    onSend?: OnSend
    setShowRecordView: any;
    showRecordView: boolean
    lastItem: ChatItem;
    isResponding?: boolean
    lastResponseItem?: ChatItem
    unSpeakContent?: any[];

}
const RecordingView: FC<ChatProps> = ({
    config,
    onSend,
    showRecordView,
    setShowRecordView,
    lastItem,
    isResponding,
    lastResponseItem,
    unSpeakContent
}) => {
    const recorderControls = useAudioRecorder();

    const [startedTime, setStartedTime] = useState(false);//开始计时
    const [isStart, setIsStart] = useState(false);//是否开始对话
    const [isTextType, setIsTextType] = useState(true)//文本输入 或 语言输入
    const [resetRecorder, setResetRecorder] = useState(false); //是否取消语音录入
    const [showInputType, setShowInputType] = useState(true)
    const [writing, setWriting] = useState(false);//正在输入
    const [speakIng, setSpeakIng] = useState(false);//正在说话
    const [showContent, setShowContent] = useState(false);//显示正文内容

    let speakContentQueue: string[] = []
    //方法1，用浏览器发声,缺点是：不能设置固定声音，不同浏览器会发出不同的声音

    // const addToQueue = useCallback((content: string) => {
    //     speakContentQueue.push(content);
    //     // console.log('speakContentQueue', speakContentQueue)
    //     if (!speakinfRef.current) {
    //         playNextInQueue();
    //     }
    // }, [])

    // function playNextInQueue() {
    //     if (speakContentQueue.length === 0) {
    //         setSpeakIng(false)
    //         speakinfRef.current = false;
    //         return;
    //     }
    //     speakinfRef.current = true;
    //     const content = speakContentQueue.shift();
    //     if (content)
    //         startSpeak(content)
    // }

    // useEffect(() => {
    //     if (unSpeakContent && unSpeakContent.length > 0) {
    //         addToQueue(unSpeakContent[unSpeakContent.length - 1])
    //     }
    // }, [unSpeakContent, addToQueue])

    // const startSpeak = (message: string) => {
    //     console.log('message', message);

    //     if (!message) return
    //     if (window.speechSynthesis.paused) {
    //         return;
    //     }
    //     const utterance = new SpeechSynthesisUtterance(message);
    //     if (utterance) {
    //         utterance.rate = 1.0;
    //         utterance.addEventListener('pause', (event) => {
    //             console.log(`Speech paused after ${event.elapsedTime} seconds.`);
    //         });
    //         utterance.addEventListener('start', (event) => {
    //             console.log('开始说话');
    //             setSpeakIng(true)
    //         });
    //         utterance.addEventListener('end', (event) => {
    //             console.log('结束说话');
    //             endSpeak()
    //         });
    //         window.speechSynthesis.cancel();
    //         window.speechSynthesis.speak(utterance);
    //     }
    // }

    // const endSpeak = () => {
    //     playNextInQueue();
    // }


    //方法2，将文字转换成语音，再播放 -- 加载完一个资源再加载一个， 缺点是：会慢点

    // const [audioUrls, setAudioUrls] = useState<any>([])
    // const loadAudio = useRef(false)
    // const audio = new Audio();
    // const addToQueue = useCallback((content: string) => {
    //     speakContentQueue.push(content)
    //     //等待转换成语音
    //     if (!loadAudio.current) {
    //         handleTextToAudio()
    //     }
    // }, [])

    // useEffect(() => {
    //     if (unSpeakContent && unSpeakContent.length > 0) {
    //         addToQueue(unSpeakContent[unSpeakContent.length - 1])
    //     }
    // }, [unSpeakContent, addToQueue])

    // useEffect(() => {
    //     if (audioUrls && audioUrls.length > 0) {
    //         if (!speakIng) {
    //             preSpeaking(audioUrls[0])
    //         }
    //     } else {
    //         setSpeakIng(false)
    //     }
    // }, [audioUrls, speakIng])

    // const preSpeaking = (url: string) => {
    //     setSpeakIng(true);
    //     playAudio(url)
    // }

    // const playAudio = (url: string) => {
    //     console.log('url', url);
    //     audio.src = url
    //     audio.play();
    //     audio.onended = () => {
    //         console.log('end');
    //         setSpeakIng(false);
    //         setAudioUrls((prevData: any) => prevData.slice(1));
    //     }
    // }

    // const handleTextToAudio = () => {
    //     if (speakContentQueue.length === 0) {
    //         loadAudio.current = false;
    //         return;
    //     }

    //     loadAudio.current = true
    //     const content = speakContentQueue.shift();
    //     if (content)
    //         text_to_audio(content)
    // }


    // const text_to_audio = async (text: string) => {

    //     fetch('https://admin.docai.net/v1/text-to-audio', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer app-GHSWpkTaAtbc9tLisQE0Fd21`,
    //         },
    //         body: JSON.stringify({
    //             "text": text,
    //             "user": "abc-123",
    //             "streaming": false
    //         })
    //     })
    //         .then(response => response.arrayBuffer())
    //         .then(data => {
    //             const blob = new Blob([data], { type: 'audio/mp3' });
    //             const url = URL.createObjectURL(blob);
    //             // console.log('url', url);
    //             setAudioUrls((pre: any) => [...pre, url])
    //             handleTextToAudio()
    //         })
    //         .catch(error => {
    //             console.error('Error fetching TTS audio:', error);
    //         });

    // }

    //方法3，将文字转换成语音，再播放 --   一次性加载所有audio资源，缺点是：call太多会被限制
    const [audioUrls, setAudioUrls] = useState<any>([])
    const audio = new Audio();
    const [playAudioIndex, setPlayAudioIndex] = useState(0)

    const currentAudioUrl = useRef('')
    let queueIndex = 0

    const addToQueue = useCallback((content: string) => {
        speakContentQueue.push(content)
        handleTextToAudio()
    }, [])

    useEffect(() => {
        setPlayAudioIndex(0)
        queueIndex = 0
        setAudioUrls([])
        speakContentQueue = []
    }, [])

    useEffect(() => {
        if (unSpeakContent && unSpeakContent.length > 0) {
            addToQueue(unSpeakContent[unSpeakContent.length - 1])
        }
    }, [unSpeakContent, addToQueue])

    useEffect(() => {
        if (!speakIng && audioUrls && audioUrls.length > 0 && audioUrls[playAudioIndex]) {
            preSpeaking(audioUrls[playAudioIndex])
        }
    }, [audioUrls, speakIng, playAudioIndex])

    const preSpeaking = (url: string) => {
        //防止重复播放
        if (currentAudioUrl.current == url) return
        setSpeakIng(true);
        playAudio(url)
    }

    const playAudio = (url: string) => {
        console.log(' play url', url, playAudioIndex);
        currentAudioUrl.current = url
        audio.src = url
        audio.play();
        audio.onended = () => {
            setSpeakIng(false);
            setPlayAudioIndex((num) => num + 1)
        }
    }

    const handleTextToAudio = () => {
        while (speakContentQueue.length > 0) {
            const content = speakContentQueue.shift();
            if (content)
                text_to_audio(content, queueIndex++)
        }
    }


    const text_to_audio = async (text: string, index: number) => {

        fetch('https://admin.docai.net/v1/text-to-audio', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer app-GHSWpkTaAtbc9tLisQE0Fd21`,
            },
            body: JSON.stringify({
                "text": text,
                "user": "abc-123",
                "streaming": false
            })
        })
            .then(response => response.arrayBuffer())
            .then(data => {
                const blob = new Blob([data], { type: 'audio/mp3' });
                const url = URL.createObjectURL(blob);
                console.log('load url', url, index);
                setAudioUrls((prevArray: any) => {
                    return [
                        ...prevArray.slice(0, index), // 保持索引前的所有元素
                        url, // 在指定索引处添加数据
                        ...prevArray.slice(index), // 保持索引后的所有元素
                    ];
                })
            })
            .catch(error => {
                console.error('Error fetching TTS audio:', error);
            });

    }
    const init = () => {

    }


    /**
     * 发送内容之前处理问题
     * @param content 
     */
    const sendPreMessage = (query: string) => {
        if (onSend)
            onSend(query)
        setIsTextType(false)
        setShowContent(true)
        setIsStart(true)
    }
    /**
     * 显示正文内容
     */
    const showContentView = () => {
        // return true
        return showContent && isStart
    }

    /**
    * 显示說話界面
    */
    const showSpeakView = () => {
        if (isTextType || showRecordingView()) return true
        return showMicrophoneView() && !showContentView()
    }

    /**
     * 显示录音组件
     */
    const showRecordingView = () => {
        return recorderControls.isRecording
    }

    /**
    * 显示麦克风按钮
    * @returns 
    */
    const showMicrophoneView = () => {
        if (speakIng || writing) return false
        return isStart && !isTextType || recorderControls.isRecording
    }

    /**
     * 显示輸入類型
     * @returns 
     */
    const showInputTypeView = () => {
        return false
        // return showInputType
    }

    const content_bg = {
        backgroundImage: "url('../recording/record_content_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
    };

    return (
        <>
            <div className="flex flex-col h-full pt-16 relative bg-[#eff7fe] items-center">
                {/* <LoadingView visible={loading || writing || !chatbotDetailData} /> */}
                <div className=" w-full h-full justify-center flex">
                    <div className="w-full sm:w-[480px] relative flex justify-center">
                        <BgView status={speakIng} />
                        { /*顶部内容 */}
                        <HeadView
                            isStart={isStart}
                            isTextType={showRecordView}
                            setIsTextType={setShowRecordView}
                            init={init}
                            started={startedTime}
                            setStarted={setStartedTime}
                        />
                        {/*正文内容 */}
                        <div className='w-full absolute bottom-20  flex justify-center flex-col items-center  '>
                            <div className='relative w-[70%] min-w-[150px]   items-center'>
                                <div className=' absolute -top-5 -left-5 text-sm px-4 py-1 text-white  bg-blue-600 rounded-sm'>
                                    <label>角色</label>
                                </div>
                                <div style={content_bg} className=' rounded-lg w-full h-[260px] overflow-y-auto px-6 py-4 flex flex-col  text-center items-center'>
                                    {/* 内容开始 */}
                                    {/* 打字组件 */}
                                    <InputTextView
                                        visible={false}
                                        handleSendText={(content: string) => {
                                            setIsStart(true)
                                            // setWriting(true)
                                            if (onSend)
                                                onSend(content)
                                            setShowContent(false)
                                            // sendPreMessage(content)
                                            setIsTextType(false)
                                        }}
                                    />
                                    {/* 錄音组件 */}
                                    <AudioRecorderView
                                        visible={showRecordingView()}
                                        recorderControls={recorderControls}
                                        isStart={isStart}
                                        resetRecorder={resetRecorder}
                                        sendPreMessage={sendPreMessage}
                                        setWriting={setWriting}
                                        setShowInputType={setShowInputType}
                                        setResetRecorder={setResetRecorder}
                                    />


                                    <div className={` w-full flex justify-center  absolute -bottom-12 `}>
                                        {/* <div className={` px-2 w-full flex-1 items-center flex-row h-full    flex  text-center  justify-center`}> */}
                                        <div className="w-full">
                                            <ChatInput
                                                visionConfig={config?.file_upload?.image}
                                                speechToTextConfig={config?.speech_to_text}
                                                onSend={(message: string) => {
                                                    setIsStart(true)
                                                    setIsTextType(false)
                                                    setShowContent(true)
                                                    if (onSend)
                                                        onSend(message)
                                                }}
                                            />
                                        </div>
                                    </div>


                                    {/*显示 回复内容 */}
                                    <div className={`${showContentView() ? '' : 'hidden'} w-full text-left`}>
                                        {lastItem && <MessageContentView
                                            item={lastItem} responding={isResponding} />
                                        }
                                    </div>

                                    {/**顯示 說話中界面 */}
                                    <ShowSpeakView visible={showSpeakView()} />


                                    {/**顯示輸入類型 */}
                                    <div className={`${showInputTypeView() ? ' ' : 'hidden'} w-full flex justify-center  absolute bottom-1 `}>
                                        <div className='flex-1 flex justify-center'>
                                            <PencilButton
                                                disable={isTextType}
                                                onClick={() => {
                                                    if (recorderControls.isRecording) {
                                                        recorderControls.stopRecording();
                                                    }
                                                    setResetRecorder(true);
                                                    setIsTextType(true)
                                                    setShowContent(false)
                                                }}
                                            />
                                        </div>
                                        <div className='flex-1 flex justify-center'>
                                            <MicrophoneButton
                                                recorderControls={recorderControls}
                                                disable={showMicrophoneView()}
                                                pause={recorderControls.isRecording}
                                                onClick={() => {
                                                    if (recorderControls.isRecording) {
                                                        recorderControls.stopRecording();
                                                    } else {
                                                        recorderControls.startRecording();
                                                    }
                                                    setResetRecorder(false);
                                                    setIsTextType(false);
                                                    setShowContent(false);
                                                    setIsStart(true);
                                                }}
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default memo(RecordingView)