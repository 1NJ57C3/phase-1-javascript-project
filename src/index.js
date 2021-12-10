const main = document.querySelector('div#character-bar');
const viewer = document.querySelector('div#character-viewer');
const headBar = document.querySelector('div.logo')

const viewerBio = document.querySelector('span#viewer-bio');
const commentViewer = document.querySelector('span#comment-viewer')

const viewerClose = document.querySelector('button#viewer-close');
const commentToggle = document.querySelector('p#comment-drawer')

const viewerImg = document.querySelector('img#image');
const viewerName = document.querySelector('p#name');
const viewerAlias = document.querySelector('p#alias');
const viewerBday = document.querySelector('p#birthday');
const viewerOccupation = document.querySelector('p#occupation');
const viewerStatus = document.querySelector('p#status');
const viewerShows = document.querySelector('p#category');
const viewerActor = document.querySelector('p#portrayed');
const commentForm = document.querySelector('#comment-form')

const discussion = document.querySelector('tbody#discussion');
const formInput = document.querySelector('input#username')
const formComment = document.querySelector('input#comment')

const charArr = []
const charArrId = parseInt(viewerImg.id);

function fetchCharacters() {
  fetch('https://breakingbadapi.com/api/characters')
  .then(res => res.json())
  .then(data => {
    indexCharacters(data)
    renderCharacters(charArr)
  })
}

function fetchCharacter(charId) {
  fetch(`https://breakingbadapi.com/api/characters/${charId}`)
  .then(res => res.json())
  .then(char => {
    viewCharacter(char)
  })
}

function indexCharacters(d) {
  d.forEach((character, i) => {
    charArr.push(d[i]);
    charArr[i].comment = [];
  })
  console.log(charArr)
}

function renderCharacters(chars) {
  chars.forEach((char, i) => {
    const span = document.createElement('span');
    span.className = 'char-select';
    const img = document.createElement('img');
    img.src = char.img;
    img.alt = 'Image of ' + char.name;
    img.id = [i]
    span.append(img);
    main.appendChild(span);
  })
}

function viewCharacter(i) {
  viewerImg.src = charArr[i].img;
  viewerImg.alt = 'Photo of ' + charArr[i].name, + 'also known as ' + charArr[i].nickname;
  viewerImg.id = i;
  viewerName.innerText = 'Name : ' + charArr[i].name;
  viewerAlias.innerText = 'Alias : ' + charArr[i].nickname;
  viewerBday.innerText = 'Date of Birth : ' + charArr[i].birthday;
  viewerOccupation.innerText = 'Occupation : ' + charArr[i].occupation.join(', ');
  viewerStatus.innerText = 'Currently : ' + charArr[i].status;
  viewerShows.innerText = 'Appears in : ' + charArr[i].category;
  viewerActor.innerText = 'Played by : ' + charArr[i].portrayed;
  viewerClose.style.position = 'fixed';
  viewerClose.style.right = '2.5%';
  updateComments();
}

function renderComments() {
  charArr[viewerImg.id].comment.forEach((obj, i) => {
    renderComment(obj, i)
  })
}

function renderComment(obj, i) {
  const tbody = discussion;
  const tr = document.createElement('tr');
  tbody.prepend(tr);
  const td = document.createElement('td');
  const td2 = document.createElement('td');
  td.id = 'user';
  td.innerText = obj.user;
  tr.append(td);
  td2.id = 'comment';
  td2.innerText = obj.comment;
  tr.append(td2);
}

function clearDiscuss() {
  discussion.innerHTML = '';
}

function updateComments() {
  clearDiscuss();
  renderComments();
}

function commentDrawer() {
  const commentToggler = (commentToggle.innerText === 'Open Discussion >>');
  commentToggler ? viewerImg.style.float = 'left' : viewerImg.style.float = '';
  commentToggler ? viewerBio.style.display = 'none' : viewerBio.style.display = 'block';
  commentToggler ? viewerClose.style.position = '' : viewerClose.style.position = 'fixed';
  commentToggler ? viewerClose.style.right = '' : viewerClose.style.right = '2.5%';
  commentToggler ? viewerClose.style.float = 'right' : viewerClose.style.float = '';
  // commentToggler ? commentToggle.style.position = '' : commentToggle.style.position = 'fixed';
  // commentToggler ? commentToggle.style.right = '' : commentToggle.style.right = '2.5%';
  // commentToggler ? commentToggle.style.bottom = '' : commentToggle.style.bottom = '2.5%';
  // commentToggler ? commentToggle.style.float = '' : commentToggle.style.float = 'right';
  commentToggler ? commentViewer.style.display = 'block' : commentViewer.style.display = 'none';
  commentToggler ? commentToggle.innerText = '<< Close Discussion' : commentToggle.innerText = 'Open Discussion >>';
}

document.addEventListener('DOMContentLoaded', () => {
  fetchCharacters();
  
  main.addEventListener('click', e => {
    if (e.target.nodeName === 'IMG') {
      viewCharacter(e.target.id);
      updateComments();
      viewer.style.display = 'block';
    } else {
      viewer.style.display = 'none';
    }
  })

  headBar.addEventListener('click', e => {
    viewer.style.display = 'none';
  })

  viewerClose.addEventListener('click', (e) => {
    viewer.style.display = 'none';
  })

  commentToggle.addEventListener('click', e => {
    commentDrawer()
  })
    
  document.addEventListener('keydown', e => {
    if(viewer.style.display === 'block' && e.key === 'ArrowLeft') {
      if (parseInt(viewerImg.id) === 0) {
        viewCharacter(charArr.length-1);
      } else {
        viewCharacter(viewerImg.id-1)
      }
    }
    if(viewer.style.display === 'block' && e.key === 'ArrowRight') {
      if (parseInt(viewerImg.id) === charArr.length-1) {
        viewCharacter(0);
      } else {
        viewCharacter(parseInt(viewerImg.id)+1);
      }
    }
  })

  commentForm.addEventListener('submit', e => {
    console.log(e);
    e.preventDefault();
      charArr[viewerImg.id].comment.push({
        user: formInput.value,
        comment: formComment.value
    })
    updateComments();
    commentForm.reset();
  })
})