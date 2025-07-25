import { isAllowedSnapIndex, SNAP_CLOSE, SNAP_NDX_VALUES } from '@/constants/common';
import { useAppDispatch, useAppSelector } from '@/store';
import { setBottomSheetHeight, setBottomSheetSnapIndex } from '@/store/slices/navigationSlice';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useFocusEffect, usePathname } from 'expo-router';
import React, { forwardRef, memo, ReactNode, Ref, useCallback, useEffect, useImperativeHandle, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BACKGROUND_COLOR_MAIN, PADDING_NORMAL } from '@/constants/style';
import { runOnJS, useAnimatedReaction, useSharedValue } from 'react-native-reanimated';

export interface BottomSheetHandle {
    snapToIndex: (index: number) => void;
    close: () => void;
}

const BottomSheetContainer = forwardRef(({ children }: { children: ReactNode }, ref: Ref<BottomSheetHandle | null>) => {
    console.log('RENDERS BS');
    const dispatch = useAppDispatch();
    const pathname = usePathname();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const snapIndex = useAppSelector(state => state.navigationSlice.bottomSheetSnapIndex);

    const DISPLAY_CLOSE_BUTTON = snapIndex !== null;

    useFocusEffect(
        useCallback(() => {
            return () => {
                bottomSheetRef?.current?.close();
            };
        }, [pathname])
    );

    useImperativeHandle(ref, () => {
        return {
            snapToIndex: (index: number) => {
                bottomSheetRef?.current?.snapToIndex(index);
            },
            close: () => {
                bottomSheetRef?.current?.close();
            }
        };
    });

    const snapPoints = (numberPointValues: Array<number>): Array<string> => {
        const resArray: Array<string> = numberPointValues.map(item => item.toString() + '%');
        return resArray;
    };    

    if (bottomSheetRef === null) return;
    return (
        <>
            <BottomSheet            
                enableContentPanningGesture={false}
                index={snapIndex !== null ? snapIndex : SNAP_CLOSE}
                ref={bottomSheetRef}
                snapPoints={snapPoints(SNAP_NDX_VALUES)}
                onChange={e => {
                    dispatch(setBottomSheetSnapIndex(e !== SNAP_CLOSE ? isAllowedSnapIndex(e) : null));
                }}
                backgroundStyle={{ backgroundColor: BACKGROUND_COLOR_MAIN }}
                enablePanDownToClose>

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            paddingHorizontal: PADDING_NORMAL,
                            paddingVertical: 0
                        }}
                        onPress={() => bottomSheetRef.current?.close()}>
                        <MaterialCommunityIcons size={30} name="close" />
                    </TouchableOpacity>
                    <BottomSheetView
                        style={{
                            flex: 1,
                            paddingTop: 35,
                            height: '100%',
                            paddingBottom: 50
                        }}>
                        {children}
                    </BottomSheetView>
               
            </BottomSheet>
        </>
    );
});
export default memo(BottomSheetContainer);
