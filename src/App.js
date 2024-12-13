import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Starting from './frontend/screens/Starting/Starting';
import ChatbotScreen from './frontend/screens/Starting/ChatbotScreen';
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
import CompanyScreen from "./frontend/screens/SignUp/CompanyScreen"
import form from "./frontend/screens/SignUp/form"
import Step3 from "./frontend/screens/SignUp/Step3"
import Feed from "./frontend/screens/Home/feed"
import PersonWithDesease from "./frontend/screens/SignUp/PersonWithDesease"
import Photo1 from "./frontend/screens/SignUp/Photo1"
import Photo2 from "./frontend/screens/SignUp/Photo2"
import Photo3 from "./frontend/screens/SignUp/Photo3"
import Photo4 from "./frontend/screens/SignUp/Photo4"
import FormCompany from "./frontend/screens/SignUp/FormCompany"
import Birthday from "./frontend/screens/SignUp/birthday"
import Photo0 from "./frontend/screens/SignUp/Photo0"
import AccountVerification from "./frontend/screens/SignUp/AccountVerification"
import PasswordReset from "./frontend/screens/ResetPassword/PasswordReset"
import ChatScreen from './frontend/screens/Messagerie/ChatScreen';
import MessagesScreen from './frontend/screens/Messagerie/MessagesScreen';
import ForumScreen from './frontend/screens/Forum/ForumScreen';
import ForumColonCancer from './frontend/screens/Forum/ForumColonCancer';
import ForumChatRules from './frontend/screens/Forum/ForumChatRules';
import SettingsScreen from './frontend/screens/Settings/Settings';
import EditProfileScreen from './frontend/screens/Settings/Edit Profile';
import NotificationSettingsScreen from './frontend/screens/Settings/Notification';
import LanguageScreen from './frontend/screens/Settings/Language';
import ViewingSharingScreen from './frontend/screens/Settings/Viewing and Sharing';
import PasswordSecurityScreen from './frontend/screens/Settings/Password & Security';
import Logout from "./frontend/screens/Settings/Logout";
import DuoStart from "./frontend/screens/Duo/DuoStart";
import DuoPreferences from "./frontend/screens/Duo/DuoPreferences";
import DuoSuggestions from "./frontend/screens/Duo/DuoSuggestions";
import DuoDone from "./frontend/screens/Duo/DuoDone";
import DuoChange from "./frontend/screens/Duo/DuoChange";
import ProfileScreen from "./frontend/screens/Profile/ProfileScreen";
import EditPro from "./frontend/screens/Profile/EditPro";
import MyCommunityScreen from "./frontend/screens/Community/MyCommunityScreen";
import ForgotPasswordConfirmationScreen from './frontend/screens/ResetPassword/ForgotPasswordConfirmationScreen'; 
import VerificationScreen from './frontend/screens/ResetPassword/VerificationScreen'; 
import CreatePasswordScreen from './frontend/screens/ResetPassword/CreatePasswordScreen';
import PasswordSuccessScreen from './frontend/screens/ResetPassword/PasswordSuccessScreen';
import FriendScreen from './frontend/screens/Home/FriendScreen'; 








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
        <Stack.Screen name="CompanyScreen" component={CompanyScreen} />
        <Stack.Screen name="Feed" component={Feed} />
        <Stack.Screen name="form" component={form} />
        <Stack.Screen name="Step3" component={Step3} />
        <Stack.Screen name="PersonWithDesease" component={PersonWithDesease} />
        <Stack.Screen name="Photo1" component={Photo1} />
        <Stack.Screen name="Photo2" component={Photo2} />
        <Stack.Screen name="Photo3" component={Photo3} />
        <Stack.Screen name="Photo4" component={Photo4} />
        <Stack.Screen name="Birthday" component={Birthday} />
        <Stack.Screen name="FormCompany" component={FormCompany} />
        <Stack.Screen name="Photo0" component={Photo0} />
        <Stack.Screen name="AccountVerification" component={AccountVerification} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
        <Stack.Screen name="Chat" component={ChatScreen} />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="ForumScreen" component={ForumScreen}  />
        <Stack.Screen name="ForumColonCancer" component={ForumColonCancer}  />
        <Stack.Screen name="ForumChatRules" component={ForumChatRules}/>
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Edit Profile" component={EditProfileScreen} />
        <Stack.Screen name="Notification" component={NotificationSettingsScreen} />
        <Stack.Screen name="Language" component={LanguageScreen} />
        <Stack.Screen name="Viewing and Sharing" component={ViewingSharingScreen} />
        <Stack.Screen name="Password & Security" component={PasswordSecurityScreen} />
        <Stack.Screen name="Logout" component={Logout} />
        <Stack.Screen name="DuoStart" component={DuoStart} />
        <Stack.Screen name="DuoPreferences" component={DuoPreferences} />
        <Stack.Screen name="DuoSuggestions" component={DuoSuggestions} />
        <Stack.Screen name="DuoDone" component={DuoDone} />
        <Stack.Screen name="DuoChange" component={DuoChange} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="ChatbotScreen" component={ChatbotScreen} />
        <Stack.Screen name="EditPro" component={EditPro} />
        <Stack.Screen name="MyCommunityScreen" component={MyCommunityScreen} />
        <Stack.Screen name="ForgotPasswordConfirmationScreen" component={ForgotPasswordConfirmationScreen}   />
        <Stack.Screen name="VerificationScreen" component={VerificationScreen}   />
        <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} />
        <Stack.Screen name="PasswordSuccessScreen" component={PasswordSuccessScreen} />
        <Stack.Screen name="FriendScreen" component={FriendScreen} />
        
        


       
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
