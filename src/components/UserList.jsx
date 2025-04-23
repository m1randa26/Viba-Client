import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import UserItem from "./UserItem";
import { toast, ToastContainer } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import { memberService } from "../services/memberService.js";
import { useNavigate } from "react-router-dom";

const UserList = ({ isGroupAdmin = false, groupId }) => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedUsers, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await userService.getAll();
                let fetchedUsers = response.data.data;
                const userRole = localStorage.getItem("roleName");

                if (userRole === "ADMIN_GROUP_ROLE") {
                    fetchedUsers = fetchedUsers.filter(
                        user => user.role.nombre === "MEMBER_ROLE"
                    );
                }

                if (groupId) {
                    const membersRes = await memberService.getMembers(groupId);

                    const assignedUserIds = membersRes.data.data.map(m => m.user.idUser);

                    fetchedUsers = fetchedUsers.filter(
                        user => !assignedUserIds.includes(user.idUser)
                    );
                }
                setUsers(fetchedUsers);
            } catch (error) {
                console.log("Error:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, [groupId]);


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

    const handleAssign = async () => {

        try {
            for (const userId of selectedUsers) {
                const payload = {
                    user: {
                        idUser: userId
                    },
                    group: {
                        idGroup: groupId
                    }
                };

                await memberService.createMember(payload);
            }
            setSelectedUsers([]);
            navigate("/dashboard-group");
        } catch (error) {
            console.log("Error: ", error);
            toast.error("Error al asignar usuarios");
        }
    };

    if (isLoading) return <LoadingSpinner />

    return (
        <ul>
            {users.length === 0 ? (
                <p className="text-center text-gray-500 mt-4">No hay usuarios disponibles para asignar.</p>
            ) : (
                users.map(user => (
                    <UserItem
                        key={user.idUser}
                        user={user}
                        onDelete={handleDeleteUser}
                        isGroupAdmin={isGroupAdmin}
                        onSelect={handleSelect}
                        isSelected={selectedUsers.includes(user.idUser)}
                    />
                ))
            )}
            {isGroupAdmin && (
                <div className="mt-5 flex justify-end">
                    <button
                        onClick={handleAssign}
                        disabled={selectedUsers.length === 0}
                        className={`px-4 py-2 rounded transition ${selectedUsers.length === 0
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
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