import { Tabs } from 'expo-router'

export default function _layout() {
    return (

        <Tabs>
            <Tabs.Screen name="home" options={{headerShown: false}} />
        </Tabs>

    )
}