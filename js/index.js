window.onload = function() {
    createMarker
}

var map;
var markers = [];
var infoWindow;




function initMap() {
    var Morocco = {
        lat: 31.79,
        lng: -7.09
    }
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 3,
            center: Morocco
        });
    infoWindow = new google.maps.InfoWindow();
    showCountryMarkers();
}

function showCountryMarkers() {
    var bounds = new google.maps.LatLngBounds();

    $(document).ready(function() {
        init()

        function init() {
            var url = "https://api.covid19api.com/summary";

            $.get(url, function(data) {

                data.Countries.forEach(function(item, index) {

                    console.log(item.Country);

                    var latlng;

                    countries.forEach(function(country, index) {
                        //console.log(country.latlng);
                        if (country.name == item.Country) {
                            latlng = new google.maps.LatLng(
                                country.latlng[0], country.latlng[1]
                            );
                        }
                    })

                    var country = item.Country;
                    var total_cases = item.TotalConfirmed;
                    var total_deaths = item.TotalDeaths;
                    var total_recovered = item.TotalRecovered;
                    var new_confirmed = item.NewConfirmed;
                    var new_deaths = item.NewDeaths;
                    var new_recovered = item.NewRecovered;

                    bounds.extend(latlng);
                    createMarker(latlng, country, total_cases, total_deaths, total_recovered, new_confirmed, new_deaths, new_recovered);

                })
            })
        }
    })


    /*var latlng = new google.maps.LatLng(
        31.79, -7.09
    );
    var country = "Morocco";
    var total_cases = "17234458";
    var total_deaths = "229";
    var total_recovered = "15234567";


    bounds.extend(latlng);
    createMarker(latlng, country, total_cases, total_deaths, total_recovered);*/


}

function createMarker(latlng, country, total_cases, total_deaths, total_recovered, new_confirmed, new_deaths, new_recovered) {

    var html = `

        <div class="data-window">
            <div class="country"><b>${country}</b></div>
            <div><b><i>Total Cases : </i></b><b class="total-cases">${total_cases} (+${new_confirmed})</b></div>
            <div><b><i>Total Deaths : </i></b><b class="total-deaths">${total_deaths} (+${new_deaths})</b></div>
            <div><b><i>Total Recovered : </i></b><b class="total-recovered">${total_recovered} (+${new_recovered})</b></div>
        </div>

    `
        //var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

    var marker = new google.maps.Marker({
        map: map,
        position: latlng,
        //label: index.toString(),
        //icon: 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png'
    });
    google.maps.event.addListener(marker, 'click', function() {
        infoWindow.setContent(html);
        infoWindow.open(map, marker);
    });
    markers.push(marker);

}