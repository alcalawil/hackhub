import { ApolloProvider } from '@apollo/client';
import AppProvider from './contexts/app/AppProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { apolloClient } from './lib/apollo/apolloClient';
// components
import Navbar from './components/Navbar';
import Topbar from './components/Topbar';
// views
import Home from './views/Home';
import UserProfile from './views/UserProfile';
import Attendees from './views/Attendees';
import Events from './views/Events';
import EventDetails from './views/EventDetails';
import Organizer from './views/Organizer';
import Chat from './views/Chat';

import './styles/App.css';

const App = () => {

  return (
    <AppProvider>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Topbar />
          <Navbar />
          <Routes>
            <Route path='' element={<Home />} />
            <Route path='chat' element={<Chat />} />
            <Route path='attendees' element={<Attendees />} />
            <Route path='events'>
              <Route path='' element={<Events />} />
              <Route path='details' element={<EventDetails />}/>
            </Route>
            <Route path='profile' element={<UserProfile />} />
            <Route path='organizer' element={<Organizer />} />
          </Routes>
        </BrowserRouter>
      </ApolloProvider>
    </AppProvider>
  )
}

export default App
