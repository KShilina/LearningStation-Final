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

const theme = createTheme();

const Component = () => {
  return (
    <div className="appContainer">
      <AppBar className="appBar" position="static" color="inherit">
        <Typography variant="h2" align="center">Video Chat</Typography>
      </AppBar>
      <VideoPlayer />
      <Sidebar>
        <Notifications />
      </Sidebar>
    </div>
  );
};

function App(props) {
 return <ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>;
}

export default App;