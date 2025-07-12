const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");
const heading = document.getElementById("h");

// 5 unique image URLs (can be local or from placeholder service)
const uniqueImages = [
  "https://picsum.photos/seed/img1/100",
  "https://picsum.photos/seed/img2/100",
  "https://picsum.photos/seed/img3/100",
  "https://picsum.photos/seed/img4/100",
  "https://picsum.photos/seed/img5/100"
];

let selectedTiles = [];
let allImages = [];

// Shuffle utility
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load and display shuffled images with 1 duplicate
function setupImages() {
  const images = [...uniqueImages];
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicate = images[duplicateIndex];

  allImages = [...images, duplicate];
  shuffle(allImages);

  imageContainer.innerHTML = "";

  allImages.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;
    img.classList.add("img-tile");
    img.dataset.index = idx;

    img.addEventListener("click", () => handleImageClick(img));

    imageContainer.appendChild(img);
  });
}

// Handle tile click
function handleImageClick(img) {
  if (img.classList.contains("selected")) return; // Prevent double-click
  if (selectedTiles.length >= 2) return;

  img.classList.add("selected");
  selectedTiles.push(img);

  resetBtn.style.display = "inline";

  if (selectedTiles.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

// Verify selection
verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedTiles;

  if (img1.src === img2.src) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

// Reset everything
resetBtn.addEventListener("click", () => {
  selectedTiles = [];
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  setupImages();
});

// Initial state
setupImages();

