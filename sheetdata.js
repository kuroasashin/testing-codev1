function doGet() {
  return HtmlService.createTemplateFromFile('Index').evaluate();
}

function getData() {
  // REPLACE WITH YOUR SPREADSHEET ID
  var spreadSheetId = "YOUR_SPREADSHEET_ID"; 
  // REPLACE WITH YOUR DATA RANGE (e.g., "Sheet1!A2:A")
  var dataRange = "YOUR_DATA_RANGE"; 

  var sheet = SpreadsheetApp.openById(spreadSheetId);
  var range = sheet.getRange(dataRange);
  var values = range.getValues();
  
  // Flatten the array of arrays and remove empty entries for the dropdown
  var data = values.flat().filter(String); 
  return data;
}
