import { LinkSet } from "@/types/app"

export type GeneralResponse = {
    success: boolean
}

export type LinktreeListResponse = {
    link_sets: LinkSet[]
    success: boolean
}
export type LinksetResponse = {
    link_set: LinkSet
    success: boolean
}