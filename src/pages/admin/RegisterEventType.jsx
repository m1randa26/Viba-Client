import { useNavigate } from "react-router-dom";
import Input from "../../components/Input";
import { useFormEventType } from "../../hooks/useFormEventType";

const RegisterEventType = () => {

    const navigate = useNavigate();

    const {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
    } = useFormEventType(navigate);

    const handleGoBack = () => {
        navigate("/dashboard", { replace: true });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="w-full max-w-3xl mb-6 relative">
                <button
                    onClick={handleGoBack}
                    className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer hover:text-green-500 transition-colors"
                    aria-label="Regresar"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </button>
                <h1 className="text-4xl font-semibold text-center">
                    Crear tipo de <span className="text-green-500">evento</span>
                </h1>
            </div>

            {/* Formulario */}
            <div className="w-full max-w-3xl">
                <form className="bg-white shadow-md rounded px-6 py-8 mb-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="md:col-span-2">
                            <Input
                                id="name"
                                name="name"
                                label="Nombre del tipo de evento"
                                placeholder="Rescates"
                                value={formData.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-center">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-64 border-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer transition-all
                                ${isLoading
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'border-green-500 text-green-500 hover:bg-green-400 hover:text-white hover:border-transparent'
                                }`}
                        >
                            {isLoading ? 'Creando...' : 'Crear tipo de evento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegisterEventType