import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.token) {
      let token: any = router.query.token
      localStorage.setItem('token', token)
      router.push('/day');
    }
  }, [router.query])

  const login = () => { }

  return (
    <div className="w-full min-h-screen overflow-hidden flex flex-col items-center justify-center">
      <h1 className="text-6xl font-medium text-primary mb-20">CodeStats</h1>
      <Link href="/api/login">
        <button
          className="py-2 px-4 bg-[#7AD930] text-base font-medium text-primary cursor-pointer rounded-lg">
          Login with Wakatime</button>
      </Link>

    </div>
  )
}

export default Login