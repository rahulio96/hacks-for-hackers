import { UserProvider } from '@/contexts/UserConfig'
import { Stack } from 'expo-router'

export default function _layout() {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name="index" options={{headerShown: false}} />
                <Stack.Screen name="auth/login" options={{headerShown: false}} />
                <Stack.Screen name="auth/signup" options={{headerShown: false}} />
            </Stack>
        </UserProvider>
    )
}