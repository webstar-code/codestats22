import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
    console.log(process.env.GREETING);
    const router = useRouter();


    useEffect(() => {
        if (router.query.token) {
            console.log(router.query);
            let token: any = router.query.token
            localStorage.setItem('token', token)
            router.push('/today');
        }
    }, [router.query])


    return (
        <div>

            <Link href="/api/login">
                login
            </Link>

        </div>
    )
}

export default Login