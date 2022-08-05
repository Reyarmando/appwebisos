import { useState } from "react"
import { useAuth } from "../Contexts/authContext";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export function Login() {

    const [user, setUser] = useState({
        email: '',
        password: '',
    });

    const { login, resetPassword } = useAuth()
    const navigate = useNavigate()
    const [error, setError] = useState()

    const handleChange = ({target:{name,value}}) =>
        setUser({...user, [name]: value})


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        try {
            await login(user.email, user.password)
            navigate("/")
        } catch (error) {
            console.log(error.code)
            if (error.code === "auth/wrong-password") {
                setError('Contraseña Incorrecta')
            } else {
                setError(error.message)
            }
        }
    }

    /* const handleGoogleSignin = async () => {
        try {
            await loginWithGoogle()
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
    } */

    const handleResetPassword = async () => {
        if(!user.email) return setError('Please enter your email')
        try {
            await resetPassword(user.email)
            setError('We sent you an email with a link for reset your Password')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="w-full max-w-xs m-auto">
        {error && <Alert message={error}/>}
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md px-8 pt-6 pb-8 mb-4">
                <div className="flex justify-center">
                    <img src="s" alt="logo-isos" className="w-auto h-40"/>
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-black
                    text-md font-bold my-2">E-mail:</label>
                    <input type="email"
                        name="email"
                        placeholder="usuario@email.com"
                        className="border rounded-md shadow appearance-none
                        w-full py-2 px 3 text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="password" className="block text-black
                    text-md font-bold my-2">Contraseña:</label>
                    <input type="password"
                        name="password"
                        id="password"
                        placeholder="********"
                        className="border rounded-md shadow appearance-none
                        w-full py-2 px 3 text-gray-700 leading-tight
                        focus:outline-none focus:shadow-outline"
                        onChange={handleChange}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <button className="bg-blue-600 hover:bg-blue-800
                    text-white text-sm font-bold py-2 px-4 rounded-md
                    focus:outline-none focus:shadow-outline">Login</button>
                    <a href="#!" className="inline-block align-baseline font-bold text-sm
                    text-blue-600 hover:text-blue-800"
                    onClick={handleResetPassword}>forgot your password?</a>
                </div>
            </form>

                <p className="my-4 text-md flex justify-between
                px-3">Don't have an account?
                <Link to='/register' className="font-bold">Register</Link></p>

                {/*<button
                onClick={handleGoogleSignin}
                className="bg-slate-50 hover:bg-slate-200 text-black
                shadow-md rounded-md border-2 border-gray-300 py-2 px-4
                w-full flex items-center justify-center"><svg class="h-8 w-8 text-blue-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>
                <path d="M17.788 5.108A9 9 0 1021 12h-8" /></svg>Login with Google</button>*/}

        </div>
    )
}