import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useRef } from 'react';
import { PaperProvider } from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import { useColorScheme } from '@/hooks/useColorScheme';
import { StyleSheet } from 'react-native';
import store, { RootState } from '@/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AddEventContainer from '@/components/AddEventContainer/AddEventContainer';
import BsContextProvider from '@/components/BottomsheetProvider/BottomsheetProvider';
import BottomSheet from '@gorhom/bottom-sheet';
import useLocation from '@/hooks/useLocation';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import ImageModal from '@/components/ImageModal/ImageModal';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Центрирование содержимого по вертикали
        alignItems: 'center', // Центрирование содержимого по горизонтали
        padding: 10,
        height: '100%',
        width: '50%',
        backgroundColor: 'red',
        gap: 67
    }
});

const App = () => {
    const { isLoggedIn, error } = useSelector((state: RootState) => state.login);   
    const bsControls = useRef<BottomSheet>(null);
    useLocation();
    return (
        <>
            <Stack>
                <Stack.Screen redirect={isLoggedIn} name="(common)" options={{ headerShown: false }} />
                <Stack.Screen redirect={!isLoggedIn} name="(protected)" options={{ headerShown: false }} />
                <Stack.Screen redirect={!isLoggedIn} name="map" options={{ headerShown: false }} />
                <Stack.Screen name="+not-found" />
            </Stack>

            <BsContextProvider ref={bsControls}>
                <AddEventContainer />
            </BsContextProvider>
        </>
    );
};

export default function RootLayout() {
    const colorScheme = useColorScheme();
    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf')
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <Provider store={store}>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                    <PaperProvider>
                        <GestureHandlerRootView>
                            <App />
                            <ImageModal />
                        </GestureHandlerRootView>
                    </PaperProvider>
                </ThemeProvider>
            </Provider>
        </SafeAreaProvider>
    );
}
