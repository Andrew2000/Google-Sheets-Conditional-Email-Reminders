function checkReminder() {
  // get the spreadsheet object
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // set the first sheet as active
  SpreadsheetApp.setActiveSheet(spreadsheet.getSheets()[0]);
  // fetch this sheet
  var sheet = spreadsheet.getActiveSheet();
   
  // figure out what the last row is
  var lastRow = sheet.getLastRow();
 
  // the rows are indexed starting at 1, and the first row
  // is the headers, so start with row 2
  var startRow = 2;
 
  // grab column 9 (the 'days left' column) 
  var range = sheet.getRange(2,9,lastRow-startRow+1,1 );
  var numRows = range.getNumRows();
  var days_left_values = range.getValues();
   
  // Now, grab the reminder name column
  range = sheet.getRange(2, 1, lastRow-startRow+1, 8);
  var user_values = range.getValues();
   
  var warning_count = 0;
  var msg = "";
   
  // Loop over the days left values
  for (var i = 0; i <= numRows - 1; i++) {
    var days_left = days_left_values[i][0];
    
    if(days_left === 0) {
      // if it's exactly 0, do something with the data.
      var userName = user_values[i][0];
      var userManager = user_values[i][1];
      var userTeam = user_values[i][2];
      var userLocation = user_values[i][3];
      var userHireDate = user_values[i][4];
      var userTitle = user_values[i][5];
      var userEmail = user_values[i][6];      
       
      msg = msg + "\n \n Reminder: Salesforce User is Starting Today \n" + " Username: " +userName+ "\n Manager: " +userManager+ "\n Team: " +userTeam+
        "\n Location: " +userLocation+ "\n Hire Date: " +userHireDate+ "\n Title: " +userTitle+ "\n Email: " +userEmail+  
        "\n \n";
      warning_count++;
    }
  }
   
  if(warning_count) {
    MailApp.sendEmail("INSERT EMAIL HERE", 
        "Salesforce User Activation Reminder", msg);
  }
   
};