import { DriveFile } from "@/models/googleDrive"
import cn from 'classnames'
import { memo } from "react"
import { FixedSizeList as List, ListChildComponentProps, areEqual } from 'react-window'
import Checkbox from "../checkbox"
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


    return (
        <div className='bg-gray-25 border border-gray-200 rounded-xl'>
            {
                files?.length
                    ? (
                        <>
                            <div className='flex items-center pl-[10px] pr-2 h-11 bg-white border-b border-b-gray-200 rounded-t-xl'>
                                <span>Files:</span>
                                <div className='mx-1 w-[1px] h-3 bg-gray-200' />
                                <div
                                    className={cn(s['setting-icon'], 'w-6 h-6 cursor-pointer')}
                                //   onClick={() => setShowAccountSettingModal({ payload: 'data-source', onCancelCallback: mutate })}
                                />
                                <div className='grow' />

                            </div>
                            <div className='rounded-b-xl overflow-hidden'>
                                <List
                                    className='py-2'
                                    height={296}
                                    itemCount={files.length}
                                    itemSize={28}
                                    width='100%'
                                    itemKey={(index, data) => index}
                                    itemData={{
                                        dataList: files
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