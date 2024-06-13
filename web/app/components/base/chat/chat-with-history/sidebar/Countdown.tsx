import { ClockIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';
import QRcodeModal from './QRcodeModal';

const Countdown = ({
    minute = 5,
    started = false,
    finish,
    visible = false,
    currentConversationId = '',
    handleNext = () => { }
}: any) => {
    const [visable, setVisible] = useState(false);
    const [link, setLink] = useState(false);
    const targetTime = new Date().getTime() + minute * 60 * 1000; // 当前时间 + 5 分钟的毫秒数

    const calculateTimeLeft = () => {
        const difference = targetTime - new Date().getTime() - 10;
        let timeLeft = {};

        if (difference > 0) {
            timeLeft = {
                minutes: Math.floor((difference / (1000 * 60)) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft());
    // const [started, setStarted] = useState(false);

    useEffect(() => {
        let timer: any;

        if (started) {
            timer = setInterval(() => {
                setTimeLeft(calculateTimeLeft());
            }, 1000);
        } else {
            clearInterval(timer);
        }

        return () => clearInterval(timer);
    }, [started]);

    useEffect(() => {
        if (!visible) {
            handleReset()
        }
    }, [visible])


    const handleReset = () => {
        setTimeLeft(calculateTimeLeft());
    };

    const formatTime = (value: any) => {
        if (!value) return '00'
        return value.toString().padStart(2, '0');
    };

    useEffect(() => {
        if (timeLeft.minutes === 0 && timeLeft.seconds === 0) {
            // alert('Time is up!');
            // setStarted(false);
            //window.location.hostname "dify.docai.net"
            finish()
            axios.post('https://docai-dev.m2mda.com/api/v1/tools/dify_chatbot_report.json', { "domain": window.location.hostname, "conversation_id": currentConversationId }).then((res) => {
                // console.log(res.data);
                setVisible(true)
                setLink(res.data.file_url)
            })
        }
    }, [timeLeft]);

    return (
        <>
            <div className={`${visible ? '' : 'hidden'}`}>
                <div className='flex flex-row items-center cursor-pointer '>
                    <ClockIcon className='w-4 mr-2 text-[#0080E8] ' />
                    {/* <img src='./assets/images/chat/time.png' className='w-4 mr-2' /> */}
                    <div>
                        <label className='text-[#0080E8] text-sm'> {formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}</label>
                    </div>
                </div>
                {/* {!started && (
                    <button onClick={handleStart}>Start Countdown</button>
                )} */}
            </div>
            <QRcodeModal
                visable={visable}
                title={'掃描二維碼查看報告'}
                name={''}
                link={link}
                cancelClick={() => {
                    setVisible(false);
                }}
                next={() => {
                    setVisible(false);
                    handleNext()
                }}
            />
        </>
    );
};

export default Countdown;