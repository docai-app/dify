import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface ViewProps {
    visible: boolean;
    disabled: boolean;
    handleSendText: any;
}

export default function SendMessageButton(props: ViewProps) {
    const { visible = false, disabled, handleSendText } = props;
    const handleUploadButtonClick = () => { };

    return (
        <div className={`${visible ? '' : 'hidden'}`}>
            <button
                onClick={() => handleSendText()}
                className={`rounded-lg text-sm p-2  bg-teal-500 text-white  flex justify-center ring-0 shadow-lg mx-1`}
            // className={`rounded-lg text-sm p-2 ${disabled
            //         ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            //         : 'bg-teal-500 text-white'
            //     } flex justify-center ring-0 shadow-lg mx-1`}
            // disabled={disabled}
            >
                <PaperAirplaneIcon className="h-5 w-5" />
            </button>
        </div>
    );
}
