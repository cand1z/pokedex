const loadingDiv = document.getElementById("loading");
const titlePokedex = document.getElementById("headerTitle");

function showLoading() {
  loadingDiv.style.display = "flex";
  titlePokedex.style.display = "none";
}

function hideLoading() {
  loadingDiv.style.display = "none";
  titlePokedex.style.display = "flex";
}
