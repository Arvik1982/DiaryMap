import { ImagePickerAsset } from "expo-image-picker";

export type TCoordinates = [number, number] ;

export type TEventType = {
    fotos: ImagePickerAsset[];
    date: number;
    coordinates: TCoordinates;
};