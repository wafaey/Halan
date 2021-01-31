import React from 'react';
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
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
const ExportFile = ({zones})=>{
   const exportFile=()=>{
    let csvContent = "data:text/csv;charset=utf-8," 
    + JSON.stringify(zones);
    var encodedUri = encodeURI(csvContent);
var link = document.createElement("a");
link.setAttribute("href", encodedUri);
link.setAttribute("download", "Zones.csv");
document.body.appendChild(link); 
link.click();
  }
    return(
        <div className='file'>
   <Container component="main" maxWidth="xs" style={{marginTop:'1%'}}>
      <div className={useStyles.paper}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={useStyles.submit}
            onClick={exportFile}
          >
           Export JSON File
          </Button>

      </div>

    </Container>
        </div>
    );
}

export default ExportFile;