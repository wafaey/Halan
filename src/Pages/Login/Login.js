import React,{useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {useHistory} from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import zoneAPIs from "../../APIs/ZonesAPIs/zonesAPIs";
import './Login.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login= () => {
  const history = useHistory();
  const [userName, setUserName ]=useState('');
  const [password, setPassword ]=useState('');
  const [msg, setMsg ]=useState('');
  const [open, setOpen] = React.useState(false);
  async function userLogin(){
   var result = await zoneAPIs.callUserLogin(userName,password,1);
   if(result==='Auth sucessful'){
      history.push('/maps');
      }else if(result){
        setMsg(result);
        setOpen(true);
      }
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="Login">
    <Container component="main" maxWidth="xs">
    <Snackbar
        open={open}
        onClose={handleClose}
        message={msg}
      />
      <div className={useStyles.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            value={userName}
            onChange={(e)=>setUserName(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={userLogin}
          >
            Sign In
          </Button>

      </div>
    </Container>
    </div>
  );
}

export default Login;
