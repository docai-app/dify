'use client'
import { useDefaultModel } from '@/app/components/header/account-setting/model-provider-page/hooks'
import { useAppContext } from '@/context/app-context'
import { useModalContext } from '@/context/modal-context'
import type { NotionPage } from '@/models/common'
import type { DataSet, FileItem, createDocumentResponse } from '@/models/datasets'
import { DataSourceType } from '@/models/datasets'
import { fetchDataSource } from '@/service/common'
import { fetchDatasetDetail } from '@/service/datasets'
import { checkGoogleDrive } from '@/service/googleDrive'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import AppUnavailable from '../../base/app-unavailable'
import { ModelTypeEnum } from '../../header/account-setting/model-provider-page/declarations'
import StepOne from './step-one'
import StepThree from './step-three'
import StepTwo from './step-two'
import StepsNavBar from './steps-nav-bar'

type DatasetUpdateFormProps = {
    datasetId?: string
}

const DatasetUpdateForm = ({ datasetId }: DatasetUpdateFormProps) => {
    const { t } = useTranslation()
    const { setShowAccountSettingModal } = useModalContext()
    const [hasConnection, setHasConnection] = useState(true)
    const [dataSourceType, setDataSourceType] = useState<DataSourceType>(DataSourceType.FILE)
    const [step, setStep] = useState(1)
    const [indexingTypeCache, setIndexTypeCache] = useState('')
    const [fileList, setFiles] = useState<FileItem[]>([])
    const [result, setResult] = useState<createDocumentResponse | undefined>()
    const [hasError, setHasError] = useState(false)
    const { data: embeddingsDefaultModel } = useDefaultModel(ModelTypeEnum.textEmbedding)
    const { userProfile, currentWorkspace } = useAppContext()
    const [hasConnectionGoogleDrive, setHasConnectionGoogleDrive] = useState(true)

    const [notionPages, setNotionPages] = useState<NotionPage[]>([])
    const updateNotionPages = (value: NotionPage[]) => {
        setNotionPages(value)
    }

    const updateFileList = (preparedFiles: FileItem[]) => {
        setFiles(preparedFiles)
    }

    const updateFile = (fileItem: FileItem, progress: number, list: FileItem[]) => {
        const targetIndex = list.findIndex(file => file.fileID === fileItem.fileID)
        list[targetIndex] = {
            ...list[targetIndex],
            progress,
        }
        setFiles([...list])
        // use follow code would cause dirty list update problem
        // const newList = list.map((file) => {
        //   if (file.fileID === fileItem.fileID) {
        //     return {
        //       ...fileItem,
        //       progress,
        //     }
        //   }
        //   return file
        // })
        // setFiles(newList)
    }
    const updateIndexingTypeCache = (type: string) => {
        setIndexTypeCache(type)
    }
    const updateResultCache = (res?: createDocumentResponse) => {
        setResult(res)
    }

    const nextStep = useCallback(() => {
        setStep(step + 1)
    }, [step, setStep])

    const changeStep = useCallback((delta: number) => {
        setStep(step + delta)
    }, [step, setStep])

    const checkNotionConnection = async () => {
        const { data } = await fetchDataSource({ url: '/data-source/integrates' })
        const hasConnection = data.filter(item => item.provider === 'notion') || []
        setHasConnection(hasConnection.length > 0)
    }

    const checkGoogleDriveConnection = async () => {
        // console.log('userProfile', userProfile);
        // console.log('currentWorkspace', currentWorkspace);
        // console.log('', window.location.hostname);
        // const session: any = await getSession()
        // console.log('session', session);

        // const { data } = await bindGoogleDriveAuth({
        //     url: '/tools/google_drive/auth.json', body: {
        //         dify_user_id: userProfile.id,
        //         workspace: currentWorkspace.id,
        //         domain: "dify.docai.net",
        //         access_token: session?.refreshToken
        //     }
        // })



        const res = await checkGoogleDrive({
            url: '/tools/google_drive/check.json',
            body: {
                dify_user_id: userProfile.id,
                workspace: currentWorkspace.id,
                domain: window.location.hostname == 'localhost' ? 'dify.docai.net' : window.location.hostname
            }
        })

        setHasConnectionGoogleDrive(res.success)

        // setDriveFiles(data.files || []) 
        // setDriveFiles([
        //     {
        //         "id": "10nkh0COicLJi5OvNMhoaD1NsuPGI1UP-5gG5h3_LUCM",
        //         "name": "联系信息"
        //     },
        //     {
        //         "id": "1gAR4x68GzS2X-pJFI0l_Sd3n5Wb6Iyffh6SYGNTBtxU",
        //         "name": "未命名的表单"
        //     },
        //     {
        //         "id": "125kw2StfMxdKvJeRJ9sJ4fXXQ_TYvCAx",
        //         "name": "test"
        //     },
        //     {
        //         "id": "1oLd-31iWvSVpqYRgTngUD1QIoHobbGXp",
        //         "name": "测试文档2.pdf"
        //     },
        //     {
        //         "id": "0B3Q9teUf_Q6wbU5wRlJpN1RpaTA",
        //         "name": "Blank Flowchart"
        //     },
        //     {
        //         "id": "0B3Q9teUf_Q6wcm5fWWkzVTdqM2M",
        //         "name": "Lucidchart"
        //     }
        // ])
        // console.log('data', data);

    }

    useEffect(() => {
        checkNotionConnection()
        checkGoogleDriveConnection()
    }, [])

    const [detail, setDetail] = useState<DataSet | null>(null)
    useEffect(() => {
        (async () => {
            if (datasetId) {
                try {
                    const detail = await fetchDatasetDetail(datasetId)
                    setDetail(detail)
                }
                catch (e) {
                    setHasError(true)
                }
            }
        })()
    }, [datasetId])

    if (hasError)
        return <AppUnavailable code={500} unknownReason={t('datasetCreation.error.unavailable') as string} />

    return (
        <div className='flex' style={{ height: 'calc(100vh - 56px)' }}>
            <div className="flex flex-col w-11 sm:w-56 overflow-y-auto bg-white border-r border-gray-200 shrink-0">
                <StepsNavBar step={step} datasetId={datasetId} />
            </div>
            <div className="grow bg-white">
                {step === 1 && <StepOne
                    hasConnection={hasConnection}
                    onSetting={() => setShowAccountSettingModal({ payload: 'data-source' })}
                    datasetId={datasetId}
                    dataSourceType={dataSourceType}
                    dataSourceTypeDisable={!!detail?.data_source_type}
                    changeType={setDataSourceType}
                    files={fileList}
                    updateFile={updateFile}
                    updateFileList={updateFileList}
                    notionPages={notionPages}
                    updateNotionPages={updateNotionPages}
                    onStepChange={nextStep}
                    hasConnectionGoogleDrive={hasConnectionGoogleDrive}
                    onSettingGoogle={() => setShowAccountSettingModal({ payload: 'account' })}
                />}
                {(step === 2 && (!datasetId || (datasetId && !!detail))) && <StepTwo
                    hasSetAPIKEY={!!embeddingsDefaultModel}
                    onSetting={() => setShowAccountSettingModal({ payload: 'provider' })}
                    indexingType={detail?.indexing_technique}
                    datasetId={datasetId}
                    dataSourceType={dataSourceType}
                    files={fileList.map(file => file.file)}
                    notionPages={notionPages}
                    onStepChange={changeStep}
                    updateIndexingTypeCache={updateIndexingTypeCache}
                    updateResultCache={updateResultCache}
                />}
                {step === 3 && <StepThree
                    datasetId={datasetId}
                    datasetName={detail?.name}
                    indexingType={detail?.indexing_technique || indexingTypeCache}
                    creationCache={result}
                />}
            </div>
        </div>
    )
}

export default DatasetUpdateForm
