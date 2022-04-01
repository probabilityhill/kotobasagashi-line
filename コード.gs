function myFunction() {
  var folder_id = '1s35bmgREfICvHK-8Eezgx51g7ZV8Ojfb';
  var folder = DriveApp.getFolderById(folder_id);
  var files = folder.getFiles();

  while (files.hasNext()) {
    var csv = files.next().getBlob().getDataAsString("UTF-8");
  }
  var csvArray = csv.split(",");
  var result = csvArray.filter(RegExp.prototype.test,/^..あ.$/);
  console.log(result);
}
