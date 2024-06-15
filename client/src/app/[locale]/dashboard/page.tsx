'use client'
import RequireAuth from '@/components/requireAuth'
import React from 'react'
import ReduxProvider from '../storeProvider'
import DashboardContainer from '@/components/dashboard/dashboard-container'

const Dashboard = () => {
    return (
        <ReduxProvider>
            <RequireAuth>
                <DashboardContainer />
            </RequireAuth>
        </ReduxProvider>
    )
}

export default Dashboard