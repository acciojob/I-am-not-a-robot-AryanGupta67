const images = [
  "https://picsum.photos/id/1011/100",
  "https://picsum.photos/id/1012/100",
  "https://picsum.photos/id/1013/100",
  "https://picsum.photos/id/1014/100",
  "https://picsum.photos/id/1015/100"
];

const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const resultText = document.getElementById("para");

let selectedImages = [];
let imageRefs = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function setupImages() {
  selectedImages = [];
  imageRefs = [];
  container.innerHTML = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  resultText.textContent = "";

  const duplicateIndex = Math.floor(Math.random() * 5);
  const imageSet = [...images];
  const duplicateImage = imageSet[duplicateIndex];

  imageSet.push(duplicateImage); // Add duplicate
  shuffleArray(imageSet);

  imageSet.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    img.className = `img-tile img${index + 1}`; // Adds .img1 to .img6
    img.dataset.src = src;

    img.addEventListener("click", () => handleImageClick(img));

    container.appendChild(img);
    imageRefs.push(img);
  });
}

function handleImageClick(img) {
  if (img.classList.contains("selected")) return;
  if (selectedImages.length >= 2) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length >= 1) {
    resetBtn.style.display = "inline";
  }

  if (selectedImages.length === 2) {
    verifyBtn.style.display = "inline";
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  resultText.textContent = "";
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
});

verifyBtn.addEventListener("click", () => {
  const [img1, img2] = selectedImages;

  if (img1.dataset.src === img2.dataset.src) {
    resultText.textContent = "You are a human. Congratulations!";
  } else {
    resultText.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});
 
// Initial load
setupImages();


