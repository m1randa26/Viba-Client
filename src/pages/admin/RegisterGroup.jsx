import React, { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import { userService } from '../../services/userService'
import { groupService } from '../../services/groupService'

const RegisterGroup = () => {

    const [formData, setFormData] = useState({
        name: "",
        municipality: "",
        colony: "",
        groupAdmin: "",
    });

    const navigate = useNavigate();
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const res = await userService.getAll();
                const allUsers = res.data.data;

                const adminGroupUsers = allUsers.filter(
                    (user) => user.role.nombre === "ADMIN_GROUP_ROLE"
                );

                setAdmins(adminGroupUsers);
            } catch (err) {
                console.error("Error al cargar administradores de grupo:", err);
            }
        };

        fetchAdmins();
    }, []);

    const handleGoBack = () => {
        navigate("/dashboard", { replace: true });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            municipality: formData.municipality,
            colony: formData.colony,
            groupAdmin: {
                idUser: parseInt(formData.groupAdmin),
            },
        };

        try {
            await groupService.createGroup(payload);
            alert("Grupo creado con éxito ✅");
            navigate("/dashboard");
        } catch (error) {
            console.error("Error al crear grupo:", error);
            alert("Error al crear el grupo ❌");
        }
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
                    Crear <span className="text-green-500">grupo</span>
                </h1>
            </div>

            {/* Formulario */}
            <div className="w-full max-w-3xl">
                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-6 py-8 mb-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <div className="md:col-span-2">
                            <Input
                                id="name"
                                label="Nombre del grupo"
                                placeholder="Rescatistas"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <Input
                                id="municipality"
                                label="Municipio"
                                placeholder="Temixco"
                                value={formData.municipality}
                                onChange={(e) => setFormData({ ...formData, municipality: e.target.value })}
                            />
                        </div>

                        <div>
                            <Input
                                id="colony"
                                label="Colonia"
                                placeholder="Apodaca"
                                value={formData.colony}
                                onChange={(e) => setFormData({ ...formData, colony: e.target.value })}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Administrador del grupo
                            </label>
                            <select
                                required
                                className="shadow border rounded w-full py-2 px-3 text-gray-700"
                                value={formData.groupAdmin}
                                onChange={(e) => setFormData({ ...formData, groupAdmin: e.target.value })}
                            >
                                <option value="">Selecciona un administrador</option>
                                {admins.map((admin) => (
                                    <option key={admin.idUser} value={admin.idUser}>
                                        {admin.name} - {admin.email}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center justify-center">
                        <button
                            type="submit"
                            className="w-64 border-2 border-green-500 hover:bg-green-400 hover:text-white hover:border-transparent text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                        >
                            Crear grupo
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterGroup