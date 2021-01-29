import React,{useEffect} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polygon,
} from "@react-google-maps/api";
import mapStyles from "./mapStyles";
import Snackbar from '@material-ui/core/Snackbar';
import NewPolygon from "../../Components/Maps/NewPolygon/NewPolygon";
import DeletePolygon from "../../Components/Maps/DeletePolygon/DeletePolygon";
// import EditPolygon from "../../Components/Maps/EditPolygon/EditPolygon";
import './Maps.css';
const mapContainerStyle = {
  height: "85vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = { lat: 30.033333, lng: 31.233334 };
const triangleCoords = [
  { _id:434334,lat: 25.774, lng: -80.19 },
  { _id:434334,lat: 18.466, lng: -66.118 },
  { _id:434334,lat: 32.321, lng: -64.757 },
  { _id:434334, lat: 25.774, lng: -80.19 },
];
const apiKey = "AIzaSyB_y1V08dj1ruvJ7Su9y3aPfKEBvd7lJzY";
const libraries= ['places'];
const token = localStorage.getItem('access_token');
const Maps= () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries, 
  });
  const [markers, setMarkers] = React.useState([]);
  const [zones, setZones] = React.useState([]);
  const [selected, setSelected] = React.useState(null);
  const [msg, setMsg ]=React.useState('');
  const [open, setOpen] = React.useState(false);
  useEffect(()=>{
    getZones();
  },[]);
  const getZones=()=>{
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        'Authorization': token
         }
    };
      fetch("https://zones-backend-halan.herokuapp.com/Zones", requestOptions)
      .then(res => res.json())
      .then(
        (result) => {
          console.log('result',result.data);
    
          let hete =result.data;
          for(let i=0;i<result.data.length;i++){
            for(let j=0;j<result.data[i].points.length;j++){
              result.data[i].points[j]['lat']=parseFloat(result.data[i].points[j]['lat']);
              result.data[i].points[j]['lng']=parseFloat(result.data[i].points[j]['lng']);
            }
          }
          setZones(hete);
        },
        (error) => {
        console.log('error',error);
        }
      )
}
  const onMapClick = React.useCallback((e) => {
    setMarkers((current) => [
      ...current,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
      },
    ]);
   
  }, []);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  // const panTo = React.useCallback(({ lat, lng }) => {
  //   mapRef.current.panTo({ lat, lng });
  //   mapRef.current.setZoom(14);
  // }, []);
  const handleClose = () => {
    setOpen(false);
  };
  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <div className="map">
        <Snackbar
        open={open}
        onClose={handleClose}
        message={msg}
      />
 <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
      >
         {markers.map((marker) => (
          <Marker
            key={`${marker.lat}-${marker.lng}`}
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        ))}
        {zones.map((zone) => (
        <Polygon
         paths= {zone.points}
        // strokeColor={`${zone.color}`}
         strokeColor='#B32F25'
         strokeOpacity= {0.8}
         strokeWeight= {4}
       //  fillColor= {`${zone.color}`}
         fillColor= {zone.color}
         fillOpacity= {0.35}
        //  key={zone._id}
         onClick={() => {
            setSelected(zone);
         }} 
        />))}
        {selected? <InfoWindow  
        position={{ lat: selected.points[0].lat, lng: selected.points[0].lng }}
        onCloseClick={() => {
          setSelected(null);
        }}>
          <div>
           <h2>
             {selected.label}
           </h2>
          <DeletePolygon
          zoneID={selected._id}
          getZones={getZones}
          handleClose={handleClose}
          setMsg={setMsg}
          setOpen={setOpen}
          setSelected={setSelected}
          />
          </div>
        </InfoWindow>:null}
      </GoogleMap>
      <NewPolygon
      polygonPoints={markers}
      setMarkers={setMarkers}
      getZones={getZones}
      handleClose={handleClose}
      setMsg={setMsg}
      setOpen={setOpen}
      />

    </div>
      );
}

export default Maps;
