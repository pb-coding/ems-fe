import React, { useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from './AuthContext'

function Login() {
    
    const { login } = useContext(AuthContext)
    const username = useRef<HTMLInputElement>(null)
    const password = useRef<HTMLInputElement>(null)

    const loginSubmit = async () => {
       let payload = {
        username: username.current?.value,
        password: password.current?.value,
       }
       await login(payload)
    }
    
    return (
        <div className="grid h-screen w-screen place-items-center bg-slate-800 px-4 text-sm font-medium">
            <div className="w-full max-w-sm rounded-lg bg-slate-700/30 shadow">
                <form className="p-4 md:p-5 lg:p-6">
                <div className="grid gap-y-3">
                    <button className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400">
                        Register
                    </button>
                </div>

                <div className="my-3 flex items-center px-3">
                    <hr className="w-full border-slate-600" />
                    <span className="mx-3 text-slate-500">or</span>
                    <hr className="w-full border-slate-600" />
                </div>

                <div className="grid gap-y-3">
                    <input 
                        className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400" 
                        type="text"
                        name="username"
                        ref={username}
                        placeholder="Username"
                    />
                    <input 
                        className="focus:border-purple-400 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-200 outline-none transition placeholder:text-slate-400"
                        type="password"
                        name="password"
                        ref={password}
                        placeholder="Password" 
                    />
                    <button
                        type="button"
                        className="flex items-center justify-center gap-x-2 rounded-md border border-slate-600 bg-slate-700 py-3 px-4 text-slate-300 transition hover:text-purple-400"
                        onClick={loginSubmit}
                    >
                        Login
                    </button>
                </div>
                </form>
            </div>
            </div>
    )
}
export default Login;