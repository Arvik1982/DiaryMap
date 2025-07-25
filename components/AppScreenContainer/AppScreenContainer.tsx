import { ReactElement, ReactNode } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { transparent } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import BottomSheetContainer from '../BottomSheetContainer/BottomSheetContainer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center', // Центрирование содержимого по вертикали
        alignItems: 'center', // Центрирование содержимого по горизонтали
        padding: 5,
        gap: 30
        // backgroundColor:'orange'
    }
});

export default function AppScreenContainer({ children }: { children: ReactNode; }) {
    return <View style={styles.container}>{children}</View>;
}