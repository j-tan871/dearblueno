from flask import Flask
from flask_cors import CORS, cross_origin
import numpy as np
import pandas as pd
import csv
from random import randint

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

content = []
word_dict = {}
trump_dict = {}
austen_dict = {}

# convert csv into corpus
def make_blueno_corpus():
    with open('posts.csv', newline='') as file: 
        filereader = csv.reader(file)
        
        for row in filereader: 
            corpus = row[2].split()
            content.append(corpus)

def make_corpus(file): 
    text = open(file, encoding='utf8').read()
    corpus = text.split()
    return corpus

def make_pairs(corpus): 
    for i in range(len(corpus) - 1): 
        yield (corpus[i], corpus[i + 1])

def generate_blueno_dict():
    for row in content: 
        pairs = make_pairs(row)
        for word_1, word_2 in pairs: 
            if word_1 in word_dict.keys(): 
                word_dict[word_1].append(word_2)
            else: 
                word_dict[word_1] = [word_2]

def generate_dict(corpus, dict): 
    pairs = make_pairs(corpus)
    for word_1, word_2 in pairs: 
        if word_1 in dict.keys(): 
            dict[word_1].append(word_2)
        else: 
            dict[word_1] = [word_2]

def generate_first_word(content): 
    idx = randint(0, len(content))
    return np.random.choice(content[idx]) 

def generate_blueno_text(num_words): 
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

def generate_text(num_words, corpus, dict): 
    first_word = np.random.choice(corpus)

    post = first_word.capitalize()

    for i in range(num_words):
        while first_word not in dict.keys(): 
            first_word = np.random.choice(corpus)
        word2 = np.random.choice(dict[first_word])
        first_word = word2
        post += ' ' + word2

    post += '.'
    return post

make_blueno_corpus()
trump_corpus = make_corpus('speeches.txt')
austen_corpus = make_corpus('prideandprejudice.txt')

generate_blueno_dict()
generate_dict(trump_corpus, trump_dict)
generate_dict(austen_corpus, austen_dict)

@app.route('/')
@cross_origin()
def index(): 
    return 'Root'

@app.route('/generate/blueno/<int:num_words>')
@cross_origin()
def generate(num_words):
    return {
        "text": generate_blueno_text(num_words)
    }

@app.route('/generate/trump/<int:num_words>')
@cross_origin()
def generate_trump(num_words): 
    return {
        "text": generate_text(num_words, trump_corpus, trump_dict)
    }

@app.route('/generate/austen/<int:num_words>')
@cross_origin()
def generate_austen(num_words): 
    return {
        "text": generate_text(num_words, austen_corpus, austen_dict)
    }


