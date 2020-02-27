/* eslint-disable no-alert, no-console */

const divElement = document.getElementById("displayVideoList");

// Get my data from the json file
/**************************************************/
const xhr = new XMLHttpRequest();
xhr.overrideMimeType('application/json');
xhr.open('GET', '100Tapes.json');
xhr.onload = function() {
  const myVideoList = JSON.parse(xhr.responseText);
  renderHTML(myVideoList);
};
xhr.send();
/**************************************************/

// Find strings that match in object
const matchStr = (str, toMatch) => {
  return str.toLowerCase().includes(toMatch.toLowerCase());
};

// Get the Button
const button = document.getElementById('button');
//When you click search on the search button then it will render a new list
button.addEventListener('click', function() {
  // Get the value from the user input box
  const search = document.getElementById('searchText').value;
  // open new request for json file
  xhr.open('GET', '100Tapes.json');
  xhr.onload = function() {
    // we need both the title and the link for the renderHTML function to work
    const myVideoInfo = JSON.parse(xhr.responseText);
    const videoInfo = myVideoInfo.filter(data => {
      return matchStr(data.title, search);
    })
    divElement.innerHTML = "";
    renderHTML(videoInfo);
  };
  xhr.send();
});

// render data to html
function renderHTML(data) {
  let htmlString = ``;
  // iterate over all titles and bring back the titles and iframes
  for (let i = 0; i < data.length; i++) {
    // split the link and get the last part for the embed code
    const embedCode = data[i].link.split('/').pop();
    htmlString += `<div class="videoHolder"><b>${i + 1}) </b>${data[i].title}<br/>
    <iframe class="video" width="400" height="250" src="https://www.youtube.com/embed/${embedCode}" frameborder="0" allowfullscreen></iframe>
    </div>
    `;
  }
  divElement.insertAdjacentHTML('beforeend', htmlString);
}
