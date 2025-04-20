import { useState } from "react"
import { eventService } from "../services/eventService";

export const useFormEventType = (navigate) => {

    const initialFormData = {
        name: "",
    }

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

        if (!formData.name.trim()) {
            newErrors.name = "El nombre del evento es obligatorio";
        } else if (formData.name.trim().length < 5) {
            newErrors.name = "El nombre debe tener al menos 5 caracteres";
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

    const handleSubmit = async(e) => {
        e.preventDefault();

        setIsLoading(true);
        setIsSuccess(false);

        const isValid = validateForm();

        if (!isValid) {
            setIsLoading(false);
            return;
        }

        try {
            await eventService.createTypeEvent(formData);
            setIsSuccess(true);
            resetForm();
            navigate("/dashboard");
        } catch (error) {
            console.log("Error: ", error);
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