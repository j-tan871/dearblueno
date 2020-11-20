from bs4 import BeautifulSoup
import csv

with open('posts_1.html', 'r') as f:
    with open('posts_1.html', encoding="utf8") as f:
        contents = f.read()
    
    soup = BeautifulSoup(contents, 'html.parser')

results = soup.find_all('div', class_='_2pin')

arr = []
for result in results: 
    text = result.find('div')
    arr.append(text.text)
    print(text.text)

with open('posts_1.csv', 'w', encoding='utf-8', newline='') as f: 
      
    # using csv.writer method from CSV package 
    write = csv.writer(f) 
      
    for item in arr: 
        if item == ' ': 
            continue
        write.writerow([item])

print(arr)