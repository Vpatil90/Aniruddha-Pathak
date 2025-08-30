
function dataStore(nameInput,parade_Center_Input,parade_Ground_Input,latitudeInput,longitudeInput)
{
const SPREADSHEET_ID = '1wYMjnCP-ARL6lnkUJ3PiCdehRPGhCWNPwtA_1s_OZyY';
const SHEET_NAME = 'Sheet1'; // Make sure this matches the name of your sheet
  
try {
const name = nameInput || '';

const parade_Center = parade_Center_Input || '';
const parade_Ground = parade_Ground_Input || '';
const latitude = latitudeInput|| '';
const longitude = longitudeInput|| '';
const email =  Session.getActiveUser().getEmail();
const timestamp = new Date(); // Current time

var formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd-MM-yyyy");
var uniqueId = String(formattedDate +"-"+email);

const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
const sheet = ss.getSheetByName(SHEET_NAME);


if (!sheet) {
throw new Error(`Sheet '${SHEET_NAME}' not found. Please ensure the sheet exists and its name is correct.`);
}

const textFinder = sheet.createTextFinder(uniqueId);
const foundRange = textFinder.findNext(); // Finds the first occurrence

if (foundRange) {
// Return an error response
return JSON.stringify({ status: 'Duplicate-ERROR', message: "You have already submitted today's attendence.</br> तुम्ही आजची उपस्थिती आधीच नोंदवली आहे."});
throw new Error('You have already submitted attendence today/ तुम्ही आजची उपस्थिती आधीच नोंदवली आहे.');
}

// Append a new row with the data
sheet.appendRow([timestamp, name, parade_Center, parade_Ground, latitude, longitude, email, uniqueId]);
Utilities.sleep(3000);

// Return a success response
return JSON.stringify({ status: 'SUCCESS', message: 'Data successfully recorded.' });
//return ContentService.createTextOutput('Data successfully recorded.')
//  .setMimeType(ContentService.MimeType.JSON);
} catch (e) {
// Log the error for debugging in Apps Script dashboard (View > Executions)
console.error("Error in Client-side:", e.message, e.stack);
// Return an error response
return JSON.stringify({ status: 'ERROR', message: e.message });
//return ContentService.createTextOutput(error.message)
//.setMimeType(ContentService.MimeType.JSON);
}
}
// This function is for direct testing of the web app URL. Not strictly needed for this setup.
/*function doGet(e) {
return ContentService.createTextOutput("This is a POST-only endpoint for data submission.").setMimeType(ContentService.MimeType.TEXT);
}*/