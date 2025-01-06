// Переменная для количества блоков "Группа"
const numberOfGroups = 2; // Измените это значение для изменения количества блоков

// Целочисленная переменная для количества мини-блоков ответов в блоке "Ответы"
const numberOfAnswers = 3; // Измените это значение для изменения количества мини-блоков ответов

// Булевая переменная для определения стиля блока "Группа"
let useDefaultStyle = false; // Установите false, чтобы применить альтернативный стиль

const groupContainer = document.getElementById('groupContainer');
const answersContainer = document.querySelector('.answers');

// Функция для обновления стилей контейнера
function updateGroupStyles() {
    if (useDefaultStyle) {
        groupContainer.classList.remove('alternate'); // Удаляем альтернативный стиль
        groupContainer.classList.add('default'); // Добавляем основной стиль
    } else {
        groupContainer.classList.remove('default'); // Удаляем основной стиль
        groupContainer.classList.add('alternate'); // Добавляем альтернативный стиль
    }
}

// Создание блоков "Группа"
for (let i = 0; i < numberOfGroups; i++) {
    const groupBlock = document.createElement('div');
    
    // Применяем стиль в зависимости от переменной
    groupBlock.className = useDefaultStyle ? 'content' : 'alternate-content'; 
   
    groupBlock.id = `group${i + 1}`; // Уникальный идентификатор для каждого блока
    groupBlock.innerHTML = `
        <div class="header">Группа ${i + 1}</div>
        <div class="group-answers ${useDefaultStyle ? 'vertical' : 'horizontal'}"></div> <!-- Контейнер для мини-блоков ответов -->
    `;
    
    groupContainer.appendChild(groupBlock); // Добавляем блок в контейнер
}

// Создание мини-блоков ответов в блоке "Ответы"
for (let j = 0; j < numberOfAnswers; j++) {
    const answerBlock = document.createElement('div');
    
    answerBlock.className = 'answer';
    answerBlock.id = `answer${j + 1}`; // Уникальный идентификатор для каждого ответа
    answerBlock.draggable = true;
    
    answerBlock.innerHTML = `Ответ ${j + 1}`;
    
    answersContainer.appendChild(answerBlock); // Добавляем мини-блок в контейнер ответов
}

// Функции для Drag and Drop
const answers = document.querySelectorAll('.answer');

answers.forEach(answer => {
    answer.addEventListener('dragstart', dragStart);
});

answersContainer.addEventListener('dragover', dragOver);
answersContainer.addEventListener('drop', drop);

groupContainer.addEventListener('dragover', dragOver);
groupContainer.addEventListener('drop', dropToGroup);

// Добавляем обработчики событий для возврата мини-блоков в блок "Ответы"
answersContainer.addEventListener('dragover', dragOver);
answersContainer.addEventListener('drop', dropToAnswers);

function dragStart(e) {
    e.dataTransfer.setData('text/plain', e.target.id);
    e.dataTransfer.effectAllowed = 'move';
}

function dragOver(e) {
    e.preventDefault(); // Позволяет элементу быть перетаскиваемым
}

function drop(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedId);
    
    // Вставляем перетаскиваемый элемент перед текущим элементом
    if (e.target.classList.contains('answer') && draggedElement !== e.target) {
        answersContainer.insertBefore(draggedElement, e.target.nextSibling);
    }
}

function dropToGroup(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedId);

    // Добавляем перетаскиваемый элемент в блок "Группа"
    if (e.target.classList.contains('content') || e.target.classList.contains('alternate-content')) {
        const answersContainer = e.target.querySelector('.group-answers');
        answersContainer.appendChild(draggedElement); // Перемещаем элемент в группу
    }
}

// Новая функция для возврата мини-блоков в блок "Ответы"
function dropToAnswers(e) {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('text/plain');
    const draggedElement = document.getElementById(draggedId);

    // Добавляем перетаскиваемый элемент обратно в блок "Ответы"
    if (e.target === answersContainer) {
        answersContainer.appendChild(draggedElement); // Перемещаем элемент обратно
    }
}

// Инициализация стилей при загрузке страницы
updateGroupStyles();
