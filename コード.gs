const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

const folder_id = '1s35bmgREfICvHK-8Eezgx51g7ZV8Ojfb';
var folder = DriveApp.getFolderById(folder_id);
var files = folder.getFiles();
while (files.hasNext()) {
  var csv = files.next().getBlob().getDataAsString("UTF-8");
}
var csvArray = csv.split(",");

const rule = {
  "type": "bubble",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "hello, world"
      }
    ]
  }
};



function getWords(str){
  str = str.replace("？", ".");
  str = str.replace(/(\S+)\^(\S+)/, "Math.pow($1, $2)");  // 累乗 x^a
  str = str.replace(/\log\((.+)\)/, "Math.log($1)");      // 自然対数 log(x)
  str = str.replace(/\|(.+)\|/, "Math.abs($1)");          // 絶対値 |x|
  str = str.replace(/sqrt\((.+)\)/, "Math.sqrt($1)");     // 平方根 sqrt(x)
  str = str.replace(/cbrt\((.+)\)/, "Math.cbrt($1)");     // 立方根 cbrt(x)
  str = str.replace(/\|(.+)\|/, "Math.abs($1)");  // 絶対値
  str = "/^" + str + "$/";
  var result = csvArray.filter(RegExp.prototype.test,eval(str));
  if(result.length === 0){
    return "みつからなかった😣"
  }
  return "「"+result.join(", ")+"」がみつかったよ😊";
}

// テスト
function myFunction() {
  console.log(getWords("ね？"));
}

function doPost(e){
  var event = JSON.parse(e.postData.contents).events[0];
  var reply_token = event.replyToken;

  if(event.type === "follow"){
    var messages = [{
      "type":"flex",
      "altText":"rule",
      "contents":rule
    }];
  }
  else if(event.type === "message"){
    if(event.message.type === "text"){
      var text = event.message.text;

      switch(text){
        case("ルール"):
          var messages = [{
            "type":"flex",
            "altText":"rule",
            "contents":rule
            }];
          break;
        default:
          var messages = [{
            "type":"text",
            "text":getWords(text),
            "quickReply": {
              "items": [
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "ルール",
                    "text": "ルール"
                  }
                }
              ]
            }
          }];
      }
    }
  }
  sendReplyMessage(reply_token, messages); 
}

function sendReplyMessage(reply_token, messages){
  var url = 'https://api.line.me/v2/bot/message/reply';
  var res = UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': reply_token,
      'messages': messages 
    }),
  });
  return res;
}
