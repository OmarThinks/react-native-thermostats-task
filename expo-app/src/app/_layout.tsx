import "@/global.css";
import { useGetThermostatCronJobQuery } from "@/redux/api/thermostatsApi/thermostatsApi";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

const AppInsideRedux = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _ = useGetThermostatCronJobQuery(
    { canFail: false },
    { pollingInterval: 300 },
  );
  // This works as a cronjob

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
