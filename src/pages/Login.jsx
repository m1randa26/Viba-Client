import { Link } from "react-router-dom"
import Input from "../components/Input"
import { useFormLogin } from "../hooks/useFormLogin"

const Login = () => {

    const {
        handleSubmit,
        handleChange,
        errors,
        formData,
    } = useFormLogin();

    return (
        <div className="h-screen flex flex-col justify-center items-center ">
            <h1 className="text-4xl font-semibold pb-5">Comité <span className="text-green-500">Ambiental</span></h1>
            <h2 className="text-2xl font-semibold pb-10">Iniciar Sesión</h2>
            <div className="w-full max-w-sm">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <Input
                        id="email"
                        type="email"
                        placeholder="example@gmail.com"
                        label="Email"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        max={50}
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="******"
                        label="Contraseña"
                        value={formData.password}
                        onChange={handleChange}
                        error={errors.password}
                        max={20}
                    />
                    { errors.general && <p className="text-red-500 text-xs italic mb-4">Correo y/o contraseña incorrecto</p> }
                    <div className="flex flex-col items-center justify-center">
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-3 cursor-pointer" type="submit">
                            Iniciar sesión
                        </button>
                        <Link to="/register">
                            <button className="border-2 border-green-500 hover:bg-green-400 hover:text-white hover:border-transparent text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="submit">
                                Registrarse
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login