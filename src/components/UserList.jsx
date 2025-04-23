import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import UserItem from "./UserItem";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

const UserList = ({ isGroupAdmin = false }) => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAll();
                let fetchedUsers = response.data.data;
                console.log(fetchedUsers);
                const userRole = localStorage.getItem("roleName");

                if (userRole === "ADMIN_GROUP_ROLE") {
                    fetchedUsers = fetchedUsers.filter(
                        user => user.role.nombre === "MEMBER_ROLE"
                    );
                }
                setUsers(fetchedUsers);
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchUsers();
    }, []);

    const handleDeleteUser = async (id) => {

        try {
            await userService.deleteUser(id);
            toast.success("Usuario eliminado")
            setUsers(prevUsers => prevUsers.filter(user => user.idUser !== id));
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelect = (userId, isChecked) => {
        setSelectedUsers(prev => {
            if (isChecked) {
                return [...prev, userId];
            } else {
                return prev.filter(id => id !== userId);
            }
        });
    };

    const handleAssign = () => {
        console.log("Usuarios seleccionados:", selectedUsers);
        // Aquí iría el llamado a la API para asignar al grupo
        toast.success("Usuarios asignados (simulado)");
    };

    if (isLoading) return <LoadingSpinner />

    return (
        <ul>
            {users.map(user => (
                <UserItem
                    key={user.idUser}
                    user={user}
                    onDelete={handleDeleteUser}
                    isGroupAdmin={isGroupAdmin}
                    onSelect={handleSelect}
                    isSelected={selectedUsers.includes(user.idUser)}
                />
            ))}
            {isGroupAdmin && (
                <div className="mt-5 flex justify-end">
                    <button
                        onClick={handleAssign}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Asignar al grupo
                    </button>
                </div>
            )}
            <ToastContainer theme="colored" />
        </ul>
    )

}

export default UserList