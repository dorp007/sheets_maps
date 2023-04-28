function createNewList() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1"); // Change "Sheet1" to the name of the sheet that contains the list of places
  var data = sheet.getDataRange().getValues();
  var places = [];
  
  // Extract the places from the sheet
  for (var i = 0; i < data.length; i++) {
    places.push(data[i][0]);
  }
  
  // Create a new saved list in Google Maps
  var list = Maps.newSavedList().setName("My List"); // Change "My List" to the name you want to give to your new list
  
  // Add the places to the list
  for (var i = 0; i < places.length; i++) {
    var location = Maps.newGeocoder().geocode(places[i]).results[0].geometry.location;
    var place = Maps.newPlace().setName(places[i]).setLocation(location);
    list.addPlace(place);
  }
  
  // Save the list
  var id = Maps.saveSavedList(list);
  
  // Display a message with the URL of the new list
  var message = "New list created: https://www.google.com/maps/saved/" + id;
  SpreadsheetApp.getUi().alert(message);
}
