import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import SmallButton from '../ui/SmallButton/SmallButton';
import { useAppDispatch, useAppSelector } from '@/store';
import { setEventDate } from '@/store/slices/eventsSlice';

const DatePickerComponent = () => {

    const dispatch = useAppDispatch();

    const [open, setOpen] = useState(false);    
    const date = useAppSelector(state => state.eventSlice.eventDate);
    const setDate = (date: Date): void => {
        dispatch(setEventDate(date.getTime()));
    };    

    return (
        <>
            <SmallButton icon="calendar-plus" name="Когда" description="Дата события" action={() => setOpen(true)} />
            <DatePicker
                title={'Дата время'}
                confirmText="Сохранить"
                cancelText="Отмена"
                modal
                is24hourSource="locale"
                open={open}
                date={new Date(date)}
                locale="ru-Ru"
                onConfirm={date => {
                    setOpen(false);
                    setDate(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
            />
        </>
    );
};

export default DatePickerComponent;
