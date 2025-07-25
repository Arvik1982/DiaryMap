import AppScreenContainer from "@/components/AppScreenContainer/AppScreenContainer";
import AppButton from "@/components/ui/AppButton/AppButton";
import { setLoginSuccess } from "@/store/slices/loginSlice";
import { useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const handleButtonPress = () => {
    dispatch(setLoginSuccess(inputValue));
  };
  return (
    <AppScreenContainer>
      <Text>Добро пожаловать!</Text>
      <TextInput
        onChangeText={setInputValue}
        value={inputValue}
        label={"Имя"}
        mode="outlined"
        style={{ height: 50, width: "80%" }}
      ></TextInput>
      <AppButton onPress={handleButtonPress} text="Войти" />
    </AppScreenContainer>
  );
}
