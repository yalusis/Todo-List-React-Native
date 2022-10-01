import * as Font from "expo-font"
import AppLoading from 'expo-app-loading';
import{ useState } from 'react';
import { TodoState } from './src/context/todo/TodoState';
import { MainLayout } from './src/MainLayout';
import { ScreenState } from "./src/context/screen/ScreenState";

async function loadAplication() {
  await Font.loadAsync({
    'roboto-regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf')
  })
}

export default function App() {
  const [isReady, SetisReady] = useState(false)

  if(!isReady) {
    return <AppLoading 
    startAsync={loadAplication} 
    onError={console.warn}
    onFinish={() => SetisReady(true)}/>
  }
 
  return (
    <ScreenState>
      <TodoState>
       <MainLayout />
      </TodoState>
    </ScreenState>
  );
}
