import { MicrophoneIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useToastContext } from '../../../toast';

interface ViewProps {
    recorderControls: any;
    disable: boolean;
    pause: boolean;
    onClick: any;
}

export default function MicrophoneButton(props: ViewProps) {
    const {
        recorderControls,
        disable,
        pause,
        onClick
    } = props;
    const [hasMicrophone, setHasMicrophone] = useState(false);//是否有麦克风
    const { notify } = useToastContext();
    useEffect(() => {
        const checkMicrophone = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                setHasMicrophone(true);
                stream.getTracks().forEach(track => track.stop());
            } catch (error: any) {
                setHasMicrophone(false);
            }
        };

        checkMicrophone();
    }, []);

    return (
        <button
            onClick={() => {
                if (!hasMicrophone) {
                    notify({ type: 'error', message: '檢查是否已開啟麥克風' })
                    return
                }
                onClick()
            }}
            className={`rounded-full text-sm p-2 ${disable ? 'bg-blue-600' : 'bg-gray-500'}  hover:bg-blue-600 text-white items-center flex justify-center ring-0 shadow-lg mx-1`}
        >
            {pause ? <PaperAirplaneIcon className="h-5 w-5" /> : <MicrophoneIcon className="h-5 w-5" />}
        </button>
    );
}
