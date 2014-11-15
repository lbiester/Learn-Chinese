
import codecs
import re

#with codecs.open('chinese-dictionary.txt', encoding='utf-8') as file:
    #f = file.read()
f = open('chinese-dictionary.txt','r')
i = 0
for line in f.readlines():
    if i < 8:

        completecompetition = line.split(" ",2)
        traditional = completecompetition[0]
        simplified = completecompetition[1]
        pinyin = re.findall(r'\[([^]]*)\]', completecompetition[2])
        english = re.findall(r'\/([^]]*)\/', completecompetition[2])
        print traditional,simplified,pinyin,english
        i+=1
f.close()