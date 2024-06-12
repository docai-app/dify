interface ViewProps {
    visible: boolean;
    disabled: boolean;
    onClick: any;
}

export default function ReturnButton(props: ViewProps) {
    const { visible = false, disabled, onClick } = props;

    return (
        <div
            className={`${visible ? ' ' : 'hidden'} rounded-lg text-sm cursor-pointer  relative mr-2`}
            // style={content_bg}
            onClick={onClick}
        >
            <img src='../recording/skip.png' className='w-14' />
            <div className='w-14 absolute top-0 flex justify-center'>
                <label className="text-white text-xs cursor-pointer  ">{'<返回'}</label>

            </div>

        </div>
    );
}
