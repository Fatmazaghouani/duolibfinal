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
import Login from './frontend/screens/Starting/log in';
import FeedScreen from './frontend/screens/Starting/feed';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Starting">
        <Stack.Screen name="Starting" component={Starting} />
        <Stack.Screen name="Our philosophy" component={OurPhilosophy} />
        <Stack.Screen name="Transparency" component={Transparency} />
        <Stack.Screen name="log in" component={Login} />
        <Stack.Screen name="about us" component={AboutUsScreen} />
        <Stack.Screen name="support Duolib" component={SupportDuolibScreen} />
        <Stack.Screen name="get in touch" component={ContactUsScreen} />
        <Stack.Screen name="Go" component={Go} />
        <Stack.Screen name="Go2" component={Go2Screen} />
        <Stack.Screen name="feed" component={FeedScreen} />
        <Stack.Screen name="Donate" component={Donate} />
        <Stack.Screen name="Help" component={FAQPage} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;