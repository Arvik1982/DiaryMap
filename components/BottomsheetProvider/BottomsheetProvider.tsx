import React, { createContext, forwardRef, ReactNode, useImperativeHandle, useRef } from 'react';
import BottomSheetContainer, { BottomSheetHandle } from '../BottomSheetContainer/BottomSheetContainer';

export const BsContext = createContext<React.RefObject<BottomSheetHandle> | null>(null);

const BsContextProvider = forwardRef<BottomSheetHandle, { children: ReactNode }>(({ children }, ref) => {
    const bsRef = useRef<BottomSheetHandle>(null);
    useImperativeHandle(ref, () => bsRef.current!, [bsRef.current]);
    return (
        <BsContext.Provider value={bsRef}>
            <BottomSheetContainer ref={bsRef}>{children}</BottomSheetContainer>
        </BsContext.Provider>
    );
});

export default BsContextProvider;
