#!/usr/bin/python
# -*- coding: utf-8 -*-

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app import db
from app import models
import codecs
import re
f = open('chinese-dictionary.txt','r')
i =0
for line in f.readlines():
    if i < 1200:
        completecompetition = line.split(" ",2)
        traditional = completecompetition[0]
        simplified = completecompetition[1]
        pinyin = re.findall(r'\[([^]]*)\]', completecompetition[2])
        english = re.findall(r'\/([^]]*)\/', completecompetition[2])
        create_engine('sqlite:///app.db?encoding=Unicode')

        i+=1
        if not len(english) == 0:
            
            new_word = models.Word(traditional=unicode(traditional, "utf-8"),simplified=unicode(simplified,'utf-8'),pinyin=unicode(pinyin[0],'utf-8'),english=unicode(english[0],'utf-8'))
            db.session.add(new_word)
            db.session.commit()

#To query everything in the Word table
#word=models.Word.query.all()
#print word

f.close()
