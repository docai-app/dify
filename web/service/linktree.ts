
import { GeneralResponse, LinksetResponse, LinktreeListResponse } from '@/models/linktree';
import type { Fetcher } from 'swr';
import { del, get, post, put } from './base';

export const fetchLinkList: Fetcher<LinktreeListResponse, { url: string; params?: Record<string, any> }> = ({ url, params }) => {
    return get<LinktreeListResponse>(url, { params })
}

export const fetchLinksetList: Fetcher<LinksetResponse, { url: string; params?: Record<string, any> }> = ({ url, params }) => {
    return get<LinksetResponse>(url, { params })
}

export const createLinkSet: Fetcher<GeneralResponse, { name: string, description: string }> = ({ name, description }) => {
    return post<GeneralResponse>('link_sets.json', { body: { name, description } })
}

export const updateLinkSetInfo: Fetcher<GeneralResponse, { id: number, name: string, description: string }> = ({ id, name, description }) => {
    return put<GeneralResponse>(`link_sets/${id}.json`, { body: { name, description } })
}

export const deleteLinkSet: Fetcher<GeneralResponse, string> = (id) => {
    return del<GeneralResponse>(`link_sets/${id}.json`)
}

export const createLink: Fetcher<GeneralResponse, { id: any, title: string, url: string, meta?: any }> = ({ id, title, url, meta }) => {
    return post<GeneralResponse>(`link_sets/${id}/links.json`, { body: { title, url, meta } })
}

export const updateLinkInfo: Fetcher<GeneralResponse, { linktree_id: string, id: number, title: string, url: string, meta?: any }> = ({ linktree_id, id, title, url, meta }) => {
    return put<GeneralResponse>(`link_sets/${linktree_id}/links/${id}.json`, { body: { title, url, meta } })
}

export const deleteLink: Fetcher<GeneralResponse, { linktree_id: string, id: number }> = ({ linktree_id, id }) => {
    return del<GeneralResponse>(`link_sets/${linktree_id}/links/${id}.json`)
}