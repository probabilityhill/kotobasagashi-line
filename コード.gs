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
+注意事項
入力はひらがな, 漢字, アルファベット小文字のいずれか
全角英数字は半角英数字に変換される

+ルール
-文字種フィルター
何もなし → ひらがなのみ
k- → 漢字のみ
hk- → ひらがなと漢字のみ
a- → アルファベットのみ

-書き換え可能な記号
.（ピリオド）,。（句点）, ?（半角はてな）, ？（全角はてな）
~（半角チルダ）, 〜（波ダッシュ）, ～（全角チルダ）
()（半角括弧）, （）（全角括弧）
[]（角括弧）, 【】（隅付き括弧）
{}（波括弧）, ｛｝（全角波括弧）
,（カンマ）, 、（読点）
/（スラッシュ）, ・（中黒）

- 文字数を限定する
aで始まる → a...
bで終わる → ...b
aで始まりbで終わる → a..b
aを含む → .a..
aを含む → (~a)...（.の数 = 全体の文字数）
aとbを含む → (~a)(~b)...（.の数 = 全体の文字数）
aを含むがbを含まない → (~a)(!~b)...
aの繰り返しを含む → .a{n}..（{n,} = n文字以上, {n,m} = n文字以上m文字以下）
a,b,cで構成される → [abc]{n}
a,b,c以外の文字で構成される → [^abc]{n}
aまたはbで始まる → (a/b)...
aまたはbで終わる → ...(a/b)
aまたはbで始まりcまたはdで終わる → (a/b)..(c/d)
aまたはbを含む → .(a/b)..
aまたはbを含む → (~(a/b)~)...（.の数 = 全体の文字数）

- 文字数を限定しない
aで始まる → a~
bで終わる → ~b
aで始まりbで終わる → a~b
aを含む → ~a~
aを含まない → (!~a)~
aとbを含む → (~a)(~b)~
aを含むがbを含まない → (~a)(!~b)~
aの繰り返しを含む → ~a{n}~
a,b,cで構成される → [abc]
a,b,c以外の文字で構成される → [^abc]
aまたはbで始まる → (a/b)~
aまたはbで終わる → ~(a/b)
aまたはbで始まりcまたはdで終わる → (a/b)~(c/d)
aまたはbを含む → ~(a/b)~
*/

function getWords(str){
  str = str.replace(/〜/g, "~").replace(/～/g, "~").replace(/【(.+)】/g, "[$1]").replace(/（(.+)）/g, "($1)").replace(/｛(.+)｝/g, "{$1}").replace(/、/g, ",").replace(/・/g, "/").replace(/。/g, ".")  // 記号の置換
  str = str.replace(/\?/g, ".") .replace(/？/g, ".");  // １文字
  str = str.replace(/~/g, ".*");  // 含む .*a.*
  str = str.replace(/\]$/g, "]+");  // 構成する []+
  str = str.replace(/\(/g, "(?=");  // 肯定先読み (?=~)
  str = str.replace(/\=\!/g, "!");  // 否定先読み　(?!~)~
  str = str.replace(/\(\?\=(.+\/.+)\)/g, "($1)")  // または (a|b)
  str = str.replace(/\(\.\*\(\?\=(.+\/.+)\)\.\*\)/g, "(?=.*($1).*)")  // またはを含む (~(a|b)~)..
  str = str.replace(/\//g, "|");  // または (a|b)
  str = str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);  // 全角→半角
  });

  console.log(str);  // CHECK
  if(/\-/.test(str)){
    let strArray = str.split("-");
    let head = strArray[0];
    str = strArray[1];

    if(head === "a"){
      var headRgx = /[a-z]+/;
    }
    else if(head === "k"){
      var headRgx = /^[\u3005-\u3006\u4E00-\u9FFF]+$/;
    }
    else{
      // head === "hk"
      var headRgx = /^[\u3040-\u309F\u3005-\u3006\u4E00-\u9FFF]+$/;
    }
  }
  else{
    var headRgx = /^[\u3040-\u309F]+$/;
  }

  str = "/^" + str + "$/";

  let resultArray = wordsArray.filter(RegExp.prototype.test,eval(str));
  resultArray = resultArray.filter(RegExp.prototype.test,eval(headRgx));  // 文字種フィルタ

  if(resultArray.length === 0){
    return "みつからなかった😣"
  }
  return "「"+resultArray.join(", ")+"」がみつかったよ😊";
}

// テスト
function myFunction() {
  // h-
  console.log(getWords("a-and?"));
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
