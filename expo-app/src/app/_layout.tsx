import "@/global.css";
import { store } from "@/redux/store";
import { updateCurrentTemperature } from "@/utils/termostats";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Provider } from "react-redux";

const AppInsideRedux = () => {
  // This works as a cronjob
  useEffect(() => {
    setInterval(() => {
      updateCurrentTemperature();
    }, 500);
  }, []);

  return <Stack screenOptions={{ header: HeaderComponent }} />;
};

function RootLayout() {
  return (
    <Provider store={store}>
      <AppInsideRedux />
    </Provider>
  );
}

const HeaderComponent = () => null;

export default RootLayout;
