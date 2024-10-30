import { ApiProvider } from "@/src/context/ApiContext";
import { Home as HomeScreen } from "@/src/screens/home";

export default function App() {
  return (
    <ApiProvider>
      <HomeScreen />
    </ApiProvider>
  );
}
