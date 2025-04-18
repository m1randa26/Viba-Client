import Input from "../components/Input"
import { useForm } from "../hooks/useForm";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate();

    const {
        handleSubmit,
        formData,
        handleChange,
        errors
    } = useForm(navigate);

    const handleGoBack = () => {
        navigate("/dashboard", { replace: true });
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Contenedor para el botón de regreso y el título */}
            <div className="w-full max-w-3xl mb-6 relative">
                {/* Botón de regreso posicionado a la izquierda */}
                <button
                    onClick={handleGoBack}
                    className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer hover:text-green-500 transition-colors"
                    aria-label="Regresar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>

                {/* Título centrado */}
                <h1 className="text-4xl font-semibold text-center">
                    Registrar nuevo <span className="text-green-500">usuario</span>
                </h1>
            </div>

            <div className="w-full max-w-3xl">
                <form className="bg-white shadow-md rounded px-6 py-8 mb-4" onSubmit={handleSubmit}>
                    {/* Layout de grid con distribución variable */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        {/* Nombre - ocupa todo el ancho */}
                        <div className="md:col-span-2">
                            <Input
                                id="name"
                                type="text"
                                label="Nombre completo"
                                placeholder="Hugo"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                                max={30}
                            />
                        </div>

                        {/* Email - media columna */}
                        <div>
                            <Input
                                id="email"
                                type="email"
                                label="Email"
                                placeholder="example@gmail.com"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email}
                                max={50}
                            />
                        </div>

                        {/* Teléfono - media columna */}
                        <div>
                            <Input
                                id="phone"
                                type="tel"
                                label="Teléfono"
                                placeholder="777 234 4567"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone}
                            />
                        </div>

                        {/* Contraseña - media columna */}
                        <div>
                            <Input
                                id="password"
                                type="password"
                                label="Contraseña"
                                placeholder="******"
                                value={formData.password}
                                onChange={handleChange}
                                error={errors.password}
                                max={20}
                            />
                        </div>

                        {/* Confirmar contraseña - media columna */}
                        <div>
                            <Input
                                id="confirmPassword"
                                type="password"
                                label="Confirmar contraseña"
                                placeholder="******"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                error={errors.confirmPassword}
                                max={20}
                            />
                        </div>

                        {/* Tipo de usuario - ocupa todo el ancho */}
                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de usuario</label>
                            <select
                                name="userType"
                                onChange={handleChange}
                                value={formData.userType}
                                className="shadow border rounded w-full py-2 px-3 text-gray-700">
                                <option value={2}>Administrador</option>
                                <option value={3}>Miembro</option>
                            </select>
                        </div>
                    </div>

                    {/* Botón de registro */}
                    <div className="mt-8 flex flex-col items-center justify-center">
                        <button
                            className="w-64 border-2 border-green-500 hover:bg-green-400 hover:text-white hover:border-transparent text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                            type="submit">
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register