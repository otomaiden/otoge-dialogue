const cast = [
  {
    name: [''],
    class: 'unknown',
    colour: '#cecece',
    icon: 'kbo/unknown.png',
  },
  {
    name: ['Hinako Nakayama'],
    class: 'mc',
    colour: '#f2bed1',
    icon: 'kbo/hinako.png',
  },
  {
    name: ['Haruo Sakaguchi', 'Passerby'],
    class: 'sakaguchi',
    colour: '#dec171',
    icon: 'kbo/sakaguchi.png'
  },
  {
    name: ['Hikaru Onigashima', 'Male Student'],
    colour: '#bee0fe',
    icon: 'kbo/hikaru.png',    
  }
];

const scene = [
  {
    class: 'date',
    icon: 'calendar_month'
  },
  {
    class: 'time',
    icon: 'schedule'
  },
  {
    class: 'location',
    icon: 'location_on'
  },
  {
    class: 'fight',
    icon: 'sports_mma'
  }
];


function addMaterialIcons () {
  const linkElement = document.createElement('link');
  linkElement.rel = 'stylesheet';
  linkElement.href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200'
  document.getElementsByTagName('head')[0].append(linkElement);
}

function wrap(el, wrapper) {
  el.parentNode.insertBefore(wrapper, el);
  return wrapper.appendChild(el);
}

function findName(value, nameList) {
  let found = false;
  nameList.forEach(name => {
    if (name === value) {
      found = true;
     }
  })
  return found;
}

function addPictures () {
  console.log('hello');
  const coll = document.getElementsByTagName('blockquote');
  for (let block of coll) {
    if (block.firstElementChild.nodeName === 'B') {
      let index = cast.findIndex(member => {
        let found = findName(block.firstElementChild.textContent, member.name);
        if (found === true) {
          return found;
        }
      });
      if (index === -1) { index = 0; }
      
      let newElement = document.createElement('div');
      newElement.classList.add('withImg');
      img = document.createElement('img');
      img.src = 'icons/' + cast[block.classList.contains('unknown') ? 0 : index].icon;
      img.classList.add("icon");
      newElement.append(img);

      for (let dialogue of block.childNodes) {
        if (dialogue.nodeName === 'P') {
          dialogue.style.borderColor = cast[index].colour;
        }
      }
      wrap(block, newElement);
    } else {
      block.classList.add('narration');
    }
  }

}

function addSceneIcons () {
  scene.forEach(type => {
    const elements = document.getElementsByClassName(type.class);
    for (let item of elements) {
      const icon = document.createElement('span');
      icon.classList.add('material-symbols-outlined');
      icon.textContent = type.icon;
      item.parentNode.insertBefore(icon, item)
    }  
  });
}

function createChoices () {
  let elements = document.getElementsByClassName('choice-container');

  for (let item of elements) {
    let title = document.createElement('h3');
    title.textContent = 'Choose one';
    item.parentNode.insertBefore(title, item);
  }

  elements = document.getElementsByClassName('choice');
  for (let item of elements) {
    let button = document.createElement('button');
    button.classList.add('choice-button');
    wrap(item, button);
    
    const icon = document.createElement('span');
    icon.classList.add('material-symbols-outlined');
    icon.textContent = 'expand_more';
    button.append(icon);

    let content = button.nextElementSibling;
    content.style.display = 'none';
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      if (content.style.display === 'block') {
        content.style.display = 'none';
        button.childNodes[button.childElementCount-1].textContent = 'expand_more';
      } else {
        content.style.display = 'block';
        button.childNodes[button.childElementCount-1].textContent = 'expand_less';
      }
    })
  }
}

function addFootnotes () {
  let noteRefs = document.getElementsByTagName('sup');
  let noteContainer = document.getElementsByClassName('footnote')[0];
  let notes = noteContainer.getElementsByTagName('li');

  const noteTitle = document.createElement('h6');
  noteTitle.classList.add('tl-note-title');
  noteTitle.textContent = 'Notes';
  noteContainer.parentNode.insertBefore(noteTitle, noteContainer);

  for (let i = 0; i < noteRefs.length; i++) {
    console.log('notes', notes);
    
    let tooltip = document.createElement('span');
    tooltip.classList.add('tl-note');
    tooltip.textContent = notes[i].textContent;
    noteRefs[i].appendChild(tooltip);
    
    noteRefs[i].addEventListener('click', () => {
      notes[i].scrollIntoView();
    });

    let returnArrow = document.createElement('span');
    returnArrow.classList.add('note-arrow');
    returnArrow.innerHTML = ' &uarr; ';
    returnArrow.style.cursor = 'pointer';
    returnArrow.addEventListener('click', () => {
      noteRefs[i].scrollIntoView();
    })

    notes[i].appendChild(returnArrow);
  }
}

function testTumblr () {
  let elements = document.getElementsByTagName('h2');
  console.log('heiiihihih');
  for (let item of elements) {
    console.log('hhhhhh', item)
    if (item.textContent === 'Beginning') {
      console.log('yayyy');
      let newDiv = document.createElement('div');
      wrap(item, div);
    }
  }
  console.log('lol');
}

addPictures();
addMaterialIcons();
addSceneIcons();
createChoices();
// addFootnotes();
testTumblr();
