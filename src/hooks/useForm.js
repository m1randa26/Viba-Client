import { useState } from "react";
import { authService } from "../services/authService";

export const useForm = (navigate) => {
    // Datos iniciales para el formulario
    const initialFormData = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        userType: 3,
    };

    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const resetForm = () => {
        // Seteamos el estado del formulario a la informacion inicial
        setFormData(initialFormData);
        setErrors({});
        setIsLoading(false);
    }

    const validateForm = () => {
        const newErrors = {};

        // Valida que el nombre no este vacio y su longitud sea minimo de 8 caracteres
        if (!formData.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        } else if (formData.name.trim().length < 5) {
            newErrors.name = "El nombre debe tener al menos 5 caracteres";
        }

        // Validacion de correo
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!formData.email.trim()) {
            newErrors.email = "El email es obligatorio";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "El email no es válido";
        }

        // Validacion de password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!formData.password.trim()) {
            newErrors.password = "La contraseña es obligatoria";
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = "La contraseña no cumple el formato"
        }

        // Validacion de confirmacion de contraseña
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Las contraseñas no coinciden";
        }

        // Validacion de telefono
        const phoneRegex = /^\d{9,15}$/
        if (!formData.phone) {
            newErrors.phone = "El teléfono es obligatorio"
        } else if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s+/g, ""))) {
            newErrors.phone = "El teléfono de teléfono no es válido";
        }

        setErrors(newErrors);
        console.log("Errores encontrados:", newErrors);
        return Object.keys(newErrors).length === 0;
    }

    const handleChange = (e) => {
        // Destructuracion del input del target event
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Limpia el error especifico cuando el usuario corrige
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();

        // Activamos el estado
        setIsLoading(true);

        // Llamos a las validaciones del formulario
        const isValid = validateForm();

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        const payload = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            role: {
                id_role: formData.userType
            }
        }

        try {
            console.log("Enviando datos: ", payload);
            await authService.register(payload);
            setIsSuccess(true);
            resetForm();
            navigate("/dashboard");
        } catch (error) {
            console.log("Error al registrar:", error);
            setErrors({general: "Ocurrio un error al registrar."});
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