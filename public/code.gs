function doGet() {
  return HtmlService.createHtmlOutputFromFile('index')
      .setTitle('Shiftsmart Check In')
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
      .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Performs reverse geocoding to get a human-readable address from coordinates.
 * @param {number} lat User's current latitude.
 * @param {number} lon User's current longitude.
 * @returns {Object} Result including readable address.
 */
function reverseGeocodeLocation(lat, lon) {
  var geocoder = Maps.newGeocoder();
  var readableAddress = 'Address not found';

  try {
    var response = geocoder.reverseGeocode(lat, lon);
    if (response.results.length > 0) {
      readableAddress = response.results[0].formatted_address;
    }
  } catch (e) {
    Logger.log("Geocoding Error: " + e.toString());
    readableAddress = 'Geocoding failed: ' + e.toString();
  }

  return { 
    address: readableAddress 
  };
}

/**
 * Handles form submission and writes data to the target Google Sheet, including location.
 * @param {Object} formObject The data submitted by the form.
 */
function processForm(formObject) {
  // Sheet ID and Tab Name
  // *** NOTE: YOUR SPREADSHEET ID IS ALREADY HERE ***
  var spreadsheetId = "1cfgAtX59Ey3J4HdfGKJVpydc3iy7DhGLuLC1sFp4x20";
  var sheetName = "Sheet2"; 
  
  var ss = SpreadsheetApp.openById(spreadsheetId);
  var sheet = ss.getSheetByName(sheetName);

  if (!sheet) {
    throw new Error("Could not find the sheet named '" + sheetName + "' in the spreadsheet.");
  }
  
  // Appends data in the following order: 
  // [Timestamp, Store Location, Name, Contact No., Role, Latitude, Longitude, Readable Address]
  sheet.appendRow([
    new Date(),
    formObject.storeLocation, 
    formObject.yourName,       // Matched to name="yourName" in HTML
    formObject.contactNo,      // Matched to name="contactNo" in HTML
    formObject.role,           // Matched to name="role" in HTML
    formObject.latitude,
    formObject.longitude,
    formObject.readableAddress
  ]);
  
  return "Success";
}