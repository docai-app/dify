import { DataSourceDriveResponse } from "@/models/googleDrive"
import { GeneralResponse } from "@/models/linktree"
import { Fetcher } from "swr"
import { del, post } from "./base"

export const bindGoogleDriveAuth: Fetcher<{ data: GeneralResponse }, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return post<{ data: GeneralResponse }>(url, { body }, { isDocAIAPI: true })
}

export const unBindGoogleDriveAuth: Fetcher<{ data: GeneralResponse }, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return del<{ data: GeneralResponse }>(url, { body }, { isDocAIAPI: true })
}

export const fetchDriveDataSource: Fetcher<DataSourceDriveResponse, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return post<DataSourceDriveResponse>(url, { body }, { isDocAIAPI: true })
}

export const uploadDocumentToDrive: Fetcher<DataSourceDriveResponse, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return post<DataSourceDriveResponse>(url, { body }, { isDocAIAPI: true })
}

export const checkGoogleDrive: Fetcher<GeneralResponse, { url: string, body: Record<string, any> }> = ({ url, body }) => {
    return post<GeneralResponse>(url, { body }, { isDocAIAPI: true })
}