function sendMail() {
  var SS = SpreadsheetApp.getActiveSpreadsheet();
  var WATrigSheet  = SS.getSheetByName("WhatsApp Trigger");
  var DataRange = WATrigSheet.getRange(2, 2, WATrigSheet.getLastRow()-1, 28).getValues();

  const DateObj = {};
  DataRange.forEach(function (i) {
    if (i[0] != "" && i[1] !="" && i[3] !="" && (i[20] !="" || i[20]!=0)) {
      var date = new Date(i[0]); // Convert to date object
      var formattedDate = Utilities.formatDate(date, "GMT+05:30", "dd-MM-yyyy"); // Format the date

      if (!DateObj[formattedDate]) {
        DateObj[formattedDate] = [];
      }
      DateObj[formattedDate].push(i);
    }
  });

  // Now format the output
  var output = "";  // Initialize empty string to store the result
  
  for (const [date, records] of Object.entries(DateObj)) {
    output += date + "?\n";  // Add date to the output

    records.forEach(function (record, index) {
      output += (index + 1) + ". *" + record[3] + " (" + record[7] + ")* " + record[1] + "; OK Qty=" + record[20] + "; Rej Qty=" + record[19] + "?\n";
    });
    output += "?\n";  // Add an extra newline between different dates
  }

  Logger.log(output); 
  if(output!=""){ 
    var recipientEmail = "d";
    
    GmailApp.sendEmail(recipientEmail, "MOULDING PRODUCTION UPDATE", "", {
      htmlBody : output
    });
  }


  //...........clear triggered content
  WATrigSheet.getRange(2, 1, WATrigSheet.getLastRow()-1, 29).clearContent();
  WATrigSheet.getRange("B2").setValue("Test");



}
