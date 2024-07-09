import { LinkSet } from "@/types/app"

export type GeneralResponse = {
    success: boolean
    error?: string
}

export type LinktreeListResponse = {
    link_sets: LinkSet[]
    success: boolean
}
export type LinksetResponse = {
    link_set: LinkSet
    success: boolean
}