import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import IncomeScreen from './screens/IncomeScreen';
import ExpensesScreen from './screens/ExpensesScreen';
import PersonalityScreen from './screens/PersonalityScreen';
import HomeScreen from './screens/HomeScreen';
import GoalsScreen from './screens/GoalsScreen';
import SubscriptionsScreen from './screens/SubscriptionsScreen';
import SplitScreen from './screens/SplitScreen';
import CreditCoachScreen from './screens/CreditCoachScreen';
import CIBILScreen from './screens/CIBILScreen';
import AskTroveScreen from './screens/AskTroveScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: '#0A0A0A' },
        }}
      >
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Income" component={IncomeScreen} />
        <Stack.Screen name="Expenses" component={ExpensesScreen} />
        <Stack.Screen name="Personality" component={PersonalityScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Goals" component={GoalsScreen} />
        <Stack.Screen name="Subscriptions" component={SubscriptionsScreen} />
        <Stack.Screen name="Split" component={SplitScreen} />
        <Stack.Screen name="CreditCoach" component={CreditCoachScreen} />
        <Stack.Screen name="CIBIL" component={CIBILScreen} />
        <Stack.Screen name="AskTrove" component={AskTroveScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}