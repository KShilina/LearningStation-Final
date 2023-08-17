// import React from 'react';
// import { Typography, AppBar } from '@mui/material';
// import { createTheme, ThemeProvider } from '@mui/material/styles';


// import VideoPlayer from './VideoPlayer';
// import Sidebar from './Sidebar';
// import Notifications from './Notifications';

// const theme = createTheme();

// const Component = () => {

//   return (
//     <div>
//       <AppBar position="static" color="inherit">
//         <Typography variant="h2" align="center">Video Chat</Typography>
//       </AppBar>
//       <VideoPlayer />
//       <Sidebar>
//         <Notifications />
//       </Sidebar>
//     </div>
//   );
// };

// function App(props) {
//  return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
//     }

// export default App;

import React from 'react';
import { Typography, AppBar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import VideoPlayer from './VideoPlayer';
import Sidebar from './Sidebar';
import Notifications from './Notifications';
import './App.scss'; // Import the SCSS file
import Navbar from '../Navbar';
import Footer from '../Footer';

const theme = createTheme();

const Component = () => {
  return (
    <>
      <Navbar />

      <div className="appContainer">
      
        <AppBar className="appBar" position="static" color="inherit">
          <Typography variant="h2" align="center">Video Chat</Typography>
        </AppBar>
        <VideoPlayer />
        <Sidebar>
          <Notifications />
        </Sidebar>
      </div>

      <footer className="video-footer">
      <div className="footer-content">
        123 Demo Street, Toronto ON   | ☎  +1 (647) 000-0000   |   email@learningStation.ca
        <br/>
        © {new Date().getFullYear()} Learning Station. All rights reserved.
      </div>
    </footer>

    </>
  );
};

function App(props) {
 return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
}

export default App;