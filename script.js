function createMapList() {
  // Get the active sheet
  var sheet = SpreadsheetApp.getActiveSheet();

  // Get the values in the first column
  var places = sheet.getRange("A:A").getValues();

  // Create a new list in Google Maps
  var newList = Maps.newList("My New List");

  // Loop through the places and add them to the list
  for (var i = 0; i < places.length; i++) {
    var place = places[i][0];
    var geocode = Maps.newGeocoder().geocode(place);

    if (geocode.status == "OK") {
      var location = geocode.results[0].geometry.location;
      var marker = Maps.newMarker(location.lat, location.lng);
      newList.addMarker(marker);
    }
  }

  // Save the new list
  newList.save();
}
