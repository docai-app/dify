import Spinner from "@/app/components/base/spinner";
import { ALLOW_FILE_EXTENSIONS_WITH_PDF } from "@/types/app";
import { DocumentIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";

export type IProps = {
    input_key: string
    handleInputValueChange: any;
}


const OcrFile: FC<IProps> = ({
    input_key,
    handleInputValueChange
}) => {
    const { t } = useTranslation()
    const [fileName, setFileName] = useState(t('common.imageUploader.uploadFromComputer'))
    const [loading, setLoading] = useState(false)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]

        if (!file)
            return

        const formData = new FormData();
        formData.append('file', file);
        setFileName(file.name)
        setLoading(true)
        axios({
            method: "post",
            url: 'https://docai-dev.m2mda.com/api/v1/tools/upload_directly_ocr',
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (res) {
                //handle success
                console.log(res.data.content);
                setLoading(false)
                handleInputValueChange(input_key, e.target.value)
            })
            .catch(function (response) {
                //handle error
                setLoading(false)
                console.log(response);
            });
    }

    return (
        <div
            className='relative w-full'
        >
            <div className={` flex items-center justify-center px-3 h-8 bg-gray-100
                text-xs text-gray-500 rounded-lg cursor-pointer 
            `}>
                <Spinner loading={loading} className="border-blue-400" />
                <DocumentIcon className='mr-2 w-4 h-4' />
                {fileName}
            </div>
            <input
                className='absolute block inset-0 opacity-0 text-[0] w-full disabled:cursor-not-allowed cursor-pointer'
                onClick={e => ((e.target as HTMLInputElement).value = '')}
                type='file'
                accept={ALLOW_FILE_EXTENSIONS_WITH_PDF.map(ext => `.${ext}`).join(',')}
                onChange={handleChange}
            />
        </div>
    )
}

export default OcrFile