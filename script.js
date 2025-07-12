function setupImages() {
  const images = [...uniqueImages];
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const duplicate = images[duplicateIndex];

  allImages = [...images, duplicate];
  shuffle(allImages);

  imageContainer.innerHTML = "";
  selectedTiles = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.textContent = "";

  allImages.forEach((src, idx) => {
    const img = document.createElement("img");
    img.src = src;

    img.classList.add("img-tile");
    img.classList.add(`img${idx + 1}`); // Add Cypress-required class: img1, img2, ...

    img.dataset.index = idx;
    img.addEventListener("click", () => handleImageClick(img));

    imageContainer.appendChild(img);
  });
}

