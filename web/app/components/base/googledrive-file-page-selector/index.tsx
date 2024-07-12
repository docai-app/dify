import { useAppContext } from "@/context/app-context"
import { useModalContext } from "@/context/modal-context"
import { DriveFile } from "@/models/googleDrive"
import { fetchDriveDataSource } from "@/service/googleDrive"
import cn from 'classnames'
import { memo } from "react"
import { FixedSizeList as List, ListChildComponentProps, areEqual } from 'react-window'
import useSWR from "swr"
import Checkbox from "../checkbox"
import Loading from "../loading"
import s from './base.module.css'

type GoogleDriveFilePageSelectorProps = {
    files?: DriveFile[]
    onSelect: () => void
    datasetId?: string
}

const GoogleDriveFilePageSelector = ({
    files,
    onSelect,
    datasetId = '',
}: GoogleDriveFilePageSelectorProps) => {

    const { setShowAccountSettingModal } = useModalContext()
    const { userProfile, currentWorkspace } = useAppContext()


    const { data, mutate } = useSWR({
        url: '/tools/google_drive/list.json', body: {
            dify_user_id: userProfile.id,
            workspace: currentWorkspace.id,
            domain: window.location.hostname == 'localhost' ? 'dify.docai.net' : window.location.hostname
        }
    }, fetchDriveDataSource)

    const ItemComponent = ({ index, style, data }: ListChildComponentProps<{
        dataList: DriveFile[]
        // handleToggle: (index: number) => void
        // checkedIds: Set<string>
        // handleCheck: (index: number) => void
        // canPreview?: boolean
        // handlePreview: (index: number) => void
        // listMapWithChildrenAndDescendants: NotionPageTreeMap
        // searchValue: string
        // previewPageId: string
        // pagesMap: DataSourceNotionPageMap
    }>) => {
        const { dataList } = data
        const current = dataList[index]
        return (
            <>
                <div
                    className={cn('group flex items-center pl-2 pr-[2px] rounded-md border border-transparent hover:bg-gray-100 cursor-pointer', s['preview-item'])}
                    style={{ ...style, top: style.top as number + 8, left: 8, right: 8, width: 'calc(100% - 16px)' }}
                >
                    <Checkbox
                        className='shrink-0 mr-2 group-hover:border-primary-600 group-hover:border-[2px]'
                    // checked={checkedIds.has(current.id)}
                    // onCheck={() => handleCheck(index)}
                    />
                    <div
                        className='grow text-sm font-medium text-gray-700 truncate'
                        title={current.name}
                    >
                        {current.name}
                    </div>
                </div>
            </>
        )
    }

    const Item = memo(ItemComponent, areEqual)

    if (!data) return <Loading />
    return (
        <div className='bg-gray-25 border border-gray-200 rounded-xl'>
            {
                data?.files?.length
                    ? (
                        <>
                            <div className='flex items-center pl-[10px] pr-2 h-11 bg-white border-b border-b-gray-200 rounded-t-xl'>
                                <span>Files:</span>
                                <div className='mx-1 w-[1px] h-3 bg-gray-200' />
                                <div
                                    className={cn(s['setting-icon'], 'w-6 h-6 cursor-pointer')}
                                    onClick={() => setShowAccountSettingModal({ payload: 'account', onCancelCallback: mutate })}
                                />
                                <div className='grow' />

                            </div>
                            <div className='rounded-b-xl overflow-hidden'>
                                <List
                                    className='py-2'
                                    height={296}
                                    itemCount={data?.files.length}
                                    itemSize={28}
                                    width='100%'
                                    itemKey={(index, data) => index}
                                    itemData={{
                                        dataList: data?.files
                                    }}
                                >
                                    {Item}
                                </List>
                            </div>
                        </>
                    )
                    : (<></>)
            }
        </div>
    )
}
export default GoogleDriveFilePageSelector