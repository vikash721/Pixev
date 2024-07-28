const accessKey = "x83UMmCJT0zzqh3GCS2JtqIvuqDRkoaBbRq6zkPXHh8";

const button = document.getElementById("search-button");
const inputEl = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMore = document.getElementById("show-more-button");

// category element

const categories = document.querySelectorAll(".category");

let inputData = "";
let page = 1;

// Function to search images based on user input

async function searchImages(inputData) {
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const results = data.results;
    console.log(results);

    if (page === 1) {
      searchResults.innerHTML = "";
    }

    results.map((result) => {
      const imageWrapper = document.createElement("div");
      imageWrapper.classList.add("search-result");

      const image = document.createElement("img");
      image.src = result.urls.small;

      image.alt = result.alt_description;
      const imageLink = document.createElement("a");
      imageLink.target = "_blank";
      imageLink.textContent = result.alt_description;

      imageWrapper.appendChild(image);
      imageWrapper.appendChild(imageLink);
      searchResults.appendChild(imageWrapper);
    });

    page++;

    if (page > 1) {
      showMore.style.display = "block";
    }
  } catch (error) {
    console.error("An error occurred:", error);
    searchResults.innerHTML =
      "<p>Sorry, something went wrong. Please try again later.</p>";
    showMore.style.display = "none";
  }
}

// Event listeners for category clicks

categories.forEach((category) => {
  category.addEventListener("click", () => {
    const searchFor = category.innerHTML.trim();
    inputData = searchFor; // Set inputData to the selected category
    page = 1; // Reset page number for a new category search
    searchImages(inputData);
  });
});

button.addEventListener("click", (event) => {
  event.preventDefault();
  inputData = inputEl.value.trim();

  if (inputData === "") {
    alert("Please enter something.");
    return;
  }
  page = 1;
  searchImages(inputData);
});

showMore.addEventListener("click", () => {
  if (inputData) {
    searchImages(inputData);
  } else {
    alert("Please enter something.");
  }
});
