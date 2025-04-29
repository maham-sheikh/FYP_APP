import 'setimmediate';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './Components/redux/store'; 
import FindigoStart from './Components/FindigoStart/FindigoStart';
import ChooseRole from './Components/ChooseRole/ChooseRole';
import CustomerSide from './Components/CustomerSide/CustomerSide';
import BuisnessSide from './Components/BuisnessSide/BuisnessSide';
import CustomerLogin from './Components/CustomerLogin/CustomerLogin';
import CustomerSignUp from './Components/CustomerSignUp/CustomerSignUp';
import BusinessLogin from './Components/BuisnessLogin/BuisnessLogin';
import BusinessSignUp from './Components/BuisnessSignUp/BuisnessSignUp';
import Servicess from './Components/Servicess/Servicess';
import Homes from './Components/Homes/Homes';
import Likes from './Components/Likes/Likes';
import Discountss from './Components/Discountss/Discountss';
import Locationss from './Components/Locationss/Locationss';
import Service1 from './Components/Service1/Service1';
import Service2 from './Components/Service2/Service2';
import Service3 from './Components/Service3/Service3';
import Service4 from './Components/Service4/Service4';
import Service5 from './Components/Service5/Service5';
import Service6 from './Components/Service6/Service6';
import Service7 from './Components/Service7/Service7';
import Service1details from './Components/Service1/Service1details';
import Service2details from './Components/Service2/Service2details';
import Service3details from './Components/Service3/Service3details';
import Service4details from './Components/Service4/Service4details';
import Service5details from './Components/Service5/Service5details';
import Service6details from './Components/Service6/Service6details';
import Service7details from './Components/Service7/Service7details';
import ViewProfile from './Components/ViewProfile/ViewProfile';
import BusinessServices from './Components/BusinessServices/BusinessServices';
import BusinessConfirmation from './Components/BusinessServices/BusinessConfirmation';
import BusinessVerification from './Components/BusinessServices/BusinessVerification';
import VendorLogin from './Components/VendorLogin/VendorLogin';
import VendorSignup from './Components/VendorSignup/VendorSignup';
import VendorVerifySignup from './Components/VendorSignup/VendorVerifySignup';
import VendorAdress from './Components/VendorAdress/VendorAdress';
import VendorPassword from './Components/VendorPassword/VendorPassword';
import VendorDashboard from './Components/VendorDashboard/VendorDashboard';
import { LogBox } from 'react-native';
import VendorLocation from './Components/VendorDashboard/VendorLocation';
import VendorProfile from './Components/VendorDashboard/VendorProfile';
import {LocationProvider} from "./Components/Locationss/locationContext"

const Stack = createStackNavigator();

function App() {
  LogBox.ignoreLogs([
    "FirebaseRecaptcha: Support for defaultProps will be removed",
  ]);
  
  return (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <LocationProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="FindigoStart">
        <Stack.Screen
          name="FindigoStart"
          component={FindigoStart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChooseRole"
          component={ChooseRole}
          options={{ headerShown: false }}
        />
        
        <Stack.Screen
          name="CustomerSide"
          component={CustomerSide}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerLogin"
          component={CustomerLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CustomerSignUp"
          component={CustomerSignUp}
          options={{ headerShown: false }}
        />  
        

        <Stack.Screen
          name="BuisnessSide"
          component={BuisnessSide}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusinessLogin"
          component={BusinessLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusinessSignUp"
          component={BusinessSignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorLogin"
          component={VendorLogin}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorSignup"
          component={VendorSignup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorVerifySignup"
          component={VendorVerifySignup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorAdress"
          component={VendorAdress}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorPassword"
          component={VendorPassword}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorDashboard"
          component={VendorDashboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorLocation"
          component={VendorLocation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="VendorProfile"
          component={VendorProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusinessServices"
          component={BusinessServices}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusinessConfirmation"
          component={BusinessConfirmation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="BusinessVerification"
          component={BusinessVerification}
          options={{ headerShown: false }}
        />
        

        <Stack.Screen
          name="Homes"
          component={Homes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Servicess"
          component={Servicess}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Likes"
          component={Likes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Locationss"
          component={Locationss}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Discountss"
          component={Discountss}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service1"
          component={Service1}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service2"
          component={Service2}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service3"
          component={Service3}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service4"
          component={Service4}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service5"
          component={Service5}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service6"
          component={Service6}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service7"
          component={Service7}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service1details"
          component={Service1details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service2details"
          component={Service2details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service3details"
          component={Service3details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service4details"
          component={Service4details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service5details"
          component={Service5details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service6details"
          component={Service6details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service7details"
          component={Service7details}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ViewProfile"
          component={ViewProfile}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    </LocationProvider>
    </PersistGate>
    </Provider>
  );
}

export default App;