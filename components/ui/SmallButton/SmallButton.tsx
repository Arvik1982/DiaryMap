import { BORDER_RADIUS_NORMAL, COLOR_ELEMENT_MAIN, FONT_SIZE_NORMAL, HEIGHT_BUTTON_NORMAL, PADDING_NORMAL } from '@/constants/style';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { Text } from 'react-native-paper';

type IconName = keyof typeof MaterialCommunityIcons.glyphMap;

export default function SmallButton({
    action,
    name,
    description,
    icon
}: {
    action: () => void;
    name: string;
    description: string;
    icon?: IconName;
}) {
    return (
        <TouchableOpacity
            onPress={action}
            style={{
                width: 50,
                height: HEIGHT_BUTTON_NORMAL,
                borderRadius: BORDER_RADIUS_NORMAL,
                padding: PADDING_NORMAL,
                backgroundColor: COLOR_ELEMENT_MAIN,
                alignItems: 'center',
                justifyContent: 'space-between',
                
            }}>
            {!icon &&<Text style={{ fontSize: FONT_SIZE_NORMAL }}>{name}</Text>}
            {icon && <MaterialCommunityIcons name={icon} size={30} color="black" />}
            {!icon &&<Text>{description}</Text>}
        </TouchableOpacity>
    );
}
