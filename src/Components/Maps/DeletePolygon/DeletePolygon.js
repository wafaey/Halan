import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

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
const DeletePolygon = ({zoneID,getZones,handleClose,setMsg,setOpen,setSelected})=>{
    const deletePolygon=()=>{
        const requestOptions = {
            method: 'Delete',
            headers: { 'Content-Type': 'application/json',
            'Authorization': token
             },
        };
          fetch(`https://zones-backend-halan.herokuapp.com/Zones/${zoneID}`, requestOptions)
          .then(res => res.json())
          .then(
            (result) => {
                setMsg(result.message);
                setOpen(true);
                getZones();
                setSelected(null)
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={deletePolygon}
          >
           Delete
          </Button>

      </div>

    </Container>
        </div>
    );
}

export default DeletePolygon;