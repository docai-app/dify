'use client'
import axios from "axios";
import { getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Demo() {
    const router = useRouter()
    const get_drives = async () => {
        const session: any = await getSession()
        if (!session) return router.push('/api/auth/signin')
        console.log('session', session);
        const res = await axios('/api/drive?token=' + session.accessToken)
        console.log('res', res.data);


    }
    useEffect(() => {
        get_drives()
    }, [])
    return (
        <>
        </>
    )
}