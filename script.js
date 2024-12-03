//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");

const imageUrls = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];


const outputDiv = document.getElementById("output");
const downloadButton = document.getElementById("download-images-button");

// Function to load a single image
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    // On successful load, resolve the promise
    img.onload = () => resolve(img);

    // On error, reject with a message
    img.onerror = () => reject(`Failed to load image's URL: ${url}`);
  });
}

// On button click, start downloading images
downloadButton.addEventListener("click", async () => {
  outputDiv.innerHTML = ""; // Clear previous images
  const promises = imageUrls.map((url) => loadImage(url));

  try {
    // Wait for all promises to resolve
    const images = await Promise.all(promises);

    // Append each successfully loaded image to the output div
    images.forEach((img) => outputDiv.appendChild(img));
  } catch (error) {
    // Handle any image loading error
    console.error(error);
    const errorDiv = document.createElement("div");
    errorDiv.textContent = error;
    errorDiv.style.color = "red";
    outputDiv.appendChild(errorDiv);
  }
});
