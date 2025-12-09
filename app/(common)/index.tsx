import AppScreenContainer from "@/components/AppScreenContainer/AppScreenContainer";
import AppButton from "@/components/ui/AppButton/AppButton";
import { usePostAuthorizationDataMutation } from "@/store/api/authorizationApi";
import { useGetTeamsQuery } from "@/store/api/footballTeamsApi";
import { setLoginSuccess } from "@/store/slices/loginSlice";
import { useEffect, useState } from "react";
import { Text, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

export default function Index() {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();
  const { data } = useGetTeamsQuery("1");
  const [postAuthorizationData] = usePostAuthorizationDataMutation();

  useEffect(() => {
    console.log("DATA-1: ", data);
  }, [data]);

  const handleButtonPress = () => {
    postAuthorizationData({
      username: "",
      password: "123n",
      email: "phone.kulikovarseniy@gmail.com",
    });

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
