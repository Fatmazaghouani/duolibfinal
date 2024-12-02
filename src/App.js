import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Starting from './frontend/screens/Starting/Starting';
import OurPhilosophy from './frontend/screens/Starting/Our philosophy';
import Transparency from './frontend/screens/Starting/transparency';
import AboutUsScreen from './frontend/screens/Starting/about us';
import ContactUsScreen from './frontend/screens/Starting/get in touch';
import SupportDuolibScreen from './frontend/screens/Starting/support Duolib';
import Go from './frontend/screens/Starting/Go';
import Go2Screen from './frontend/screens/Starting/go2';
import Donate from './frontend/screens/Starting/Donate';
import FAQPage from './frontend/screens/Starting/Help';
import FeedScreen from './frontend/screens/Starting/feed';
import ReponseScreen from './frontend/screens/Starting/reponse'; 
import WelcomeScreen from "./frontend/screens/SignIn/WelcomeScreen";
import LoginScreen from './frontend/screens/SignIn/LoginScreen';
import Signup from "./frontend/screens/SignUp/Signup"
import Signup2 from "./frontend/screens/SignUp/Signup2"
import Signup3 from "./frontend/screens/SignUp/Signup3"
import PersonScreen from "./frontend/screens/SignUp/PersonScreen"
import Feed from "./frontend/screens/Home/feed"




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Starting">
        <Stack.Screen name="Starting" component={Starting} />
        <Stack.Screen name="Our philosophy" component={OurPhilosophy} />
        <Stack.Screen name="Transparency" component={Transparency} />
        <Stack.Screen name="about us" component={AboutUsScreen} />
        <Stack.Screen name="support Duolib" component={SupportDuolibScreen} />
        <Stack.Screen name="get in touch" component={ContactUsScreen} />
        <Stack.Screen name="Go" component={Go} />
        <Stack.Screen name="Go2" component={Go2Screen} />
        <Stack.Screen name="feed" component={FeedScreen} />
        <Stack.Screen name="Donate" component={Donate} />
        <Stack.Screen name="Help" component={FAQPage} />
        <Stack.Screen name="Reponse" component={ReponseScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Signup2" component={Signup2} />
        <Stack.Screen name="Signup3" component={Signup3} />
        <Stack.Screen name="PersonScreen" component={PersonScreen} />
        <Stack.Screen name="Feed" component={Feed} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;