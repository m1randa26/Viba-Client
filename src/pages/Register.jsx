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

    return (
        <div className="h-screen flex flex-col justify-center items-center ">
            <h1 className="text-4xl font-semibold">Crear nueva <span className="text-green-500">cuenta</span></h1>
            <div className="w-full max-w-sm">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <Input
                        id="name"
                        type="text"
                        label="Nombre"
                        placeholder="Hugo"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                    />
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
                    <Input
                        id="phone"
                        type="tel"
                        label="Teléfono"
                        placeholder="777 234 4567"
                        value={formData.phone}
                        onChange={handleChange}
                        error={errors.phone}
                    />
                    <label className="block text-gray-700 text-sm font-bold mb-2">Tipo de usuario</label>
                    <select
                        name="userType"
                        onChange={handleChange}
                        className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-10">
                        <option value={2}>Administrador</option>
                        <option value={3}>Miembro</option>
                    </select>
                    <div className="flex flex-col items-center justify-center">
                        <button className="w-64 border-2 border-green-500 hover:bg-green-400 hover:text-white hover:border-transparent text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer" type="submit">
                            Registrarse
                        </button>
                        <p className="mt-4 text-sm text-gray-600">
                            ¿Ya tienes una cuenta?{" "}
                            <Link to="/login" className="text-green-500 font-semibold hover:underline">
                                Inicia sesión
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register