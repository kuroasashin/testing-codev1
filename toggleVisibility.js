function toggleVisibility() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none" || x.style.display === "") {
    x.style.display = "block"; // Or "inline", "flex", etc., depending on the element type
  } else {
    x.style.display = "none";
  }
}
