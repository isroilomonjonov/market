'use client'
import RequireAuth from '@/components/requireAuth'
import React from 'react'
import ReduxProvider from '../storeProvider'
import UserUpdateComponent from '@/components/users/userUpdate'
import UserInfo from '@/components/users/userInfo'

const SettingsPage = () => {

    return (
        <ReduxProvider><div className='container pt-12'><RequireAuth>
            <h1>Settings</h1>
            <UserInfo />
            {/* <UserUpdateComponent /> */}
        </RequireAuth></div></ReduxProvider>
    )
}

export default SettingsPage