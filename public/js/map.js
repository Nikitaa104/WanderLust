
        //let mapToken = mapToken;
        mapboxgl.accessToken = mapToken;
        const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: 'mapbox://styles/mapbox/streets-v12', 
        center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 9 // starting zoom
    });
        const coordinates = listing.geometry.coordinates;

        const marker = new mapboxgl.Marker()
        .setLngLat(listing.geometry.coordinates)
        .addTo(map);

        const marker2 = new mapboxgl.Marker({ color: 'red', rotation: 45 })
        .setPopup(
        new mapboxgl.Popup({ offset: 25 })
        .setHTML(`<h1>Your hotel location!</h1>${listing.location}`)
        )     
        .setLngLat(coordinates)
        .addTo(map);