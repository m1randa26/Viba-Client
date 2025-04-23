import { useNavigate } from "react-router-dom";
import UserList from "../../components/UserList"


const MemberAssignmentForm = () => {

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate("/dashboard-group", { replace: true });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            {/* Header */}
            <div className="w-full max-w-3xl mb-5 relative">
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
                    Asignar <span className="text-green-500">miembros</span>
                </h1>
            </div>

            {/* Formulario */}
            <div className="w-full max-w-3xl mt-5">
                <UserList isGroupAdmin={true} />
            </div>
        </div>
    )
}

export default MemberAssignmentForm