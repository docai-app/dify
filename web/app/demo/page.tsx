'use client'
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Demo() {
    const router = useRouter()
    const [session, setSession] = useState<any>('')
    const get_drives = async () => {
        const session: any = await getSession()
        setSession(session)
        // if (!session) return router.push('/api/auth/signin')
        console.log('session', session);
        // if (session) {
        //     setSession(session)
        // }



    }
    useEffect(() => {
        get_drives()
    }, [])


    useEffect(() => {
        if (session && session.accessToken) {
            console.log('session.accessToken', session.accessToken);
            // getFiles()
            // axios('/api/drive?token=' + session.accessToken).then((res) => {
            //     console.log('res', res.data);
            // })
        }
    }, [session])
    return (
        <>
            {!session && <button
                className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => {
                    signIn('google', { params: { access_type: 'offline' } });
                }}
            >
                Connect Your Google Email
            </button>
            }
        </>
    )
}