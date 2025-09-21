import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TasksProvider } from './TasksContext';
import TaskList from './TaskList';

const Tab = createBottomTabNavigator();

function AllTasks() {
  return <TaskList filter="all" />;
}

function PendingTasks() {
  return <TaskList filter="pending" />;
}

function CompletedTasks() {
  return <TaskList filter="completed" />;
}

export default function App() {
  return (
    <TasksProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#007bff',
            tabBarInactiveTintColor: '#6c757d',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopColor: '#dee2e6',
              borderTopWidth: 1,
              paddingBottom: 5,
              paddingTop: 5,
              height: 60,
            },
            headerStyle: {
              backgroundColor: '#007bff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Tab.Screen
            name="All"
            component={AllTasks}
            options={{
              tabBarLabel: 'All Tasks',
              headerTitle: 'All Tasks',
            }}
          />
          <Tab.Screen
            name="Pending"
            component={PendingTasks}
            options={{
              tabBarLabel: 'Pending',
              headerTitle: 'Pending Tasks',
            }}
          />
          <Tab.Screen
            name="Completed"
            component={CompletedTasks}
            options={{
              tabBarLabel: 'Completed',
              headerTitle: 'Completed Tasks',
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </TasksProvider>
  );
}
