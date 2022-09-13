import csv
import re

WORDS_PATH = "word.csv"
OLD_KANJI_PATH = "old_kanji.txt"

def get_old_kanji_list():
    with open(OLD_KANJI_PATH, mode="r", encoding="utf-8") as f:
        return f.read()

def remove_chinese(word_array):
    for word in word_array:
        # ひらがなや英数字を含んでいたらスキップ
        if re.search("[0-9a-z\u3040-\u309F\u30FC]+", word):
            continue
        # 旧字体を含んでいたら除く
        if any((k in word) for k in old_kanji_list):
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

word_array = get_ja_word_list()
old_kanji_list = get_old_kanji_list()
word_array = remove_chinese(word_array)
