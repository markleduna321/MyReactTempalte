import {
    create_user_service,
    delete_user_service,
    get_user_by_id_service,
    get_users_service,
    update_user_service,
} from "@/app/services/user-management-service";

import { usersSlice } from "./user-management-slice";

// Thunk to create a user
export function create_user_thunk(data) {
    return async function (dispatch) {
        const result = await create_user_service(data);
        dispatch(get_users_thunk()); // Fetch updated user list after creation
        return result;
    };
}

// Thunk to fetch all users
export function get_users_thunk() {
    return async function (dispatch) {
        try {
            const result = await get_users_service();
            console.log("Fetched users:", result);
            dispatch(usersSlice.actions.setUsers(result));
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
}

// Thunk to fetch a user by ID
export function get_user_by_id_thunk(user_id) {
    return async function (dispatch) {
        try {
            const result = await get_user_by_id_service(user_id);
            console.log("Fetched user by ID:", result);
            dispatch(usersSlice.actions.setUser(result));
        } catch (error) {
            console.error("Error fetching user by ID:", error);
        }
    };
}

// Thunk to update a user
export function update_user_thunk(userId, data) {
    return async function (dispatch) {
        try {
            const result = await update_user_service(userId, data);
            console.log("User updated:", result);

            // Fetch updated user list to refresh the table
            dispatch(get_users_thunk());

            return result;
        } catch (error) {
            console.error("Error updating user:", error);
            throw error;
        }
    };
}

// Thunk to delete a user
export function delete_user_thunk(userId) {
    return async function (dispatch) {
        try {
            const result = await delete_user_service(userId);
            console.log("User deleted:", result);

            // Fetch updated user list after deletion
            dispatch(get_users_thunk());

            return result;
        } catch (error) {
            console.error("Error deleting user:", error);
            throw error;
        }
    };
}
