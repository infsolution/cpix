import { registerRootComponent } from 'expo';

import { Home } from './src/app/Home';
import { Login } from '@/app/Login';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(Login);
