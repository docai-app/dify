import { DataSourceDriveResponse } from "@/models/googleDrive"
import { GeneralResponse } from "@/models/linktree"
import { Fetcher } from "swr"
import { post } from "./base"

export const bindGoogleDriveAuth: Fetcher<{ data: GeneralResponse }, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return post<{ data: GeneralResponse }>(url, { body }, { isDocAIAPI: true })
}

export const fetchDriveDataSource: Fetcher<DataSourceDriveResponse, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return post<DataSourceDriveResponse>(url, { body }, { isDocAIAPI: true })
}

export const uploadDocumentToDrive: Fetcher<DataSourceDriveResponse, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return post<DataSourceDriveResponse>(url, { body }, { isDocAIAPI: true })
}