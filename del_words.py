import csv
import re

WORDS_PATH = "word.csv"
OLD_KANJI_PATH = "old_kanji.txt"
UNNECESSARY_KANJI_PATH = "unnecessary_kanji.txt"
COMMON_KANJI_PATH = "common_kanji.txt"

# 不要な漢字に日本語の常用漢字が含まれていたら除く
def update_unnecessary_kanji():
    with open(UNNECESSARY_KANJI_PATH, mode="r", encoding="utf-8") as f_s, open(COMMON_KANJI_PATH, mode="r", encoding="utf-8") as f_c:
        unnecessary_kanji = f_s.read()
        common_kanji = f_c.read()
        for sk in unnecessary_kanji:
            if sk in common_kanji:
                unnecessary_kanji = unnecessary_kanji.replace(sk, "")
    with open(UNNECESSARY_KANJI_PATH, mode="w", encoding="utf-8") as f:
        f.write(unnecessary_kanji)

# 不要な漢字を返す
def get_unnecessary_kanji():
    with open(UNNECESSARY_KANJI_PATH, mode="r", encoding="utf-8") as f:
        return f.read()

# 旧字体を返す
def get_old_kanji():
    with open(OLD_KANJI_PATH, mode="r", encoding="utf-8") as f:
        return f.read()

# 旧字体や日本語にない漢字を除いて返す
def remove_kanji(word_array, chi_kanji_list):
    for word in word_array:
        # ひらがな(\u3040-\u309F\u30FC)や英数字(0-9a-z)を含んでいたらスキップ
        if re.search("[0-9a-z\u3040-\u309F\u30FC]+", word):
            continue
        # 不要な漢字を含んでいたら除く
        if any((k in word) for k in chi_kanji_list):
            word_array.remove(word)
    return word_array

def get_ja_word_list():
    words = []
    with open(WORDS_PATH, mode="r", encoding="utf-8") as f:
        reader = csv.reader(f)
        for row in reader:
            # 空要素はスキップ
            if len(row) == 0:
                continue
            word = row[0]
            # ラテン文字以外のアルファベットに似た文字をスキップ
            if re.search("[\u00c0-\u0600]+", word):
                continue
            words.append(word)
    return words

def update_csv(array):
    with open(WORDS_PATH, mode="w", encoding="utf-8", newline="") as f:
        # writerowsを使うために二次元リストにする
        array = [[x] for x in array]
        writer = csv.writer(f, lineterminator='\n')
        writer.writerows(array)

word_array = get_ja_word_list()
chi_kanji_list = get_old_kanji() + get_unnecessary_kanji()
word_array = remove_kanji(word_array, chi_kanji_list)
update_csv(word_array)
