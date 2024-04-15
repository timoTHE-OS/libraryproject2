// function calculateRecommendation() {
//   const q1 = parseInt(document.getElementById("q1").value);
//   const q2 = parseInt(document.getElementById("q2").value);
//   const q3 = parseInt(document.getElementById("q3").value);

//   let personalityType;
//   if (q1 === 1 && q2 === 1 && q3 === 1) {
//     personalityType = "Fantasy Reader";
//   } else if (q1 === 2 && q2 === 2 && q3 === 2) {
//     personalityType = "Thrill Seeker";
//   } else if (q1 === 3 && q2 === 3 && q3 === 3) {
//     personalityType = "Romantic Soul";
//   } else if (q1 === 4 && q2 === 4 && q3 === 4) {
//     personalityType = "Self-Help Enthusiast";
//   } else {
//     personalityType = "Eclectic Reader";
//   }

//   fetchBooks(personalityType);
// }

// async function fetchBooks(personalityType) {
//   const apiKey = "AIzaSyCT-FTMTqU0r5HHkqps21IZ32R_Qbz4OJ0"; // Replace with your Google Books API key
//   const url = `https://www.googleapis.com/books/v1/volumes?q=${personalityType}&key=${apiKey}&maxResults=3`;

//   try {
//     const response = await fetch(url);
//     const data = await response.json();
//     displayRecommendations(data.items);
//     saveBooksToLocalstorage(data);
//   } catch (error) {
//     console.error("Error fetching book recommendations:", error);
//   }
// }

// function saveBooksToLocalstorage(books) {
//   const booksJSON = JSON.stringify(books);
//   localStorage.setItem("books", booksJSON);
// }

// function getBooksFromLocalStorage() {
//   const booksJSON = localStorage.getItem("books");
//   return JSON.parse(booksJSON);
// }

// //  console.log(saveBooksToLocalstorage, "books saved")
// // fetchBooks(personalityType);

// function displayRecommendations(books) {
//   const bookList = document.getElementById("bookList");
//   bookList.innerHTML = "";

//   books.forEach((book) => {
//     const title = book.volumeInfo.title;
//     const authors = book.volumeInfo.authors
//       ? book.volumeInfo.authors.join(", ")
//       : "Unknown Author";
//     const description =
//       book.volumeInfo.description || "No description available";
//     const thumbnail = book.volumeInfo.imageLinks
//       ? book.volumeInfo.imageLinks.thumbnail
//       : "";

//     const bookItem = document.createElement("div");
//     bookItem.classList.add("book");
//     bookItem.innerHTML = `
//     <div class="bookdetails">
//       <img class="thumbimg" src="${thumbnail}" alt="Book Cover">
//       <div class="bookdata">
//         <h3>${title}</h3>
//         <p>By ${authors}</p>
//         <p>${description}</p>
//       </div>
//       </div>
//     `;
//     bookList.appendChild(bookItem);
//     console.log(books);
//   });

//   document.getElementById("result").style.display = "block";
// }

// document.addEventListener("DOMContentLoaded", function () {
//   const savedBooks = getBooksFromLocalStorage();

//   if (savedBooks) {
//     displayRecommendations(savedBooks);
//   } else {
//     fetchBooks();
//   }
// });

function calculateRecommendation() {
  const q1 = parseInt(document.getElementById("q1").value);
  const q2 = parseInt(document.getElementById("q2").value);
  const q3 = parseInt(document.getElementById("q3").value);

  let personalityType;
  if (q1 === 1 && q2 === 1 && q3 === 1) {
    personalityType = "Fantasy Reader";
  } else if (q1 === 2 && q2 === 2 && q3 === 2) {
    personalityType = "Thrill Seeker";
  } else if (q1 === 3 && q2 === 3 && q3 === 3) {
    personalityType = "Romantic Soul";
  } else if (q1 === 4 && q2 === 4 && q3 === 4) {
    personalityType = "Self-Help Enthusiast";
  } else {
    personalityType = "Eclectic Reader";
  }

  fetchBooks(personalityType);
}

async function fetchBooks(personalityType) {
  const apiKey = "AIzaSyCT-FTMTqU0r5HHkqps21IZ32R_Qbz4OJ0"; // Replace with your Google Books API key
  const url = `https://www.googleapis.com/books/v1/volumes?q=${personalityType}&key=${apiKey}&maxResults=3`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    saveBooksToLocalstorage(data.items); // Save only the necessary book information
    displayRecommendations(data.items);
  } catch (error) {
    console.error("Error fetching book recommendations:", error);
  }
}

function saveBooksToLocalstorage(books) {
  const booksJSON = JSON.stringify(
    books.map((book) => ({
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      description: book.volumeInfo.description,
      thumbnail: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : "",
    }))
  );
  localStorage.setItem("books", booksJSON);
}

function getBooksFromLocalStorage() {
  const booksJSON = localStorage.getItem("books");
  return JSON.parse(booksJSON);
}

function displayRecommendations(books) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";

  if (!books) {
    console.error("No books to display!"); // Log error if books is undefined
    return;
  }
  books.forEach((book) => {
    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ")
      : "Unknown Author";
    const description =
      book.volumeInfo.description || "No description available";
    const thumbnail = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : "";

    const bookItem = document.createElement("div");
    bookItem.classList.add("book");
    bookItem.innerHTML = `
      <div class="bookdetails">
        <img class="thumbimg" src="${thumbnail}" alt="Book Cover">
        <div class="bookdata">
          <h3>${title}</h3>
          <p>By ${authors}</p>
          <p>${description}</p>
        </div>
      </div>
    `;
    bookList.appendChild(bookItem);
  });

  document.getElementById("result").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function () {
  const savedBooks = getBooksFromLocalStorage();

  if (savedBooks) {
    // displayRecommendations(savedBooks);
    document.getElementById("bookList").textContent = savedBooks;
    console.log(savedBooks);
    console.log("Saved books from local storage:", savedBooks); // Log saved books
  } else {
    fetchBooks(personalityType);
  }
});
