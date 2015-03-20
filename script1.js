function change() {
  var currentColor = document.getElementById('change-h1').style.color;
  if(currentColor == 'gold') {
    document.getElementById('change-h1').style.color = 'navy';
  }
  else {
    document.getElementById('change-h1').style.color = 'gold';
  }
}
