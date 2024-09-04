import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import HomeScreen from "./src/screens/HomeScreen";
import Lista from "./src/screens/Lista";  

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    List: Lista,
  },
  {
    initialRouteName: "LList",
    defaultNavigationOptions: {
      title: "App",
    },
  }
);

export default createAppContainer(navigator);
