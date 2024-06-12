interface ViewProps {
    status: boolean
}

export default function BgView(props: ViewProps) {
    const { status } = props;
    return (
        <>
            <img
                alt='preview image'
                src={status ? '/recording/speak.gif' : '/recording/speak.jpg'}
                className='max-w-full max-h-full'
            />
        </>
    );
}
