import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { update_user_thunk } from "../_redux/user-management-thunk";
import AlertComponent from "@/app/pages/components/alert";

const InputError = ({ message, className = "" }) => {
    if (!message) return null;
    return <p className={`text-red-500 text-sm ${className}`}>{message}</p>;
};

export default function UserEditSection({ selectedUser, onClose, setAlertMessage, setAlertType, setShowAlert }) {
    if (!selectedUser) return null;

    const dispatch = useDispatch();

    // State for user data and errors
    const [userData, setUserData] = useState({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "", // Keep the password field empty
        role_id: selectedUser.role_id,
        is_online: selectedUser.is_online,
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        setUserData({
            name: selectedUser.name,
            email: selectedUser.email,
            password: "", // Reset password field on user change
            role_id: selectedUser.role_id,
            is_online: selectedUser.is_online,
        });
    }, [selectedUser]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { name, email, password, role_id, is_online } = userData;
        
        // Only add the password if it's provided
        const formData = { name, email, role_id, is_online };
        if (password) {
            formData.password = password; // Add password only if it's not empty
        }
    
        try {
            await dispatch(update_user_thunk(selectedUser.id, formData));
            setAlertMessage("User updated successfully!");
            setAlertType("success");
            setShowAlert(true);
           
        } catch (error) {
            setAlertMessage("Failed to update user. Please try again.");
            setAlertType("error");
            setShowAlert(true);
            setErrors(error?.response?.data?.errors || {});
        } finally {
            // Automatically close the alert after 10 seconds (10000ms)
            setTimeout(() => {
                setShowAlert(false);  // Hide the alert
                setAlertMessage("");  // Optional: Clear the message
                setAlertType("");    // Optional: Clear the alert type
            }, 5000); // 10000ms = 5 seconds
    
            // Close the modal after the action
            onClose();
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <div className="space-y-4">
                {/* Name Input */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={userData.name}
                        onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.name} />
                </div>

                {/* Email Input */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={userData.email}
                        onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.email} />
                </div>

                {/* Password Input */}
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={userData.password}
                        onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <InputError message={errors?.password} />
                </div>

                {/* Role Selection */}
                <div>
                    <label htmlFor="role_id" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        id="role_id"
                        name="role_id"
                        value={userData.role_id}
                        onChange={(e) => setUserData({ ...userData, role_id: e.target.value })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        <option value="1">Admin</option>
                        <option value="2">User</option>
                        <option value="3">Household</option>
                    </select>
                    <InputError message={errors?.role_id} />
                </div>

                

                {/* Submit and Cancel Buttons */}
                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-indigo-600 text-white px-4 py-2 rounded-md"
                    >
                        Save
                    </button>
                </div>
            </div>
        </form>
    );
}
