import { Stack } from 'expo-router';
import React from 'react';

import { useColorScheme } from '@/hooks/useColorScheme';

export default function ComonLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            initialRouteName="index"
            screenOptions={{
                headerShown: true
            }}>
            <Stack.Screen name="index" options={{ headerShown: true, title: 'Вход' }}></Stack.Screen>
        </Stack>
    );
}
