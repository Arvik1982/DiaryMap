import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Text } from 'react-native-paper';
import { setLogout } from '@/store/slices/loginSlice';
import { useDispatch } from 'react-redux';

export default function ProtectedLayout() {
    const colorScheme = useColorScheme();
    const dispatch = useDispatch();

    const handleButtonPress = () => {
        dispatch(setLogout());
    };

    return (
        <Tabs
            screenOptions={{
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => {
                            handleButtonPress();
                            // router.push('/');
                            // Действие при нажатии кнопки "Назад"
                            // Например, используйте router.back() для возврата на предыдущий экран
                            // router.back(); // Uncomment this if you have router imported
                        }}
                        style={{ padding: 10 }} // Добавьте отступы для удобства
                    >
                        <Text style={{ color: colors[colorScheme ?? 'light'].tint }}>Назад</Text>
                    </TouchableOpacity>
                ),
                tabBarActiveTintColor: colors[colorScheme ?? 'light'].tint,
                headerShown: true,
                // tabBarButton: '',
                // tabBarBackground: '',
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute'
                    },
                    default: {}
                })
            }}>
            <Tabs.Screen
                name="main"
                options={{
                    title: 'Главная'
                    // tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color}
                    // />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Профиль'
                    // tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color}
                    // />,
                }}
            />
        </Tabs>
    );
}
