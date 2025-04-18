import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import UserItem from "./UserItem";
import { toast, ToastContainer } from "react-toastify";

const UserList = () => {

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAll();
                setUsers(response.data.data);
                console.log(response.data.data);

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

    if (isLoading) return <p>Cargando</p>;

    return (
        <ul>
            {users.map(user => (
                <UserItem key={user.idUser} user={user} onDelete={handleDeleteUser} />
            ))}
            <ToastContainer />
        </ul>
    )

}

export default UserList