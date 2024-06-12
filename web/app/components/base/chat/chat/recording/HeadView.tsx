
import { InboxIcon } from "@heroicons/react/24/outline";
import Countdown from "../../chat-with-history/sidebar/Countdown";
import ReturnButton from "./ReturnButton";
interface ViewProps {
    isStart: boolean;
    isTextType: boolean,
    setIsTextType: any;
    init: any;
    started: boolean;
    setStarted: any;
}

export default function HeadView(props: ViewProps) {
    const {
        isStart,
        isTextType,
        setIsTextType,
        init,
        started,
        setStarted
    } = props;

    /**
      * 显示返回按钮
      * @returns 
      */
    const showReturnView = () => {
        return true
    }

    return (
        <>
            <div className='w-full absolute top-5 px-4 flex flex-row justify-between '>
                <div className='flex flex-1  justify-left ' >
                    <div className='flex flex-row items-center cursor-pointer'>
                        <ReturnButton
                            visible={showReturnView()}
                            disabled={false}
                            onClick={() => {
                                setIsTextType(!isTextType)
                            }}
                        />
                    </div>
                    <div className='flex flex-row items-center cursor-pointer hidden'
                        onClick={() => {
                            setIsTextType(!isTextType)
                        }}>
                        {isTextType ? <label className='w-4 text-center text-white mr-2  text-sm font-bold font-serif'>T</label> : <img src='../recording/chat_type.png' className='w-4 mr-2' />}
                        <label className=' text-white text-sm cursor-pointer'>{isTextType ? '文本對話' : '語音對話'}</label>
                    </div>
                </div>
                <div className='flex flex-1  justify-center hidden' >


                    <Countdown
                        minute={5}
                        visible={true}
                        started={started}
                        finish={() => {
                            console.log('end');
                            setStarted(false)
                        }} />
                </div>
                <div className='flex flex-1  justify-end ' >
                    <div className=" relative cursor-pointer hidden">
                        <div className="bg-red-500 rounded-full w-[5px] h-[5px] absolute top-0 right-0"></div>
                        <InboxIcon className="w-6 text-gray-700" />
                    </div>
                </div>
            </div>
        </>
    );
}
