import React, { useEffect } from 'react'
import AdminLayout from '../layout'
import UserCreateSection from './_sections/user-create-section';
import { get_users_thunk } from './_redux/user-management-thunk';
import store from '@/app/store/store';
import UserManagementTableSection from './_sections/user-management-table-section';

export default function UserManagementPage() {
  useEffect(() => {
    store.dispatch(get_users_thunk())
    console.log('main page', store)
  }, []);

  function handleAccountAdded(params) {
    // Handle account addition here
  }
  return (
    <AdminLayout>
      <div className="px-4 sm:px-6 lg:px-8">

        <div className="sm:flex sm:items-center">

          <div className="sm:flex-auto">

            <h1 className="text-base font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the users in your account including their name, title, email and role.
            </p>

          </div>

          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <UserCreateSection />
          </div>

        </div>

        <UserManagementTableSection />

      </div>
    </AdminLayout>
  )
}