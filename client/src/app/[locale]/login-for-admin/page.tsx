'use client'
import LoginComponent from '@/components/login';
import ReduxProvider from '../storeProvider';
const Login = () => {
    return (
        <ReduxProvider>
            <LoginComponent />
        </ReduxProvider>
    )
}

export default Login