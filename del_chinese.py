import csv
import re

WORDS_PATH = "word.csv"
OLD_KANJI_PATH = "old_kanji.txt"
SIMPLE_KANJI_PATH = "simple_kanji.txt"
COMMON_KANJI_PATH = "common_kanji.txt"

# 簡体字ファイルの更新
def update_simple_kanji(simple_kanji):
    with open(SIMPLE_KANJI_PATH, mode="w", encoding="utf-8") as f:
        f.write(simple_kanji)

# 簡体字文字列から日本語の常用漢字を除いて返す
def get_simple_kanji():
    with open(SIMPLE_KANJI_PATH, mode="r", encoding="utf-8") as f_s, open(COMMON_KANJI_PATH, mode="r", encoding="utf-8") as f_c:
        simple_kanji = f_s.read()
        common_kanji = f_c.read()
        for sk in simple_kanji:
            if sk in common_kanji:
                simple_kanji = simple_kanji.replace(sk, "")
        return simple_kanji

# 旧字体を返す
def get_old_kanji():
    with open(OLD_KANJI_PATH, mode="r", encoding="utf-8") as f:
        return f.read()

def remove_chinese(word_array):
    for word in word_array:
        # ひらがなや英数字を含んでいたらスキップ
        if re.search("[0-9a-z\u3040-\u309F\u30FC]+", word):
            continue
        # 旧字体を含んでいたら除く
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
            words.append(row[0])
    return words

def update_csv(array):
    with open(WORDS_PATH, mode="w", encoding="utf-8") as f:
        # writerowsを使うために二次元リストにする
        array = [[x] for x in array]
        writer = csv.writer(f)
        writer.writerows(array)

# word_array = get_ja_word_list()
# chi_kanji_list = get_old_kanji() + get_simple_kanji()
update_simple_kanji(get_simple_kanji())
# word_array = remove_chinese(word_array)
