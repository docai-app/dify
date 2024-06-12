import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { AudioRecorder } from "react-audio-voice-recorder";

interface ViewProps {
    visible: boolean;
    recorderControls: any;
    isStart: boolean;
    resetRecorder: boolean;
    sendPreMessage: any;
    setWriting: any;
    setShowInputType: any;
    setResetRecorder: any;
}
export default function AudioRecorderView(props: ViewProps) {
    const {
        visible,
        recorderControls,
        isStart,
        resetRecorder,
        sendPreMessage,
        setWriting,
        setShowInputType,
        setResetRecorder
    } = props;



    const addAudioElement = (blob: any) => {
        // console.log('blob',blob);

        if (!isStart || resetRecorder) return
        const formData = new FormData();
        formData.append('audio', blob);
        setWriting(true)
        setShowInputType(false)
        // formData.append('file', blob);
        // formData.append('type', 'audio/webm')
        // formData.append('user', 'aa')
        // axios.post('https://dify.docai.net/v1/audio-to-text', formData, {
        //     headers: {
        //         'Authorization': `Bearer app-vDdcsITnE4EDDZtm4OV7v4rL`,
        //         'Content-Type': 'multipart/form-data',
        //     }
        // }).then((res) => {
        //     // console.log(res.data);
        //     if (res?.data) {
        //         sendPreMessage(res?.data?.text)
        //     }
        // })
        axios.post('https://pormhub.m2mda.com/api/open_ai/transcribe_audio', formData).then((res) => {
            // console.log(res.data);
            if (res?.data) {
                sendPreMessage(res?.data?.text)
            }
        })
    };

    return (
        <>
            <div className={`${visible ? '' : 'hidden'} w-full h-full  items-center  flex flex-row text-center  justify-center `}>
                <AudioRecorder
                    onRecordingComplete={addAudioElement}
                    recorderControls={recorderControls}
                    audioTrackConstraints={{
                        noiseSuppression: true,
                        echoCancellation: true
                    }}
                    showVisualizer={true}
                    downloadOnSavePress={false}
                    downloadFileExtension="webm"
                    classes={{
                        AudioRecorderStartSaveClass: 'hidden',
                        AudioRecorderDiscardClass: 'hidden audio-recorder-svg-color',
                        AudioRecorderClass: 'recorder max-w-[270px] rounded-sm',
                        AudioRecorderStatusClass: 'status',
                        AudioRecorderTimerClass: ' ',
                        AudioRecorderPauseResumeClass: 'audio-recorder-svg-color'
                    }}
                />
                <div className='p-2 rounded-full justify-center flex items-center bg-[#ebebeb] cursor-pointer'
                    onClick={() => {
                        setResetRecorder(true)
                        if (recorderControls.isRecording) {
                            recorderControls.stopRecording()
                        }
                    }}>
                    <TrashIcon className='w-5  text-red-500' />
                </div>
            </div>
        </>
    );
}
