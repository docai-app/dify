import { Image } from "react-bootstrap";
interface ViewProps {
    status: boolean
}

export default function BgView(props: ViewProps) {
    const { status } = props;
    return (
        <>
            <Image
                src={status ? '/recording/speak.gif' : '/recording/speak.jpg'}
                className="h-full max-w-[100%]"
                width={'auto'}
                height={'100%'}
                alt="speak"
            />
        </>
    );
}
