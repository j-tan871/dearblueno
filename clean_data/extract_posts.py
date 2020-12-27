from bs4 import BeautifulSoup
import pandas as pd
import csv
from datetime import datetime
import nltk
nltk.download()
import re

with open('posts_1.html', 'r') as f:
    with open('posts_1.html', encoding="utf8") as f:
        contents = f.read()
    
    soup = BeautifulSoup(contents, 'html.parser')

fuller_results = soup.find_all('div', class_='pam _3-95 _2pi0 _2lej uiBoxWhite noborder')

content_col = []
date_col = []

for result in fuller_results: 
    text = result.find('div', class_='_2pin').find('div')
    date = result.find('div', class_='_3-94 _2lem')
    
    # convert text to lowercase
    text = text.text.lower()
    # remove emojis
    text = text.encode('ascii', 'ignore').decode()
    # remove stop words
    stop_words = stopwords.words("english")
    text = ' '.join([word for word in text.split(' ') if word not in stop_words])
    
    content_col.append(text)
    
    format = '%b %d, %Y, %H:%M %p'
    date_object = datetime.strptime(date.text, format)
    date_col.append(date_object)

df = pd.DataFrame(data=[date_col, content_col]).transpose()
df
