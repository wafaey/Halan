const base = { lat: 30.023951078060318, lng: 31.09307849323353 };

export default function getMarkers() {
  const cnt = 10;
  const markers = [{  id: 1,
    title: "marker: " + 1,
    lat:25.774 ,
    lng: -80.190},{  id: 2,
      title: "marker: " + 2,
      lat: 18.466,
      lng: -66.118},{  id: 3,
        title: "marker: " + 3,
        lat:32.321,
        lng: -64.757},{  id: 4,
          title: "marker: " + 4,
          lat:30.774,
          lng: -75.190}];
  // const markers=[];
  // for (let i = 0; i < cnt; i++) {
  //   markers.push({
  //     id: i,
  //     title: "marker: " + i,
  //     lat: base.lat + 0.04 * -i,
  //     lng: base.lng + 0.04 * i
  //   });
  // }
  // const markers=  [
  //   [25.774, -80.190],
  //   [18.466, -66.118],
  //   [32.321,-64.757],
  //   [25.774, -80.190]
  // ]
  return markers;
}
