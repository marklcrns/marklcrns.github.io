function enableSubmit() {
  var submit = document.getElementById("submit");
  submit.disabled = false;
  submit.classList.remove("disabled");
  submit.classList.add("rounded");
}
