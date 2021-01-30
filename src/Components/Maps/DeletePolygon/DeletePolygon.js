import React,{useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import zoneAPIs from "../../../APIs/ZonesAPIs/zonesAPIs";

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
const DeletePolygon = ({zoneID,getZones,handleClose,setMsg,setOpen,setSelected})=>{
  async function  deletePolygon(){
    var result = await zoneAPIs.callDeletePolygon(zoneID, 1);
    if(result && result==='zone deleted'){
      setMsg(result);
      setOpen(true);
      getZones();
      setSelected(null)
    }else if(result){
      setMsg(result);
      setOpen(true);
    }  
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