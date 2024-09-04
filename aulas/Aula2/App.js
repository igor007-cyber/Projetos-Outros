import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Pagina from "./src/screens/Pagina";
import Lista from "./src/screens/Lista";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Componentes: Pagina,
    List: Lista,
  },
  {
    initialRouteName: "List",
    defaultNavigationOptions: {
      title: "App",
    },  
  }
);

export default createAppContainer(navigator);
