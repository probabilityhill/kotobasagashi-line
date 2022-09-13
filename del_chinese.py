import csv
import re

WORDS_PATH = "word.csv"
KANJI_PATH = "Unihan_Variants.txt"

# 繁体字・簡体字にしかない文字リストを作成
def get_chi_kanji_list():
    # FILTER = 'kTraditionalVariant'
    FILTER = 'kSimplifiedVariant' # 簡体字版がある文字＝繁体字
    codes = []
    with open(KANJI_PATH, mode="r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            tokens = line.split('\t')
            if len(tokens) < 3:
                continue
            if tokens[1] == FILTER and tokens[0] != tokens[2]:
                codes.append(tokens[0].replace('U+', r'\u'))
    return codes

def remove_chinese(word_array, codes):
    for word in word_array:
        word_uni_escape = ascii(word)
        # ひらがなと英数字を含んでいたらスキップ
        if re.search("[0-9a-z\u3040-\u309F\u30FC]+", word):
            continue
        if any((c in word_uni_escape) for c in codes):
            print(word)

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

def update_csv():
    with open(WORDS_PATH, mode="w", encoding="utf-8") as f:
        writer = csv.writer(f)
        writer.writerows(sentences)

word_array = get_ja_word_list()
codes = get_chi_kanji_list()
remove_chinese(word_array, codes)
