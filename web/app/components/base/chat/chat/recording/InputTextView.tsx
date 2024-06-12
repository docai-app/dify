import { useRef, useState } from "react";
import SendMessageButton from "./SendMessageBotton";

interface ViewProps {
    visible: boolean
    handleSendText: any;
}

export default function InputTextView(props: ViewProps) {
    const {
        visible,
        handleSendText
    } = props;
    const textInputRef = useRef<HTMLInputElement>(null);
    const [showSendMessage, setShowSendMessage] = useState(false);//显示发送消息按钮

    const handleSend = () => {
        if (textInputRef.current == null) return;
        const text = textInputRef.current.value;
        if (text?.trim() == '') {
            // setAlert({ title: '提示', content: '請輸入內容' });
            return;
        }
        textInputRef.current.value = '';
        handleSendText(text)
    };

    const onKeyup = (e: any) => {
        if (e.keyCode === 13) {
            handleSend();
        }
    };

    const onChangeInput = (e: any) => {
        if (e.target.value) {
            setShowSendMessage(true);
        } else {
            setShowSendMessage(false);
        }
    };

    return (
        <>
            <div className={`${!visible && 'hidden'} px-2 w-full flex-1 items-center flex-row h-full    flex  text-center  justify-center`}>
                <div className="w-full flex flex-1 flex-row items-center ">
                    <input
                        ref={textInputRef}
                        onKeyUp={onKeyup}
                        autoFocus={true}
                        // disabled={writing}
                        placeholder={"Write your message..."}
                        className=" w-full border flex  resize-none px-2   py-2 rounded-lg "
                        onChange={onChangeInput}
                    />
                    <div className="flex-0 flex">
                        <SendMessageButton
                            visible={showSendMessage}
                            disabled={false}
                            handleSendText={handleSend}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
