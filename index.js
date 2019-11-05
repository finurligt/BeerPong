function config() {
  var playersRef = firebase.database().ref('players')
  playersRef.on('value',gotData, gotErr)
}
config();

function gotData(data)  {
  fillTable(data);
}

function gotErr(err) {
  console.log('Error!')
  console.log(err);
}

function fillTable(data) {

  var playerArray = []
  data.forEach(function(child) {
    playerArray.push([child.val().name,child.val().rating]);
  });

  playerArray.sort(function(a ,b) {
    return b[1] - a[1];
  })

  console.log(playerArray);

  const tableBody = document.getElementById('tableBody');
  let dataHtml = '';
  for (let i = 0; i < playerArray.length; i++) {
    dataHtml += `<tr><td><a href="#">${i+1}</a></td><td><a href="#">${playerArray[i][0]}</a></td><td><a href="#">${playerArray[i][1]}</a></td></tr>`
  }

  tableBody.innerHTML = dataHtml;

}
