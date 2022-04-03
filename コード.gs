const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

const wordsId = '1BiDeYFDhD4aXT7hIag_L0uJuOiSY84_s';
const wordsFile = DriveApp.getFileById(wordsId);
const wordsArray = wordsFile.getBlob().getDataAsString("UTF-8").split(",");

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
/*
ルール
.（ピリオド）？（全角はてな） → １文字
~（半角チルダ）〜（波ダッシュ）～（全角チルダ） → 含む
'a/b'（シングルクォーテーション, 半角スラッシュ） → または
[]（角括弧）【】（隅付き括弧） → 構成する

- 文字数を限定する
aで始まる → a...
bで終わる → ...b
aで始まりbで終わる → a..b
aを含む → .a..
aを含む → (~a)...（.の数 = 全体の文字数）
aとbを含む → (~a)(~b)...（.の数 = 全体の文字数）
aを含むがbを含まない → (~a)(!~b)...
a,b,cで構成される → [abc]{n}
aまたはbで始まる → 'a/b'...
aまたはbで終わる → ...'a/b'
aまたはbで始まりcまたはdで終わる → 'a/b'..'c/d'
aまたはbを含む → .'a/b'..
aまたはbを含む → (~'a/b'~)...（.の数 = 全体の文字数）

- 文字数を限定しない
aで始まる → a~
bで終わる → ~b
aで始まりbで終わる → a~b
aを含む → ~a~
aを含まない → (!~a)~
aとbを含む → (~a)(~b)~
aを含むがbを含まない → (~a)(!~b)~
a,b,cで構成される → [abc]
aまたはbで始まる → 'a/b'~
aまたはbで終わる → ~'a/b'
aまたはbで始まりcまたはdで終わる → 'a/b'~'c/d'
aまたはbを含む → ~'a/b'~
*/


function getWords(str){
  str = str.replace(/？/g, ".");  // １文字
  str = str.replace(/~/g, ".*").replace(/〜/g, ".*").replace(/～/g, ".*");  // 含む .*a.*
  str = str.replace(/\]$/g, "]+");  // 構成する []+
  str = str.replace(/\(/g, "(?=");  // 肯定先読み (?=~)
  str = str.replace(/\=\!/g, "!");  // 否定先読み　(?!~)~
  str = str.replace(/'(.+)'/g, "($1)").replace(/\//g, "|");  // または (a|b)


  console.log(str);
  if(/\-/.test(str)){
    let strArray = str.split("-");
    let head = strArray[0];
    str = strArray[1];

    if(head === "a"){
      var headRgx = /[a-z]+/;
    }
    else if(head === "k"){
      var headRgx = /[\u3005-\u3006\u4E00-\u9FFF]+/;
    }
    else{
      var headRgx = /[\u3040-\u309F\u3005-\u3006\u4E00-\u9FFF]+/;
    }
  }
  else{
    var headRgx = /[\u3040-\u309F]+/;
  }

  str = "/^" + str + "$/";

  let result = wordsArray.filter(RegExp.prototype.test,eval(str));
  result = result.filter(function(value) { return value.match(headRgx); });

  if(result.length === 0){
    return "みつからなかった😣"
  }
  return "「"+result.join(", ")+"」がみつかったよ😊";
}

// テスト
function myFunction() {
  // h-
  console.log(getWords("a-'a/b'.."));
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
