import React, { useEffect } from 'react'
import InputLabelComponent from "@/app/pages/components/input-label-component";
import InputTextComponent from "@/app/pages/components/input-text-component";
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function LoginFormSection({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('auth_login'));
    };
    return (
        <form onSubmit={submit}>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-6">

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
                <div>
                    <InputLabelComponent htmlFor="email" labelText="Email address" />
                    <InputTextComponent
                        id="emial"
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <InputLabelComponent htmlFor="password" labelText="Password" />
                    <InputTextComponent
                        id="password"
                        name="password"
                        type="password"
                        required
                        autoComplete="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <a href="/admin/dashboard" >
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign in
                        </button>
                    </a>
                </div>

            </div>
        </form>
    )
}
