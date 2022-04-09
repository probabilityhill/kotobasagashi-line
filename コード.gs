const scriptProperties = PropertiesService.getScriptProperties();
const ACCESS_TOKEN = scriptProperties.getProperty('ACCESS_TOKEN');

const wordsId = "1BiDeYFDhD4aXT7hIag_L0uJuOiSY84_s";
const wordsFile = DriveApp.getFileById(wordsId);
const wordsArray = wordsFile.getBlob().getDataAsString("UTF-8").split(",");

const sheetId = "1Uo9_SrTYmpS8e8CqXTkFzO4h90BGVlWW1IOaVPtKn9o";
const data = SpreadsheetApp.openById(sheetId).getSheets()[0];  // シートを取得

const rule = {
  "type": "bubble",
  "size": "giga",
  "header": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "ルール",
        "align": "center",
        "size": "lg",
        "weight": "bold",
        "color": "#FFFFFF"
      }
    ],
    "paddingAll": "sm"
  },
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "・",
                    "flex": 1,
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "アルファベット、数字、記号は半角と全角どちらにも対応しているよ！",
                    "flex": 15,
                    "wrap": true,
                    "size": "sm"
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "・",
                    "flex": 1,
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "アルファベットは小文字で入力してね！",
                    "flex": 15,
                    "wrap": true,
                    "size": "sm"
                  }
                ]
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "・",
                    "flex": 1,
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "カタカナはひらがなに統一されているよ！",
                    "flex": 15,
                    "wrap": true,
                    "size": "sm"
                  }
                ]
              }
            ]
          }
        ],
        "paddingAll": "md"
      },
      {
        "type": "separator",
        "color": "#375e97",
        "margin": "none"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "記号について",
                "weight": "bold",
                "color": "#375e97"
              }
            ],
            "paddingBottom": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "１文字 →  ? . 。",
                    "align": "start",
                    "flex": 3,
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "（はてな・ピリオド・句点）",
                    "align": "end",
                    "size": "xs",
                    "weight": "bold",
                    "color": "#B8B8B8",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "ｎ文字 → ~",
                    "align": "start",
                    "size": "sm",
                    "flex": 3
                  },
                  {
                    "type": "text",
                    "text": "（チルダ・波ダッシュ）",
                    "align": "end",
                    "size": "xs",
                    "weight": "bold",
                    "color": "#B8B8B8",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "または → (x/y) (x・y)",
                    "align": "start",
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "（スラッシュ・中黒）",
                    "align": "end",
                    "size": "xs",
                    "weight": "bold",
                    "color": "#B8B8B8"
                  }
                ]
              }
            ],
            "paddingAll": "none"
          }
        ],
        "paddingAll": "md"
      },
      {
        "type": "separator",
        "color": "#375e97",
        "margin": "none"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "変数について",
                "weight": "bold",
                "color": "#375e97"
              }
            ],
            "paddingBottom": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "大文字のX, Y, Zは変数として使えるよ！X, Y, Zの順番に使ってね！",
                "size": "sm",
                "wrap": true
              }
            ]
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "XYXY → いろいろ, さらさら など",
                "size": "sm"
              },
              {
                "type": "text",
                "text": "?XY?XY → ちょうじょう, にゅうぎゅう など",
                "size": "sm"
              }
            ],
            "paddingAll": "sm"
          }
        ],
        "paddingAll": "md"
      },
      {
        "type": "separator",
        "color": "#375e97",
        "margin": "none"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "文字種フィルター",
                "weight": "bold",
                "color": "#375e97"
              }
            ],
            "paddingBottom": "sm"
          },
          {
            "type": "text",
            "text": "＊ハイフンは長音符（ー）でも可",
            "align": "start",
            "size": "xs"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "先頭に何もつけない",
                    "align": "start",
                    "size": "sm",
                    "flex": 5
                  },
                  {
                    "type": "text",
                    "text": "（ひらがな）",
                    "align": "end",
                    "size": "xs",
                    "weight": "bold",
                    "color": "#B8B8B8",
                    "flex": 3
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "先頭に「漢字-」をつける",
                    "align": "start",
                    "size": "sm",
                    "flex": 5
                  },
                  {
                    "type": "text",
                    "text": "（漢字）",
                    "align": "end",
                    "size": "xs",
                    "weight": "bold",
                    "color": "#B8B8B8",
                    "flex": 2
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "先頭に「ひ漢字-」をつける",
                    "align": "start",
                    "size": "sm",
                    "flex": 5
                  },
                  {
                    "type": "text",
                    "text": "（ひらがな・漢字）",
                    "align": "end",
                    "size": "xs",
                    "weight": "bold",
                    "color": "#B8B8B8",
                    "flex": 3
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "先頭に「a-」をつける",
                    "align": "start",
                    "flex": 5,
                    "size": "sm"
                  },
                  {
                    "type": "text",
                    "text": "（アルファベット）",
                    "align": "end",
                    "size": "xs",
                    "weight": "bold",
                    "color": "#B8B8B8",
                    "flex": 3
                  }
                ]
              }
            ],
            "paddingAll": "none",
            "paddingTop": "xs"
          }
        ],
        "paddingAll": "md"
      },
      {
        "type": "separator",
        "color": "#375e97",
        "margin": "none"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "「ことばさがし」がマッチする例",
                "weight": "bold",
                "color": "#375e97"
              }
            ],
            "paddingBottom": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "？？ばさ？し",
                        "align": "center",
                        "size": "sm"
                      }
                    ],
                    "backgroundColor": "#F4F6F9",
                    "margin": "sm",
                    "paddingAll": "xs"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "こ～が～",
                        "align": "center",
                        "size": "sm"
                      }
                    ],
                    "backgroundColor": "#F4F6F9",
                    "margin": "sm",
                    "paddingAll": "xs"
                  }
                ],
                "margin": "sm"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "~(ば/び)~",
                        "align": "center",
                        "size": "sm"
                      }
                    ],
                    "backgroundColor": "#F4F6F9",
                    "margin": "sm",
                    "paddingAll": "xs"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "。。。さが。",
                        "align": "center",
                        "size": "sm"
                      }
                    ],
                    "backgroundColor": "#F4F6F9",
                    "margin": "sm",
                    "paddingAll": "xs"
                  }
                ],
                "margin": "sm"
              },
              {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "(け・こ)～(し・す)",
                        "align": "center",
                        "size": "sm"
                      }
                    ],
                    "backgroundColor": "#F4F6F9",
                    "margin": "sm",
                    "paddingAll": "xs"
                  },
                  {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [
                      {
                        "type": "text",
                        "text": "(か/こ).....",
                        "align": "center",
                        "size": "sm"
                      }
                    ],
                    "backgroundColor": "#F4F6F9",
                    "margin": "sm",
                    "paddingAll": "xs"
                  }
                ],
                "margin": "sm"
              }
            ],
            "paddingAll": "none"
          }
        ],
        "paddingAll": "md"
      },
      {
        "type": "separator",
        "color": "#375e97",
        "margin": "none"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "高度な検索",
                "weight": "bold",
                "color": "#375e97"
              }
            ],
            "paddingBottom": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "ボタンパネルのボタンをクリックすると、入力形式が送られてくるよ！それに従って入力して送信してね！",
                "size": "sm",
                "wrap": true
              }
            ],
            "paddingAll": "none"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "contents": [
                  {
                    "type": "span",
                    "text": "・",
                    "size": "sm",
                    "color": "#6B84A9",
                    "weight": "bold"
                  },
                  {
                    "type": "span",
                    "text": "文字数の指定",
                    "size": "sm",
                    "weight": "bold",
                    "color": "#6B84A9"
                  }
                ]
              }
            ],
            "paddingBottom": "sm",
            "paddingTop": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "入力形式の「N」の部分だよ！",
                "size": "sm",
                "wrap": true
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "N = 数字",
                        "align": "start",
                        "flex": 3,
                        "size": "sm"
                      },
                      {
                        "type": "text",
                        "text": "（文字数を指定する）",
                        "align": "end",
                        "size": "xs",
                        "weight": "bold",
                        "color": "#B8B8B8",
                        "flex": 5
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "N = n",
                        "align": "start",
                        "size": "sm",
                        "flex": 3
                      },
                      {
                        "type": "text",
                        "text": "（文字数を指定しない）",
                        "align": "end",
                        "size": "xs",
                        "weight": "bold",
                        "color": "#B8B8B8",
                        "flex": 5
                      }
                    ]
                  }
                ],
                "paddingAll": "sm"
              }
            ],
            "paddingAll": "none"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "contents": [
                  {
                    "type": "span",
                    "text": "・",
                    "size": "sm",
                    "color": "#6B84A9",
                    "weight": "bold"
                  },
                  {
                    "type": "span",
                    "text": "文字種の指定",
                    "size": "sm",
                    "weight": "bold",
                    "color": "#6B84A9"
                  }
                ]
              }
            ],
            "paddingBottom": "sm",
            "paddingTop": "sm"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "text",
                "text": "入力形式の「TYPE」の部分だよ！",
                "size": "sm",
                "wrap": true
              },
              {
                "type": "box",
                "layout": "vertical",
                "contents": [
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "TYPE = ひ",
                        "align": "start",
                        "flex": 3,
                        "size": "sm"
                      },
                      {
                        "type": "text",
                        "text": "（ひらがな）",
                        "align": "end",
                        "size": "xs",
                        "weight": "bold",
                        "color": "#B8B8B8",
                        "flex": 5
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "TYPE = 漢字",
                        "align": "start",
                        "size": "sm",
                        "flex": 3
                      },
                      {
                        "type": "text",
                        "text": "（漢字）",
                        "align": "end",
                        "size": "xs",
                        "weight": "bold",
                        "color": "#B8B8B8",
                        "flex": 5
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "TYPE = ひ漢字",
                        "align": "start",
                        "size": "sm",
                        "flex": 3
                      },
                      {
                        "type": "text",
                        "text": "（ひらがな・漢字）",
                        "align": "end",
                        "size": "xs",
                        "weight": "bold",
                        "color": "#B8B8B8",
                        "flex": 5
                      }
                    ]
                  },
                  {
                    "type": "box",
                    "layout": "baseline",
                    "contents": [
                      {
                        "type": "text",
                        "text": "TYPE = a",
                        "align": "start",
                        "size": "sm",
                        "flex": 3
                      },
                      {
                        "type": "text",
                        "text": "（アルファベット）",
                        "align": "end",
                        "size": "xs",
                        "weight": "bold",
                        "color": "#B8B8B8",
                        "flex": 5
                      }
                    ]
                  }
                ],
                "paddingAll": "sm"
              }
            ],
            "paddingAll": "none"
          }
        ],
        "paddingAll": "md"
      }
    ],
    "paddingAll": "none"
  },
  "styles": {
    "header": {
      "backgroundColor": "#375e97"
    }
  }
};

const btnList = {
  "type": "bubble",
  "size": "giga",
  "body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Xを含む",
                  "data": "include-x"
                },
                "color": "#FFFFFF"
              }
            ],
            "flex": 3,
            "borderColor": "#FFFFFF",
            "borderWidth": "light"
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "X , Y , ... で構成される",
                  "data": "consist-of-x"
                },
                "color": "#FFFFFF"
              }
            ],
            "flex": 5,
            "borderColor": "#FFFFFF",
            "borderWidth": "light"
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "X , Y , ... で構成される（M～N文字）",
              "data": "consist-of-x-limited"
            },
            "color": "#FFFFFF"
          }
        ],
        "borderColor": "#FFFFFF",
        "borderWidth": "light"
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "XとYを含む",
                  "data": "include-x-and-y"
                },
                "color": "#FFFFFF"
              }
            ],
            "borderColor": "#FFFFFF",
            "borderWidth": "light",
            "flex": 4
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "data": "include-x-or-y",
                  "label": "XまたはYを含む"
                },
                "color": "#FFFFFF"
              }
            ],
            "borderColor": "#FFFFFF",
            "borderWidth": "light",
            "flex": 5
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Xを含まない",
                  "data": "not-include-x"
                },
                "color": "#FFFFFF"
              }
            ],
            "borderColor": "#FFFFFF",
            "borderWidth": "light",
            "flex": 3
          },
          {
            "type": "box",
            "layout": "vertical",
            "contents": [
              {
                "type": "button",
                "action": {
                  "type": "postback",
                  "label": "Xを含むがYを含まない",
                  "data": "include-x-not-y"
                },
                "color": "#FFFFFF"
              }
            ],
            "borderColor": "#FFFFFF",
            "borderWidth": "light",
            "flex": 5
          }
        ]
      },
      {
        "type": "box",
        "layout": "horizontal",
        "contents": [
          {
            "type": "button",
            "action": {
              "type": "postback",
              "label": "X , Y , ... 以外で構成される",
              "data": "consist-of-not-x"
            },
            "color": "#FFFFFF"
          }
        ],
        "borderColor": "#FFFFFF",
        "borderWidth": "light"
      }
    ],
    "paddingAll": "none",
    "borderColor": "#FFFFFF",
    "borderWidth": "light"
  },
  "styles": {
    "body": {
      "backgroundColor": "#375e97"
    }
  }
};

const quickReply = {
  "items": [
    {
      "type": "action",
      "action": {
        "type": "message",
        "label": "ルール",
        "text": "ルール"
      }
    },
    {
      "type": "action",
      "action": {
        "type": "message",
        "label": "ボタン",
        "text": "ボタン"
      }
    }
  ]
};

function simpleSearch(str){
  str = str.replace(/〜|～/g, "~").replace(/（(.+)）/g, "($1)").replace(/・|／/g, "/").replace(/ー|‐/g, "-")  // 記号の置換
  str = str.replace(/\?|？|．|。/g, ".");  // １文字
  str = str.replace(/~/g, ".*");  // 含む .*a.*
  str = str.replace(/\(\?\=(.+\/.+)\)/g, "($1)")  // または (a|b)
  str = getHalfWidth(str);  // 全角→半角
  
  replaceSameStr("X", 1);
  replaceSameStr("Y", 2);
  replaceSameStr("Z", 3);

  function replaceSameStr(x, num){
    str = str.replace(new RegExp(x), "(.)");  // 1つ目のxは(.)に置換
    str = str.replace(new RegExp(x, "g"), "\\"+num);  // 2つ目以降のxはすべて\\idxに置換
  }
  replaceSameStr("X");
  replaceSameStr("Y");
  replaceSameStr("Z");

  if(/\-/.test(str)){
    let strArray = str.split("-");
    let head = strArray[0];
    str = strArray[1];

    var headRgx = getFilterRgx(head);
  }
  else{
    // ひらがな
    var headRgx = getFilterRgx("ひ");
  }

  return getWords(str, headRgx);
}

function advancedSearch(pbData, array){
  let strRgx = null;
  const filterRgx = getFilterRgx(array.slice(-1)[0]);  // 文字種フィルター

  for(var i = 0; i < array.length; i++){
    array[i] = getHalfWidth(array[i]);  // 全角→半角
  }
  switch(pbData){
    case("include-x"):
      var X = array[0];
      var N = array[1];
      if(N === "n"){
        strRgx = ".*"+X+".*";
      }
      else{
        strRgx = "(?=.*"+X+").{"+N+"}";
      }
      break;
    case("consist-of-x"):
      var X = array[0];
      var N = array[1];
      if(N === "n"){
        strRgx = "["+X+"]+";
      }
      else{
        strRgx = "["+X+"]{"+N+"}";
      }
      break;
    case("consist-of-x-limited"):
      var X = array[0];
      var M = array[1];
      var N = array[2];
      strRgx = "["+X+"]{"+M+","+N+"}";
      break;
    case("include-x-and-y"):
      var X = array[0];
      var Y = array[1];
      var N = array[2];
      if(N === "n"){
        strRgx = "(?=.*"+X+")(?=.*"+Y+").*";
      }
      else{
        strRgx = "(?=.*"+X+")(?=.*"+Y+").{"+N+"}";
      }
      break;
    case("not-include-x"):
      var X = array[0];
      var N = array[1];
      if(N === "n"){
        strRgx = "(?!.*"+X+").*";
      }
      else{
        strRgx = "(?!.*"+X+").{"+N+"}";
      }
      break;
    case("include-x-or-y"):
      var X = array[0];
      var Y = array[1];
      var N = array[2];
      if(N === "n"){
        strRgx = ".*("+X+"|"+Y+").*";
      }
      else{
        strRgx = "(?=.*("+X+"|"+Y+").*).{"+N+"}";
      }
      break;
    case("include-x-not-y"):
      var X = array[0];
      var Y = array[1];
      var N = array[2];
      if(N === "n"){
        strRgx = "(?=.*"+X+")(?!.*"+Y+").*";
      }
      else{
        strRgx = "(?=.*"+X+")(?!.*"+Y+").{"+N+"}";
      }
      break;
    case("consist-of-not-x"):
      var X = array[0];
      var N = array[1];
      if(N === "n"){
        strRgx = "[^"+X+"]+";
      }
      else{
        strRgx = "[^"+X+"]{"+N+"}";
      }
      break;
  }
  
  return getWords(strRgx, filterRgx);
}

function getHalfWidth(str){
  // 全角→半角
  return str.replace(/[Ａ-Ｚａ-ｚ０-９]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
  });
}

function getFilterRgx(type){
  if(type === "ひ"){
    return /^[\u3040-\u309F]+$/;
  }
  else if(type === "a"){
    return /[a-z]+/;
  }
  else if(type === "漢字"){
    return /^[\u3005-\u3006\u4E00-\u9FFF]+$/;
  }
  else{
    // type === "ひ漢字"
    return /^[\u3040-\u309F\u3005-\u3006\u4E00-\u9FFF]+$/;
  }
  
}

function getWords(str, filterRgx){

  console.log(str);  // CHECK

  str = "/^" + str + "$/";

  let resultArray = wordsArray.filter(RegExp.prototype.test,eval(str));
  resultArray = resultArray.filter(RegExp.prototype.test,eval(filterRgx));  // 文字種フィルタ

  if(resultArray.length === 0){
    return "みつからなかった😣"
  }
  const resultText = "「"+resultArray.join(", ")+"」がみつかったよ😊";
  if(resultText.length > 5000){
    return "いっぱいあってさがしきれないよ😵";
  }
  return resultText;
}

function getUserName(){
  const lastRow = data.getLastRow();  // 最終行取得
  for(let i = 9; i <= lastRow; i++){
    const userId = data.getRange(i,1).getValue();
    const url = 'https://api.line.me/v2/bot/profile/' + userId;
    const userProfile = UrlFetchApp.fetch(url,{
      'headers': {
        'Authorization' :  'Bearer ' + ACCESS_TOKEN,
      },
    })
    data.getRange(i,3).setValue(JSON.parse(userProfile).displayName);    
  }
}

function tmp(){
  console.log(getWords("(.)(.)\\1\\2.{4,6}", /[a-z]+/));
  //console.log(simpleSearch("ＸＹＸＹ"));
}

function doPost(e){
  const events = JSON.parse(e.postData.contents).events;
  for (var i = 0; i < events.length; i++){
    execute(events[i]);
  }
}

function execute(event){
  const eventType = event.type;
  const replyToken = event.replyToken;
  const userId = event.source.userId;
  const displayName = event.source.displayName;

  if(eventType === "follow"){
    const writeRow = data.getLastRow()+1;  // 書く行取得
    data.getRange(writeRow,1).setValue(userId);  // A列目にユーザID記入
    //data.getRange(writeRow,3).setValue(displayName);  // C列目に表示名記入
    data.getDataRange().removeDuplicates([1]);  // ユーザIDの重複を削除

    const messages = [
      {
      "type":"flex",
      "altText":"ルール",
      "contents":rule
      },
      {
        "type":"text",
        "text":"↓これがボタンパネルだよ！",
      },
      {
      "type":"flex",
      "altText":"ボタンパネル",
      "contents":btnList
      }
    ];
    sendReplyMessage(replyToken, messages); 
  }
  else if(eventType === "postback"){
    const pbData = event.postback.data;
    const userIdRow = data.createTextFinder(userId).findNext().getRow();  // ユーザIDが存在する行
    data.getRange(userIdRow,2).setValue(pbData);  // B列目にpbDataを記入
    let text = null;
    let input = "X Y N TYPE";

    switch(pbData){
      case("include-x"):
        text = "Xを含む";
        input = "X N TYPE";
        break;
      case("consist-of-x"):
        text = "XY…で構成される";
        input = "XY… N TYPE";
        break;
      case("consist-of-x-limited"):
        text = "XY…で構成される(M~N文字)";
        input = "XY… M N TYPE";
        break;
      case("include-x-and-y"):
        text = "XとYを含む";
        break;
      case("not-include-x"):
        text = "Xを含まない";
        input = "X N TYPE";        
        break;
      case("include-x-or-y"):
        text = "XまたはYを含む";
        break;
      case("include-x-not-y"):
        text = "Xを含むがYを含まない";
        break;
      case("consist-of-not-x"):
        text = "XY…以外で構成される";
        input = "XY… N TYPE";
        break;
    }
    const messages = [
      {
        "type":"flex",
        "altText":"入力形式",
        "contents":{
          "type": "bubble",
          "body": {
            "type": "box",
            "layout": "baseline",
            "contents": [
              {
                "type": "text",
                "weight": "bold",
                "contents": [
                  {
                    "type": "span",
                    "text": input+"　",
                    "size": "xs",
                    "color": "#375e97"
                  },
                  {
                    "type": "span",
                    "size": "xxs",
                    "color": "#BBBBBB",
                    "text": text
                  }
                ]
              }
            ],
            "paddingAll": "md",
            "paddingStart": "lg"
          }
        }
      }
    ];
    sendReplyMessage(replyToken, messages); 
  }
  else if(eventType === "message"){
    if(event.message.type === "text"){
      const text = event.message.text;
      let messages = null;

      switch(true){
        case(/^ルール$/.test(text)):
          messages = [{
            "type":"flex",
            "altText":"ルール",
            "contents":rule,
            "quickReply": quickReply
            }];
          break;
        case(/^ボタン$/.test(text)):
          messages = [{
            "type":"flex",
            "altText":"ボタンパネル",
            "contents":btnList,
            "quickReply": quickReply
            }];
          break;
        case(/.*(\s|\u3000).*/.test(text)):
          // 高度な検索
          const userIdRow = data.createTextFinder(userId).findNext().getRow();  // ユーザIDが存在する行
          const pbData = data.getRange(userIdRow,2).getValue();  // B列目のpbDataを取得       
          const textArray = text.split(/\s|\u3000/);  // 空白で分割
          messages = [{
            "type":"text",
            "text":advancedSearch(pbData, textArray),
            "quickReply": quickReply
          }];
          break;
        default:
          // シンプルな検索
          messages = [{
            "type":"text",
            "text":simpleSearch(text),
            "quickReply": quickReply
          }];
      }
      sendReplyMessage(replyToken, messages); 
    }
  }
}

function sendReplyMessage(replyToken, messages){
  var url = 'https://api.line.me/v2/bot/message/reply';
  var res = UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': messages 
    }),
  });
  return res;
}
