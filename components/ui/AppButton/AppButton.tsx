import { colors } from '@/constants/colors';
import { BORDER_RADIUS_NORMAL, HEIGHT_BUTTON_NORMAL } from '@/constants/style';
import { ReactNode } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

type TButtonProps = {
    text?: string;
    onPress?: () => void;
};

export default function AppButton({ text, onPress }: TButtonProps) {
    return (
        <Button onPress={onPress} style={styles.container}>
          {text}
        </Button>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius:BORDER_RADIUS_NORMAL,
        width: '100%',
        height: HEIGHT_BUTTON_NORMAL,
        backgroundColor: colors.light.mainColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
