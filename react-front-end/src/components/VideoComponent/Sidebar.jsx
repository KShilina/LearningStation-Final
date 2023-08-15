// import React, { useState, useContext } from 'react';
// import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
// import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';

// import { SocketContext } from '../../Context';


// const Sidebar = ({ children }) => {
//   const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
//   const [idToCall, setIdToCall] = useState('');

//   console.log(me);

//   return (
//     <Container>
//       <Paper elevation={10} >
//         <form noValidate autoComplete="off">
//           <Grid container>
//             <Grid item xs={12} md={6}>
//               <Typography gutterBottom variant="h6">Account Info</Typography>
//               <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
//               <CopyToClipboard text={me}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   fullWidth
//                   startIcon={<Assignment fontSize="large" />}
//                   onClick={() => {
//                     console.log('Copy button clicked:', me);
//                   }}
//                 >
//                   Copy Your ID
//                 </Button>
//               </CopyToClipboard>
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <Typography gutterBottom variant="h6">Make a call</Typography>
//               <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
//               {callAccepted && !callEnded ? (
//                 <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
//                   Hang Up
//                 </Button>
//               ) : (
//                 <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
//                   Call
//                 </Button>
//               )}
//             </Grid>
//           </Grid>
//         </form>
//         {children}
//       </Paper>
//     </Container>
//   );
// };

// export default Sidebar;

import React, { useState, useContext } from 'react';
import { Button, TextField, Grid, Typography, Container, Paper } from '@mui/material';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Assignment, Phone, PhoneDisabled } from '@mui/icons-material';
import { SocketContext } from '../../Context';
import './Sidebar.scss'; // Import the SCSS file

const Sidebar = ({ children }) => {
  const { me, callAccepted, name, setName, callEnded, leaveCall, callUser, newUser } = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState();

  console.log(me);

  return (
    <Container className="sidebarContainer">
      <Paper elevation={10} className="sidebarPaper">
        <form noValidate autoComplete="off">
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Account Info</Typography>
              <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
              <CopyToClipboard text={me}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                  onClick={() => {
                    console.log('Copy button clicked:', me);
                  }}
                >
                  Copy Your ID
                </Button>
              </CopyToClipboard>
              <CopyToClipboard text={newUser}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                  onClick={() => {
                    console.log('Copy button clicked:', newUser);
                  }}
                >
                  Copy new User ID
                </Button>
              </CopyToClipboard>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography gutterBottom variant="h6">Make a call</Typography>
              <TextField label="ID to call" value={idToCall} onChange={(e) => setIdToCall(e.target.value)} fullWidth />
              {callAccepted && !callEnded ? (
                <Button variant="contained" color="secondary" startIcon={<PhoneDisabled fontSize="large" />} fullWidth onClick={leaveCall}>
                  Hang Up
                </Button>
              ) : (
                <Button variant="contained" color="primary" startIcon={<Phone fontSize="large" />} fullWidth onClick={() => callUser(idToCall)}>
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  );
};

export default Sidebar;