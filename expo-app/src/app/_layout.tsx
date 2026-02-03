import "@/global.css";
import { useGetThermostat1Query } from "@/redux/api/thermostatsApi/thermostatsApi";
import { store } from "@/redux/store";
import "@/utils/polyfills";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { initDatabase } from "@/db/dbFunctions";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const AppInsideRedux = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = useGetThermostat1Query(undefined, { pollingInterval: 100 });

  return <Stack screenOptions={{ header: HeaderComponent }} />;
};

function RootLayout() {
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    initDatabase().then(() => {
      setIsDbInitialized(true);
    });
  }, []);

  if (!isDbInitialized) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <AppInsideRedux />
    </Provider>
  );
}

const HeaderComponent = () => null;

export default RootLayout;
