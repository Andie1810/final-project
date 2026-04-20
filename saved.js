function renderOutfits() {
    const saved = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
    const grid = document.getElementById('outfits-grid');
    const empty = document.getElementById('empty-state');

    if (saved.length === 0) {
        empty.classList.remove('hidden');
        empty.classList.add('flex');
        return;
    }
    
    saved.forEach(outfit => {
        const items = [
            { key: 'top',       number: outfit.top },
            { key: 'bottoms',    number: outfit.bottom },
            { key: 'outer', number: outfit.outer },
            { key: 'shoes',     number: outfit.shoes },
            { key: 'bag',       number: outfit.bag },
        ];

        const card = document.createElement('div');
        card.className = 'bg-smoke rounded-2xl p-4 grid grid-cols-6 gap-2';

        const spans = ['col-span-3', 'col-span-3', 'col-span-2', 'col-span-2', 'col-span-2'];
        const heights = ['h-36', 'h-36', 'aspect-square', 'aspect-square', 'aspect-square'];

        items.forEach((item, index) => {
            const cell = document.createElement('div');
            cell.className = `bg-smoke rounded-xl flex items-center justify-center ${spans[index]} ${heights[index]}`;

            if (item.number !== null) {
                const img = document.createElement('img');
                img.src = `images/${item.key}${item.number}.png`;
                img.alt = `${item.key} ${item.number}`;
                img.className = 'w-full h-full object-contain';
                cell.appendChild(img);
            }

            card.appendChild(cell);
        });

            grid.appendChild(card);
        });
    }

    document.addEventListener('DOMContentLoaded', renderOutfits);