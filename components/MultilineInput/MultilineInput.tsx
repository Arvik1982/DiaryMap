import { BORDER_RADIUS_NORMAL, FONT_SIZE_NORMAL, PADDING_MAX, PADDING_NORMAL } from '@/constants/style';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-paper';

export default function MultilineInput() {
    const [text, setText] = useState('');

    return (
        <TextInput
            mode="outlined"
            theme={{ roundness: BORDER_RADIUS_NORMAL }}
            style={styles.input}
            multiline={true}
            numberOfLines={8}
            onChangeText={setText}
            value={text}
            placeholder="Введите описание"
            textAlignVertical="top"
            outlineColor="transparent"
            activeOutlineColor="orange"
        />
    );
}
const styles = StyleSheet.create({
    input: {
        borderColor: 'transparent',
        height: 200,     
        backgroundColor: 'white',
        paddingVertical: PADDING_NORMAL,
        paddingHorizontal:PADDING_NORMAL,
        fontSize: FONT_SIZE_NORMAL
    }
});
