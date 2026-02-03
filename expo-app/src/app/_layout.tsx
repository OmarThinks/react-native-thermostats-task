import "@/global.css";
import { store } from "@/redux/store";
import { Stack } from "expo-router";
import { Provider } from "react-redux";

const AppInsideRedux = () => {
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
