import { PencilIcon } from "@heroicons/react/24/outline";

interface ViewProps {
    disable: boolean
    onClick: any;
}

export default function PencilButton(props: ViewProps) {
    const {
        disable,
        onClick
    } = props;
    return (
        <>
            <button
                onClick={onClick}
                className={`rounded-full text-sm p-2  ${disable ? 'bg-blue-600' : 'bg-gray-500'} hover:bg-blue-600 text-white items-center flex justify-center ring-0 shadow-lg mx-1`}
            >
                <PencilIcon className='w-5 h-5' />
            </button>
        </>
    );
}
