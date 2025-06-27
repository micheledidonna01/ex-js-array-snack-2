const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];


/* Snack 1*/

const longBooks = books.filter(b => b.pages > 300);
const longBooksTitles = longBooks.map(b => b.title);
console.log("Titles Books with more 300 pages:", longBooksTitles);

/* Snack 2 */
const availableBooks = books.filter(b => b.available === true);
console.log("Available Books:", availableBooks);

const discountBooks = availableBooks.map(b => {
    b.price = b.price.replace('€', '');
    b.price = parseFloat(b.price);
    b.price = (b.price - b.price * 0.2).toFixed(2);
    b.price = b.price.toString() + '€';
    return b;
});

const fullPricedBook = discountBooks.find(b => {
    if(b.price.endsWith("00€")) {
        b.price = b.price.replace('.00', '');
        return b;
    }

})
console.log("Full Price Book:", fullPricedBook);


/* Snack 3 */
const authors = books.map(b => b.author);
authors.sort((a,b) => b.age - a.age);
const areAuthorsAdults = authors.every(a => a.age >= 18);
console.log(areAuthorsAdults);
console.log("Authors sorted by age DESC:", authors);

/* Snack 4 */
const ages = books.map(b => b.author.age);
console.log("Ages of Authors:", ages);
const sumAges = ages.reduce(((acc, age) => {
    acc = acc + age;
    return acc;
}), 0);
console.log("Sum of Ages:", sumAges);
const mediaAges = sumAges / ages.length;
console.log("Media of Ages:", mediaAges);

/* Snack 5 */

async function getBooks(){
    const ids = [2, 13, 7, 21, 19];
    const idsString = ids.map(id => id.toString());
    const promises = idsString.map(id => {
        return fetchJson(`http://localhost:3333/books/${id}`)
    });
    const result = await Promise.allSettled(promises);
    console.log(result);
    
    return result;
}


async function fetchJson(url){
    const response = await fetch(url);
    const book = await response.json();
    return book;
}

getBooks()
.then(data => console.log("Data fetched:", data))
.catch(error => console.error("Error fetching data:", error));


/* Snack 6 */
const areThereAvailableBooks = books.some(b => b.available === true);
const booksByPrice = books.sort((a, b) => {
    const aInt = parseFloat(a.price.replace('€', ''));
    const bInt = parseFloat(b.price.replace('€', ''));
    return aInt - bInt;
});

booksByPrice.sort((a, b) => {
    a = a.available.toString();
    b = b.available.toString();
    return b.localeCompare(a);
});


console.log("Are there available books?", areThereAvailableBooks);
console.log("Books ordere by price and available", booksByPrice);


/* Snack 7 */
const tagCounts = books.map(b => b.tags.map((t, index) => t[index])).reduce(((acc, count) => {
    if (count){
        acc ++;
    }
    return acc;
}), 0);

console.log(tagCounts);