import { Link, useNavigate } from "react-router-dom"
import Input from "../components/Input"
import { useFormLogin } from "../hooks/useFormLogin"

const Login = () => {

    const navigate = useNavigate();

    const {
        handleSubmit,
        handleChange,
        errors,
        formData,
    } = useFormLogin(navigate);

    return (
        <div className="h-screen flex flex-col justify-center items-center bg-gray-50">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold pb-2">
                    Comité <span className="text-green-500">Ambiental</span>
                </h1>
                <div className="w-20 h-1 bg-green-400 mx-auto mt-2 mb-6"></div>
                <h2 className="text-2xl font-medium text-gray-700">Iniciar Sesión</h2>
            </div>

            <div className="w-full max-w-md">
                <form
                    className="bg-white shadow-lg rounded-lg px-10 py-8 border-t-4 border-green-500 transition-all hover:shadow-xl"
                    onSubmit={handleSubmit}
                >
                    <div className="space-y-6">
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@gmail.com"
                            label="Email"
                            value={formData.email}
                            onChange={handleChange}
                            error={errors.email}
                            max={50}
                            className="focus:ring-2 focus:ring-green-300"
                        />

                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••"
                            label="Contraseña"
                            value={formData.password}
                            onChange={handleChange}
                            error={errors.password}
                            max={20}
                        />
                    </div>

                    {errors.general && (
                        <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-md flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.general}
                        </div>
                    )}

                    <div className="mt-8 flex flex-col space-y-4">
                        <button
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-md transition-colors duration-300 shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                    </div>
                </form>
            </div>

            {/* Footer decorativo */}
            <div className="mt-12 text-sm text-gray-400 flex items-center">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {new Date().getFullYear()} • Comité Ambiental
            </div>
        </div>
    )
}

export default Login