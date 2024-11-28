import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import Modal from "@/app/pages/components/modal";
import UserEditSection from "./user-edit-section";
import DeleteConfirmationModal from "@/app/pages/components/delete-confirmation-modal";
import { delete_user_thunk } from "../_redux/user-management-thunk";
import AlertComponent from "@/app/pages/components/alert";

export default function UserManagementTableSection() {
  const dispatch = useDispatch();
  const { users } = useSelector((store) => store.users);  
  const userData = Array.isArray(users) ? users : [];

  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState(""); // 'success' or 'error'
  const [showAlert, setShowAlert] = useState(false);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setViewModalOpen(true); 
  };

  const closeViewModal = () => {
    setViewModalOpen(false); 
    setSelectedUser(null); 
  };

  const handleDeleteUser = (user) => {
    setUserToDelete(user);
    setDeleteModalOpen(true); 
  };

  const confirmDeleteUser = async () => {
    if (userToDelete) {
      try {
        await dispatch(delete_user_thunk(userToDelete.id));
        setAlertMessage("User deleted successfully!");
        setAlertType("success");
        setShowAlert(true);
      } catch (error) {
        setAlertMessage("Failed to delete user. Please try again.");
        setAlertType("error");
        setShowAlert(true);
      } finally {
        setDeleteModalOpen(false);
        setUserToDelete(null);

         // Automatically close the alert after 10 seconds (10000ms)
         setTimeout(() => {
              setShowAlert(false);
              setAlertMessage("");  // Optional: Clear the message
              setAlertType("");    // Optional: Clear the alert type
          }, 5000); // 10000ms = 5 seconds
      }
    }
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setUserToDelete(null);
  };

  return (
    <div className="mt-8 flow-root bg-white p-5 rounded-lg">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div>
            {showAlert && (
              <AlertComponent
                type={alertType}
                message={alertMessage}
                onClose={() => setShowAlert(false)} // Close alert explicitly
              />
            )}
          </div>
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                  Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Position
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {userData.length > 0 ? (
                userData.map((userM) => (
                  <tr key={userM.id}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{userM.name}</div>
                          <div className="mt-1 text-gray-500">{userM.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div
                        className={`text-sm font-medium px-3 py-1 rounded-lg ${
                          userM.role_id === 1
                            ? "text-blue-800"
                            : userM.role_id === 2
                            ? "text-green-800"
                            : userM.role_id === 3
                            ? "text-yellow-800"
                            : "text-gray-800"
                        }`}
                      >
                        {userM.role_id === 1
                          ? "Admin"
                          : userM.role_id === 2
                          ? "User"
                          : userM.role_id === 3
                          ? "Household"
                          : "Unknown"}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span
                        className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                          userM.is_online
                            ? "bg-green-50 text-green-700 ring-green-600/20"
                            : "bg-red-50 text-red-700 ring-red-600/20"
                        }`}
                      >
                        {userM.is_online ? "Online" : "Offline"}
                      </span>
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      <a
                        href="#"
                        className="text-indigo-600 hover:text-indigo-900"
                        onClick={() => handleViewUser(userM)}
                      >
                        View
                      </a>
                      <span> | </span>
                      <a
                        href="#"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => handleDeleteUser(userM)}
                      >
                        Delete
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="py-5 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View/Edit Modal */}
      <Modal isOpen={isViewModalOpen} onClose={closeViewModal}>
        <UserEditSection 
          selectedUser={selectedUser} 
          onClose={closeViewModal} 
          setAlertMessage={setAlertMessage}
          setAlertType={setAlertType}
          setShowAlert={setShowAlert}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDeleteUser}
      />
    </div>
  );
}
