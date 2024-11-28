import Button from '@/app/pages/components/button';
import InputLabelComponent from '@/app/pages/components/input-label-component';
import SelectComponent from '@/app/pages/components/input-select';
import InputTextComponent from '@/app/pages/components/input-text-component';
import Modal from '@/app/pages/components/modal';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react'
import { create_user_thunk, get_users_thunk } from '../_redux/user-management-thunk';
import store from '@/app/store/store';
import InputError from '@/Components/InputError';

export default function UserCreateSection() {
    const [isModalOpen, setModalOpen] = useState(false);
    const [errors, setErrors] = useState({})
    const [newAgent, setNewAgent] = useState();

    // Open and close modal functions
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAgent((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newAgentData = {
                name: newAgent?.name,
                email: newAgent?.email,
                password: newAgent?.password,
                role_id: newAgent?.role_id,
            };
    
            const res = await store.dispatch(create_user_thunk(newAgentData));
    
            if (res?.status === 200) {
                await store.dispatch(get_users_thunk());
    
                // Clear form and errors
                setNewAgent({
                    name: '',
                    email: '',
                    password: '',
                    role_id: '',
                });
                setErrors([]); // Clear errors after success
                closeModal();
            } else {
                const errorData = res?.response?.data?.errors;
                if (errorData) {
                    setErrors(errorData);
                } else {
                    setErrors(['An unexpected error occurred.']);
                    console.error('Unexpected error:', res);
                }
            }
        } catch (error) {
            console.error('Error saving user:', error);
            const responseErrors = error.response?.data?.errors;
            if (responseErrors) {
                setErrors(responseErrors);
            } else {
                setErrors(['An error occurred while saving the user.']);
            }
        }
    };
    
    
    

    const typeOptions = [
        { value: '1', label: 'Admin' },
        { value: '2', label: 'User' },
        { value: '3', label: 'Household' },
    ];

    return (
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Button
                type="button"
                variant="primary"
                size="md"
                isLoading={false}
                disabled={false}
                icon={<PlusIcon className="h-5 w-5" />}
                onClick={openModal}
            >
                Add User
            </Button>

            <Modal isOpen={isModalOpen} onClose={closeModal} width=' w-1/4'>
                <h2 className="text-xl font-semibold mb-4">Add New User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <InputLabelComponent htmlFor="name" labelText="Name" />
                        <InputTextComponent
                            id="name"
                            name="name"
                            type="text"
                            required
                            value={newAgent?.name || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <InputLabelComponent htmlFor="email" labelText="Email" />
                        <InputTextComponent
                            id="email"
                            name="email" // Match this with the state key
                            type="email"
                            required
                            value={newAgent?.email || ""}
                            onChange={handleChange}
                        />
                        <InputError message={errors?.email} className="mt-2" />
                    </div>

                    <div className="mb-4">
                        <InputLabelComponent htmlFor="password" labelText="Password" />
                        <InputTextComponent
                            id="password"
                            name="password"
                            type="password"
                            required
                            value={newAgent?.password || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-4">
                        <InputLabelComponent htmlFor="role_id" labelText="Role" />
                        <SelectComponent
                            id="role_id"
                            name="role_id"
                            options={typeOptions}
                            required
                            value={newAgent?.role_id || ""}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="submit"
                            variant="primary"
                            size="md"
                            isLoading={false}
                            disabled={false}
                        >
                            Save
                        </Button>

                        <Button
                            type="button"
                            variant="danger"
                            size="md"
                            isLoading={false}
                            disabled={false}
                            onClick={closeModal}
                        >
                            <XMarkIcon className="h-5 w-5" />
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    )
}