function addClickEventToFlashcards() {
    document.querySelectorAll('.flashcard').forEach(flashcard => {
        flashcard.addEventListener('click', function() {
            this.classList.toggle('flipped');
        });
    });
}

let grade;

const page = document.title;

if (page == 'First grade kanjis') {
    grade = 'grade-1';
} else if (page == 'Second grade kanjis') {
    grade = 'grade-2';
} else if (page == 'Third grade kanjis') {
    grade = 'grade-3';
} else if (page == 'Fourth grade kanjis') {
    grade = 'grade-4';
} else if (page == 'Fifth grade kanjis') {
    grade = 'grade-5';
} else if (page == 'Sixth grade kanjis') {
    grade = 'grade-6';
}

const url1 = `https://kanjiapi.dev/v1/kanji/${grade}`;

async function criarFlashcards(kanjis) {
    const container = document.querySelector('.flashcard-container');
    for (const kanji of kanjis) {
        const flashcard = document.createElement('div');
        flashcard.classList.add('flashcard');

        const front = document.createElement('div');
        front.classList.add('front');
        front.innerHTML = `<p>${kanji}</p>`
        
        const url2 = `https://kanjiapi.dev/v1/kanji/${kanji}`;

        const back = document.createElement('div');
        back.classList.add('back');

        const response = await fetch(url2);
        const data = await response.json();
        const onyomi = data.on_readings;
        const kunyomi = data.kun_readings;
        const meaning = data.meanings;

        back.innerHTML = `<p><strong>Onyomi: </strong>${onyomi}</p>
                          <p><strong>Kunyomi: </strong>${kunyomi}</p>
                          <p><strong>Meaning: </strong>${meaning}</p>`;

        flashcard.appendChild(front);
        flashcard.appendChild(back);

        container.appendChild(flashcard);
    }
    addClickEventToFlashcards();    
}

fetch(url1).then(response => response.json()).then(data => {
    criarFlashcards(data);
}).catch(error => console.error('Erro ao carregar'));
