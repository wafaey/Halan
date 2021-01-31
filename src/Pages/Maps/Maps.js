import React,{useEffect} from 'react';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  Polygon,
} from "@react-google-maps/api";
import Snackbar from '@material-ui/core/Snackbar';
import NewPolygon from "../../Components/Maps/NewPolygon/NewPolygon";
import DeletePolygon from "../../Components/Maps/DeletePolygon/DeletePolygon";
import ExportFile from "../../Components/Maps/ExportFile/ExportFile";
import zoneAPIs from "../../APIs/ZonesAPIs/zonesAPIs";
import CircularProgress from '@material-ui/core/CircularProgress';
import './Maps.css';

const mapContainerStyle = {
  height: "85vh",
  width: "100vw",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = { lat: 30.033333, lng: 31.233334 };
const apiKey = "AIzaSyB_y1V08dj1ruvJ7Su9y3aPfKEBvd7lJzY";
const libraries= ['places'];
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
  const [openLoading, setOpenLoading] = React.useState(false);
  useEffect(()=>{
    getZones();
  },[]);
  async function getZones(){
    setOpenLoading(true);
   var result = await zoneAPIs.callGetZones(1);
    if(result?.length>0){
          let hete =result;
          for(let i=0;i<result.length;i++){
            for(let j=0;j<result[i].points.length;j++){
              result[i].points[j]['lat']=parseFloat(result[i].points[j]['lat']);
              result[i].points[j]['lng']=parseFloat(result[i].points[j]['lng']);
            }
          }
          setZones(hete);
          setOpenLoading(false);
        }else if(result){
          setMsg(result);
          setOpen(true);
        }
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
         strokeColor={zone.color}
         strokeOpacity= {0.8}
         strokeWeight= {4}
         fillColor= {zone.color}
         fillOpacity= {0.35}
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
          setOpenLoading={setOpenLoading}
          />
          </div>
        </InfoWindow>:null}
      </GoogleMap>
{  openLoading? 
<div className="progress">
  <CircularProgress/>
  </div>
     :<div>
      <ExportFile
      zones={zones}
      />
      <NewPolygon
      polygonPoints={markers}
      setMarkers={setMarkers}
      getZones={getZones}
      handleClose={handleClose}
      setMsg={setMsg}
      setOpen={setOpen}
      setOpenLoading={setOpenLoading}
      />
      </div>}
    </div>
      );
}

export default Maps;
