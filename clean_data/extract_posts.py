from bs4 import BeautifulSoup
import pandas as pd
import csv
from datetime import datetime
import nltk
nltk.download()
import re
from nltk.corpus import stopwords
import string

# open html file
with open('posts_1.html', 'r') as f:
    with open('posts_1.html', encoding="utf8") as f:
        contents = f.read()
    
    soup = BeautifulSoup(contents, 'html.parser')

# find div with text content 
fuller_results = soup.find_all('div', class_='pam _3-95 _2pi0 _2lej uiBoxWhite noborder')

# for result in fuller_results: 
#      print(result.prettify())

content_col = []
date_col = []

# clean text data
for result in fuller_results: 
    text = result.find('div', class_='_2pin').find('div')
    date = result.find('div', class_='_3-94 _2lem')
    
    text = text.text
    
    # remove emojis
    text = text.encode('ascii', 'ignore').decode()
    
    # remove ticks
    text = re.sub("\"\w+", '', text)
    text = re.sub("\'\w+", '', text)

    # remove ellipses and unnecessary punctuation
    text = re.sub('([.][\s]){2,}', ' ', text)
    text = re.sub('[%s]' % '*', ' ', text)
    text = re.sub('[%s]' % '-', ' ', text)
    
    # remove numbers
    text = re.sub(r'\w*\d+\w*', '', text)
    
    # remove extra spaces
    text = re.sub('\s{2,}', " ", text)
    
    content_col.append(text)
    
    format = '%b %d, %Y, %H:%M %p'
    date_object = datetime.strptime(date.text, format)
    date_col.append(date_object)
    
df = pd.DataFrame(data=[date_col, content_col]).transpose()

# save to csv file
df.to_csv('posts.csv', mode='w')