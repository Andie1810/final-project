const wardrobe = {
    top: {
    all:      [1,2,3,4,5,6,7,8,9,10,11,12],
    casual:   [1,2,4],
    work:     [10,11,12],
    sporty:   [3,5,6],
    goingout: [7,8,9],
  },
  bottom: {
    all:      [1,2,3,4,5,6,7,8,9,10,11,12],
    casual:   [4,5,6],
    work:     [7,8,9],
    sporty:   [10,11,12],
    goingout: [1,2,3],
  },
  outer: {
    all:      [null,1,2,3,4,5,6,7,8],
    casual:   [null,3,4],
    work:     [null,7,8],
    sporty:   [null,5,6],
    goingout: [null,1,2],
  },
  shoes: {
    all:      [1,2,3,4,5,6,7,8],
    casual:   [1,2,3],
    work:     [5,6],
    sporty:   [7,8],
    goingout: [4,5,6],
  },
  bag: {
    all:      [1,2,3,4,5,6,7,8],
    casual:   [3,6],
    work:     [1,2],
    sporty:   [7,8],
    goingout: [4,5],
  },
};

let currentVibe = 'all';
let currentOutfit = null;
let isSaved = false;

function setVibe(vibe) {
  currentVibe = vibe;
  document.querySelectorAll('.vibe-btn').forEach(btn => {
    btn.classList.remove('active-vibe');
  });
  document.getElementById('vibe-' + vibe).classList.add('active-vibe');
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setCard(cardId, category, number) {
  const card = document.getElementById(cardId);
  if (number === null) {
    card.innerHTML = `<span class="font-serif text-base text-center" style="color: #7a1f3d">no<br>outerwear</span>`;
  } else {
    card.innerHTML = `<img src="images/${category}${number}.png"
      alt="${category} ${number}"
      class="w-full h-full object-contain opacity-0 transition-opacity duration-300" 
      onload="this.classList.add('opacity-100')" />`;
  }
}

function generateOutfit() {
  const v = currentVibe;
  const top    = pick(wardrobe.top[v]);
  const bottom = pick(wardrobe.bottom[v]);
  const outer  = pick(wardrobe.outer[v]);
  const shoes  = pick(wardrobe.shoes[v]);
  const bag    = pick(wardrobe.bag[v]);

  currentOutfit = { top, bottom, outer, shoes, bag, vibe: v };
  isSaved = false;

  setCard('card-top',    'top',       top);
  setCard('card-bottom', 'bottoms',    bottom);
  setCard('card-outer',  'outer', outer);
  setCard('card-shoes',  'shoes',     shoes);
  setCard('card-bag',    'bag',       bag);

  document.getElementById('generate-btn').textContent = 'Try Again';
  document.getElementById('save-btn').classList.remove('hidden');
  document.getElementById('save-btn').querySelector('img').src = 'heart.svg';
}

function saveOutfit() {
  if (!currentOutfit || isSaved) return;
  const saved = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
  saved.push({ ...currentOutfit, id: Date.now() });
  localStorage.setItem('savedOutfits', JSON.stringify(saved));
  document.getElementById('save-btn').querySelector('img').src = 'filled-heart.svg';
  isSaved = true;
}

window.addEventListener('DOMContentLoaded', () => {
  setVibe('all');
});