var startX, startY, screenX, screenY, selectionDiv;
var links = [];

function start(e) {
  startX = e.pageX;
  startY = e.pageY;
  screenX = e.clientX;
  screenY = e.clientY;
  selectionDiv = document.createElement('div');
  selectionDiv.className = 'X-Selection';
  selectionDiv.style.left = startX + 'px';
  selectionDiv.style.top = startY + 'px';
  document.body.appendChild(selectionDiv);
  
  document.body.classList.add('X-Pointer');
  
  document.body.addEventListener('mousemove', update);
  document.body.addEventListener('mouseup', finish);
  
  e.preventDefault();
}

function update(e) {
  const { pageX, pageY } = e;
  const w = Math.abs(pageX - startX);
  const h = Math.abs(pageY - startY);
  const topX = Math.min(startX, pageX);
  const topY = Math.min(startY, pageY);
  const bottomX = Math.max(startX, pageX);
  const bottomY = Math.max(startX, pageX);
  const screenLeft = Math.min(screenX, e.clientX);
  const screenRigth = Math.max(screenX, e.clientX);
  const screenTop = Math.min(screenY, e.clientY);
  const screenBottom = Math.max(screenY, e.clientY);
  
  selectionDiv.style.left = topX + 'px';
  selectionDiv.style.top = topY + 'px';
  selectionDiv.style.width = w + 'px';
  selectionDiv.style.height = h + 'px';
  e.preventDefault();
  
  links = [];
  for(let i = 0; i < document.links.length; i++) {
    const link = document.links[i];
    const { left, top, right, bottom } = link.getBoundingClientRect();
    if (screenLeft <= right && screenRigth >= left && screenTop <= bottom && screenBottom >= top) {
      link.classList.add('X-SelectedLink');
      links.push(link.href);
    } else if (link.classList.contains('X-SelectedLink')) {
      link.classList.remove('X-SelectedLink');
    }
  };
}

function finish(e) {
  links.forEach((link) => window.open(link));
  links = [];
  
  document.body.classList.remove('X-Pointer');
  
  for(let i = 0; i < document.links.length; i++) {
    const link = document.links[i];
    if (link.classList.contains('X-SelectedLink')) {
      link.classList.remove('X-SelectedLink');
    }
  }
  
  if (selectionDiv) {
    document.body.removeChild(selectionDiv);
    selectionDiv = null;
  }
  
  document.body.removeEventListener('mousemove', update);
  document.body.removeEventListener('mousedown', start);
}

document.body.addEventListener('mousedown', start);
