const divElement = document.getElementById("displayVideoList");

// Get my data from the json file
const xhr = new XMLHttpRequest();
xhr.overrideMimeType('application/json');
xhr.open('GET', '100Tapes.json');
xhr.onload = function() {
  const myVideoList = JSON.parse(xhr.responseText);
  renderHTML(myVideoList);
};
xhr.send();

// render data to html
renderHTML = data => {
  let htmlString = ``;

  // let newData = data.map(x => {
  //   htmlString += `<a href=${x.link}>${x.title}</a>`;
  //   divElement.insertAdjacentHTML("beforeend", htmlString);
  // });

  for (let i = 0; i < data.length; i++) {
    htmlString += `<b> ${i + 1})</b> <a href=${data[i].link}>${
      data[i].title
    }</a><br/>`;
  }

  divElement.insertAdjacentHTML('beforeend', htmlString);
};
