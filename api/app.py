from flask import Flask
import numpy as np
import pandas as pd
import csv
from random import randint

app = Flask(__name__)

content = []
word_dict = {}

# convert csv into corpus
def make_corpus():
    with open('posts.csv', newline='') as file: 
        filereader = csv.reader(file)
        
        for row in filereader: 
            corpus = row[2].split()
            content.append(corpus)

def make_pairs(corpus): 
    for i in range(len(corpus) - 1): 
        yield (corpus[i], corpus[i + 1])

def generate_dict():
    for row in content: 
        pairs = make_pairs(row)
        for word_1, word_2 in pairs: 
            if word_1 in word_dict.keys(): 
                word_dict[word_1].append(word_2)
            else: 
                word_dict[word_1] = [word_2]

def generate_first_word(content): 
    idx = randint(0, len(content))
    return np.random.choice(content[idx]) 

def generate_text(num_words): 
    first_word = generate_first_word(content)
        
    post = first_word.capitalize() 

    for i in range(num_words): 
        while first_word not in word_dict.keys():
            first_word = generate_first_word(content)
        word2 = np.random.choice(word_dict[first_word])
        first_word = word2
        post += ' ' + word2

    post += '.'
    return post

@app.route('/')
def index(): 
    return 'Root'

@app.route('/generate/<int:num_words>')
def generate(num_words):

    make_corpus()
    generate_dict()

    return generate_text(num_words)


