import { Stack } from "expo-router";
import "@/global.css";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

function RootLayout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ header: HeaderComponent }} />
    </Provider>
  );
}

const HeaderComponent = () => null;

export default RootLayout;
