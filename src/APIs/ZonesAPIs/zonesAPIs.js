 const token = localStorage.getItem('access_token'); 
 const URL ='https://zones-backend-halan.herokuapp.com/';
 const callUserLogin=(userName,password,numOfRetries)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username: userName, password: password})
            // body: JSON.stringify({username: "omar.mohamed", password: 'halan_2021'})
        };
       return new Promise(function (resolve, reject) { 
      fetch(URL+"login", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
            localStorage.setItem('access_token', `bearer ${result.token}`);
            resolve(result.message); 
            return result.message;
        },
        (error) => {
            if(numOfRetries===1){
                callUserLogin=(userName,password,2);
            }{
                reject(error.message)
                return error.message;
            }
        }
      )
    })
}
 const callCreatePolygon=(polygonName,polygonColor,polygonPoints,numOfRetries)=>{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',
        'Authorization': token
         },
         body: JSON.stringify({label:polygonName,color:polygonColor,points:polygonPoints})
       };
       return new Promise(function (resolve, reject) { 
      fetch(URL+"Zones", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
            resolve(result.message); 
            return result.message;
        },
        (error) => {
            if(numOfRetries===1){
                callCreatePolygon=(polygonName,polygonColor,polygonPoints,2);
            }{
                reject(error.message)
                return error.message;
            }
        }
      )
    })
}
const callDeletePolygon=(zoneID,numOfRetries)=>{
    const requestOptions = {
        method: 'Delete',
        headers: { 'Content-Type': 'application/json',
        'Authorization': token
         },
    };
       return new Promise(function (resolve, reject) { 
        fetch(URL+`Zones/${zoneID}`, requestOptions)
        .then(res => res.json())
        .then(
        (result) => {
            resolve(result.message); 
            return result.message;
        },
        (error) => {
            if(numOfRetries===1){
                callDeletePolygon=(zoneID,2);
            }{
                reject(error.message)
                return error.message;
            }
        }
      )
    })
}
const callGetZones =(numOfRetries)=>{
    const token = localStorage.getItem('access_token'); 
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': token
         }
    };
       return new Promise(function (resolve, reject) { 
        fetch(URL+"Zones", requestOptions)
        .then(res => res.json())
        .then(
        (result) => {
            resolve(result.data); 
            return result.data;
        },
        (error) => {
            if(numOfRetries===1){
                callGetZones=(2);
            }{
                reject(error.message)
                return error.message;
            }
        }
      )
    })
}
export default{
    callUserLogin,
    callDeletePolygon,
    callCreatePolygon,
    callGetZones
}
