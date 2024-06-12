

interface ViewProps {
    visible: boolean
}

export default function ShowSpeakView(props: ViewProps) {
    const {
        visible,
    } = props;
    return (
        <>
            <div className={`${visible ? '' : 'hidden'} w-[80%] flex flex-col justify-center  absolute top-5 `}>
                <p className=' text-sm text-black font-bold'>請說出你的問題</p>
                <p className='w-full h-[0.1px] bg-black mt-2'></p>
            </div>
        </>
    );
}
