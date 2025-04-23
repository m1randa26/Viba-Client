import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { groupService } from "../services/groupService";


export const useFormGroup = (navigate) => {

    const initialFormData = {
        name: "",
        municipality: "",
        colony: "",
        groupAdmin: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const [adminUsers, setAdminUsers] = useState([]);


    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
        setIsLoading(false);
    }

    const fetchAdminUsers = async () => {
        try {
            const response = await userService.getAll();
            const allUsers = response.data.data;

            const filteredAdmins = allUsers.filter(user => user.role.nombre === 'ADMIN_GROUP_ROLE');

            setAdminUsers(filteredAdmins);
        } catch (error) {
            console.error("Error al obtener usuarios admin:", error);
        }
    };

    useEffect(() => {
        fetchAdminUsers();
    }, []);


    const validateForm = () => {
        const newErrors = {};

        const regex = /^[A-Za-z]+$/;

        if (!formData.name.trim()) {
            newErrors.name = "El nombre del grupo es obligatorio";
        } else if (!regex.test(formData.name)) {
            newErrors.name = "El nombre no es válido";
        } else if (formData.name.trim().length < 5) {
            newErrors.name = "El nombre debe tener al menos 5 caracteres";
        }

        if (!formData.municipality.trim()) {
            newErrors.municipality = "El municipio es obligatorio";
        } else if (!regex.test(formData.municipality)) {
            newErrors.municipality = "El municipio no es válido";
        } else if (formData.municipality.trim().length < 5) {
            newErrors.municipality = "El municipio debe tener al menos 5 caracteres";
        }

        if (!formData.colony.trim()) {
            newErrors.colony = "La colonia es obligatoria";
        } else if (!regex.test(formData.colony)) {
            newErrors.colony = "La colonia no es válido";
        } else if (formData.colony.trim().length < 5) {
            newErrors.colony = "La colonia debe tener al menos 5 caracteres";
        }

        setErrors(newErrors);
        console.log("Errores encontrados: ", newErrors);
        return Object.keys(newErrors).length === 0;

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setIsSuccess(false);

        const isValid = validateForm();

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        const payload = {
            name: formData.name,
            municipality: formData.municipality,
            colony: formData.colony,
            groupAdmin: {
                idUser: parseInt(formData.groupAdmin)
            }
        };

        try {
            await groupService.createGroup(payload);
            setIsSuccess(true);
            resetForm();
            navigate("/dashboard"); // o donde desees redirigir tras el éxito
        } catch (error) {
            console.error("Error al registrar grupo:", error);
            // podrías agregar aquí una notificación o setear un estado de error si gustas
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        isSuccess,
        handleChange,
        handleSubmit,
        resetForm,
        adminUsers
    };

}