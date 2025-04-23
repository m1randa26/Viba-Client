import { useState } from "react";
import { authService } from "../services/authService";

export const useFormLogin = (navigate) => {

    const initialFormData = {
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const resetForm = () => {
        setFormData(initialFormData);
        setErrors({});
        setIsLoading(false);
    }

    const validateForm = () => {
        const newErrors = {};

        // validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = "Debes ingresar un email";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "El email no es válido";
        }

        if (!formData.password.trim()) {
            newErrors.password = "Debes ingresar una contraseña";
        }

        setErrors(newErrors);
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

        const isValid = validateForm();

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        try {
            const response = await authService.login(formData);
            setIsSuccess(true);

            localStorage.setItem('userId', response.data.user.idUser);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.user.role.id_role);
            localStorage.setItem('roleName', response.data.user.role.nombre);
            resetForm();

            const role_name = response.data.role.nombre;

            if (role_name === "ADMIN_ROLE") {
                navigate("/dashboard");
            } else if (role_name === "ADMIN_GROUP_ROLE") {
                navigate("/dashboard-group")
            }else if (role_name === "MEMBER_ROLE") {
                navigate("/dashboard-member")
            }

        } catch (error) {
            console.log("Error en el login: ", error.status);
            setErrors({ general: "Ocurrió un error" });
        } finally {
            setIsLoading(false);
        }
    }

    return {
        formData,
        errors,
        isLoading,
        isSuccess,
        handleChange,
        handleSubmit,
        resetForm,
    }
}