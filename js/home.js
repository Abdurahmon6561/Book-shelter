const BASE_URL_IMG = "https://covers.openlibrary.org/b/olid";

const logOut = document.querySelector(".logOut");
const confirm = document.querySelector(".confirm");
const confirmation = document.querySelector(".confirmation-section");
const noBtn = document.querySelector(".noBtn");
const yesBtn = document.querySelector(".yesBtn");
const closeBtn = document.querySelector(".closeBtn");
const modalSection = document.querySelector(".modal-section");
const modalClose = document.querySelector(".modalClose");
const savedBooks = document.querySelector(".savedBooks");
const books = document.querySelector(".books");
const modalLeft = document.querySelector(".modal-left");

const modalTitle = document.querySelector(".modal-title");
const modalAuthor = document.querySelector(".Author");
const modalPublish = document.querySelector(".publish");
const modalPublisher = document.querySelector(".publisher");
const modalCategory = document.querySelector(".category");
const modalPages = document.querySelector(".pagesCount");
const modalBookName = document.querySelector(".modalBookName");

//log out js
logOut.addEventListener("click", () => {
  confirm.classList.remove("hidden");
  yesBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
  noBtn.addEventListener("click", () => {
    confirm.classList.add("hidden");
  });
  closeBtn.addEventListener("click", () => {
    confirm.classList.add("hidden");
  });
  confirmation.addEventListener("click", () => {
    confirm.classList.add("hidden");
  });
});


// request
const getData = async () => {
  const responce = await fetch(
    "https://openlibrary.org/people/mekBot/books/currently-reading.json"
  );
  const data = await responce.json();
  return data;
};

getData()
  .then((data) => {
    data.reading_log_entries.forEach((item) => {
      console.log(item);
      books.innerHTML += `
      <div class="bookCard" id="${item.work.cover_id}">
            <img
              src="${BASE_URL_IMG}/${item.work.cover_edition_key}.jpg"
              alt="photo2"
              width="201"
              height="202"
            />
            <h3 class="bookName">${item.work.title}</h3>
            <span class="Author">${item.work.author_names[0]}</span>
            <span class="bookYear">${item.work.first_publish_year}</span>
            <div>
              <button class="btn bookmark" onclick="bookmark(${item.work.cover_id})">Bookmark</button>
              <button class="btn moreInfo" onclick="moreInfo(${item.work.cover_id})">More Info</button>
            </div>
            <button class="btn read">Read</button>
          </div>`;
    });
  })
  .catch((err) => {
    console.log(err);
  });

document.addEventListener("keydown", (e) => {
  if (e.which === 27) {
    confirm.classList.add("hidden");
  }
});

modalClose.addEventListener("click", () => {
  modalSection.classList.add("hidden");
});
modalLeft.addEventListener("click", () => {
  modalSection.classList.add("hidden");
});

// moreInfo
const moreInfo = function (id) {
  getData().then((data) => {
    data.reading_log_entries.forEach((item) => {
      if (item.work.cover_id === id) {
        modalBookName.textContent = `${item.work.title}`;
        modalAuthor.textContent = `${item.work.author_names["0"]}`;
        modalPublish.textContent = `${item.work.first_publish_year}`;
      }
    });
  });
  modalSection.classList.remove("hidden");
};

// bookmark
const bookmark = function (id) {
  getData().then((data) => {
    data.reading_log_entries.forEach((item) => {
      if (item.work.cover_id === id) {
        savedBooks.innerHTML += `
        <div class="savedBook" id="${id}">
        <div>
          <h4>${item.work.title}</h4>
          <span>${item.work.author_names[0]}</span>
        </div>
        <div class="savedIcons">
          <img
            src="./image/icons/book-open-btn.svg"
            alt="book-open"
            width="24"
            height="24"
            class="bookOpen"
            onclick = "bookOpen(${id})"
          />
          <img
            src="./image/icons/delete-btn.svg"
            alt="deleteIcon"
            width="24"
            height="24"
            class="deleteIcon"
            onclick="deleteFunction(${id})"
          />
        </div>
      </div>
        `;
      }
    });
  });
};

const deleteFunction = function (id) {
  const savedBook = document.querySelectorAll(".savedBook");
  savedBook.forEach((item) => {
    if (item.id == id) {
      item.remove();
    }
  });
};

const bookOpen = function (id) {
  getData().then((data) => {
    data.reading_log_entries.forEach((item) => {
      if (item.work.cover_id === id) {
        modalBookName.textContent = `${item.work.title}`;
        modalAuthor.textContent = `${item.work.author_names["0"]}`;
        modalPublish.textContent = `${item.work.first_publish_year}`;
      }
    });
  });
  modalSection.classList.remove("hidden");
};

// search
const formHome = document.querySelector("#formHome");

formHome.addEventListener("keyup", (e) => {
  e.preventDefault();
  const inputValue = e.target.value.trim().toLowerCase();
  const bookNames = document.querySelectorAll(".bookName");
  bookNames.forEach((item) => {
    if (item.textContent.toLowerCase().includes(inputValue)) {
      item.parentElement.classList.remove("hidden");
    } else {
      item.parentElement.classList.add("hidden");
    }
  });
});






// Dark mode
const body = document.querySelector("body");
const lightMode = document.querySelector(".lightmode");
const darkMode = document.querySelector(".darkmode");

lightMode.addEventListener("click", () => {
  lightMode.classList.add("hidden");
  darkMode.classList.remove("hidden");
  body.classList.add("dark-mode");
});

darkMode.addEventListener("click", () => {
  lightMode.classList.remove("hidden");
  darkMode.classList.add("hidden");
  body.classList.remove("dark-mode");
});

