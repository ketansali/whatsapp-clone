import './App.css';
import Messanger from './components/Messanger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from './context/AccountProvider';
function App() {
  return (
    <GoogleOAuthProvider clientId='604183139079-g6c2g8m8mlpri8kgenm4eo6aieeiphr2.apps.googleusercontent.com'>
    <AccountProvider>

     <Messanger/>
    </AccountProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
