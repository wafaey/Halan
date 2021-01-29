import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import './NewPolygon.css';

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
const token = localStorage.getItem('access_token');
const NewPolygon = ({polygonPoints,setMarkers,getZones,handleClose,setMsg,setOpen})=>{
    const [polygonName, setPolygonName ]=useState('');
    const [polygonColor, setPolygonColor ]=useState('');
    const createPolygon=()=>{
        console.log(polygonPoints);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': token
             },
             body: JSON.stringify({label:polygonName,color:polygonColor,points:polygonPoints})
        };
          fetch("https://zones-backend-halan.herokuapp.com/Zones", requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
                setMarkers([]);
                setPolygonName('');
                setPolygonColor('');
                setMsg(result.message);
                setOpen(true);
                getZones();
            },
            (error) => {
                console.log(error);
                setMsg(error.message);
                setOpen(true);
            }
          )
    }
  
    return(
        <div className='polygon'>
   <Container component="main" maxWidth="xs">
      <div className={useStyles.paper}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Polygon Name"
            value={polygonName}
            onChange={(e)=>setPolygonName(e.target.value)}
            autoFocus
          />
           <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="color"
            label="Polygon color"
            value={polygonColor}
            onChange={(e)=>setPolygonColor(e.target.value)}
            autoFocus
          />
           <div className='buttons'>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={createPolygon}
          >
           Add
          </Button>
         
         <Button
            type="submit"
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={()=>setMarkers([])}
          >
           Remove Points
          </Button>
         </div>
      </div>

    </Container>
        </div>
    );
}

export default NewPolygon;