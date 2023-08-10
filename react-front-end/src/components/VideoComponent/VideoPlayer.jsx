// import React, { useContext } from 'react';
// import { Grid, Typography, Paper} from '@mui/material';

// import { SocketContext } from '../../Context';


// const VideoPlayer = () => {
//   const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

//   return (
//     <Grid container>
//       {stream && (
//         <Paper>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
//             <video playsInline muted ref={myVideo} autoPlay />
//           </Grid>
//         </Paper>
//       )}
//       {callAccepted && !callEnded && (
//         <Paper>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
//             <video playsInline ref={userVideo} autoPlay />
//           </Grid>
//         </Paper>
//       )}
//     </Grid>
//   );
// };

// export default VideoPlayer;

import React, { useContext } from 'react';
import { Grid, Typography, Paper } from '@mui/material';
import { SocketContext } from '../../Context';
import './VideoPlayer.scss'; // Import the SCSS file

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

  return (
    <Grid container className="videoPlayerContainer">
      {stream && (
        <Paper className="videoPlayerPaper">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
            <video playsInline muted ref={myVideo} autoPlay className="videoElement" />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className="videoPlayerPaper">
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
            <video playsInline ref={userVideo} autoPlay className="videoElement" />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;