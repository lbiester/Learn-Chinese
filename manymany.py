from app import db, models

user1 = models.User.query.first()
word1 = models.Word.query.filter_by(english="group of people").first()
word2 = models.Word.query.filter_by(english="a little bit").first()
word3 = models.Word.query.filter_by(english="one aspect is").first()

set1 = models.Set("set1_name", user1)
set2 = models.Set("set2_name", user1)
set1.words.append(word1)
set1.words.append(word2)
set2.words.append(word2)
set2.words.append(word3)

for pop in word2.sets:
    print pop.name
for blop in set1.words:
    print blop.english
    print blop.traditional
