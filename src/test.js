const IFST = {
    name: 'ИФСТ',
    score: 0,
    edForm: 'nevermind',
    commerce: 'nevermind',
    mathEx: true,
    creativity: true,
    langs: false,
    tests: false,
    steps: false,
    media: false,
    gameDev: true,
    graphEditor: false,
    webDev: true,
    combine: false,
}

const IVCHT = {
    name: 'ИВЧТ',
    score: 0,
    edForm: 'nevermind',
    commerce: 'nevermind',
    mathEx: true,
    creativity: false,
    langs: true,
    tests: false,
    steps: false,
    media: false,
    gameDev: true,
    graphEditor: false,
    webDev: false,
    combine: false,
}

const PINF = {
    name: 'ПИНФ',
    score: 0,
    edForm: 'full-time',
    commerce: 'nevermind',
    mathEx: true,
    creativity: false,
    langs: false,
    tests: true,
    steps: false,
    media: false,
    gameDev: false,
    graphEditor: false,
    webDev: true,
    combine: false,
}

const PINJ = {
    name: 'ПИНЖ',
    score: 0,
    edForm: 'full-time',
    commerce: 'nevermind',
    mathEx: true,
    creativity: false,
    langs: false,
    tests: true,
    steps: true,
    media: false,
    gameDev: false,
    graphEditor: false,
    webDev: false,
    combine: false,
}

const RKLM = {
    name: 'РКЛМ',
    score: 0,
    edForm: 'nevermind',
    commerce: 'only',
    mathEx: false,
    creativity: true,
    langs: false,
    tests: false,
    steps: false,
    media: true,
    gameDev: false,
    graphEditor: false,
    webDev: false,
    combine: false,
}

const TLVD = {
    name: 'ТЛВД',
    score: 0,
    edForm: 'full-time',
    commerce: 'only',
    mathEx: false,
    creativity: true,
    langs: false,
    tests: false,
    steps: false,
    media: true,
    gameDev: false,
    graphEditor: true,
    webDev: false,
    combine: false,
}

const DZN = {
    name: 'ДЗН',
    score: 0,
    edForm: 'part-full',
    commerce: 'nevermind',
    mathEx: false,
    creativity: true,
    langs: false,
    tests: false,
    steps: false,
    media: false,
    gameDev: true,
    graphEditor: true,
    webDev: false,
    combine: true,
}

const inpit = [IFST, IVCHT, PINF, PINJ, RKLM, TLVD, DZN];

const questsCommon = [
    {
        questTitle: 'Какая форма обучения в приоритете?',
        questAnswer: ['Очная', 'Заочная', 'Очно-заочная'],
        questType: 'edForm'
    },
    {
        questTitle: 'Есть ли возможность учиться на коммерции?',
        questAnswer: ['Да', 'Нет'],
        questType: 'commerce'

    },
    {
        questTitle: 'Серди сдаваемых на ЕГЭ предметов есть профильная математика?',
        questAnswer: ['Да', 'Нет'],
        questType: 'mathEx',
        distinguish: true
    },
    {
        questTitle: 'Хотели бы вы применять креативность в специальности',
        questAnswer: ['Да', 'Нет'],
        questType: 'creativity',
        math: true
    },
    {
        questTitle: 'В приоритете стоит изучение как можно большего количества языков программирования?',
        questAnswer: ['Да', 'Нет'],
        questType: 'langs',
        math: true
    },
    {
        questTitle: 'При обучении, вы бы хотели уделить особое внимание тестированию программного обеспечения?',
        questAnswer: ['Да', 'Нет'],
        questType: 'tests',
        math: true
    },
    {
        questTitle: 'Вы бы хотели учавствовать во всех этапах создания программного продукта?',
        questAnswer: ['Да', 'Нет'],
        questType: 'steps',
        math: true
    },
    {
        questTitle: 'Хотели бы вы работать в медийной сфере?',
        questAnswer: ['Да', 'Нет'],
        questType: 'media',
        math: false
    },
    {
        questTitle: 'Вы бы хотели связать деятельность с разработкой компьютерных игр? (концепт-арты)',
        questAnswer: ['Да', 'Нет'],
        questType: 'gameDev',
        math: false
    },
    {
        questTitle: 'Вам нравится работать с графическими редакторами',
        questAnswer: ['Да', 'Нет'],
        questType: 'graphEditor',
        math: false
    },
    {
        questTitle: 'Хотели бы вы учавствовать в разработке сайтов? (макетирование)',
        questAnswer: ['Да', 'Нет'],
        questType: 'webDev',
        math: false
    },
    {
        questTitle: 'Вам важно совмещать в работе творчество, логику и инженерные навыки?',
        questAnswer: ['Да', 'Нет'],
        questType: 'combine',
        math: false
    },
]

const beginAgain = () => {
    if (window.confirm("Вы точно хотите сбросить результат?")) {
        localStorage.setItem('counter', 0);
        localStorage.removeItem('mathFlag');
        window.location.reload();
        document.querySelector('#change__button').classList.remove('disappear');
    }
}

let counter = localStorage.getItem('counter') || 0;

let mathFlag = localStorage.getItem('mathFlag') || false;

const ans = [];

const changeQuest = () => {

    const questTitle = document.querySelector('#quest__title');
    const questInput = document.querySelector('#quest__input');

    function result() {
        questTitle.textContent = 'Рейтинг подходящих специальностей (от наиболее подходящих к наименее):';
        questInput.textContent = getResult(localStorage.getItem('answers'));
        document.querySelector('#change__button').classList.add('disappear');
    }

    if (counter == questsCommon.length) {
        result();
        return;
    }

    document.getElementsByName(questsCommon[counter].questType)
        .forEach(e => {
            if (e.checked) {
                counter++;
                ans.push(e.value);
                localStorage.setItem('answers', ans.toString());
                localStorage.setItem('counter', counter);
            }
            if (counter != 0 && questsCommon[counter - 1].distinguish && e.checked && e.value === 'Да') {
                mathFlag = true;
                localStorage.setItem('mathFlag', mathFlag);
            }
        })

    while (mathFlag == true && counter < questsCommon.length && questsCommon[counter].math == false) {
        counter++;
        localStorage.setItem('counter', counter);
    }

    while (mathFlag == false && counter < questsCommon.length && questsCommon[counter].math == true) {
        counter++;
        localStorage.setItem('counter', counter);
    }

    if (counter == questsCommon.length) {
        result();
        return;
    }

    questTitle.textContent = questsCommon[counter].questTitle;
    questInput.innerHTML = "";

    questsCommon[counter].questAnswer.forEach(e => {
        let input = document.createElement('input');

        input.setAttribute('name', questsCommon[counter].questType);
        input.setAttribute('type', 'radio');
        input.setAttribute('value', e);
        input.required = true;

        questInput.appendChild(input);

        let label = document.createElement('label');
        label.innerHTML = e;

        questInput.appendChild(label);
    })
}

function getResult(ans) {

    const arr = ans.split(',');

    switch (arr[0]) {
        case 'Очная':
            inpit.forEach(e => {
                if (e.edForm == 'full-time' || 'nevermind') e.score += 10;
            })
            break;
        case 'Заочная':
            inpit.forEach(e => {
                if (e.edForm == 'nevermind') e.score += 10;
            })
            break;
        default:
            inpit.forEach(e => {
                if (e.edForm == 'part-full') e.score += 10;
            })
            break;
    }

    if (arr[1] == 'Нет') {
        inpit.forEach(e => {
            if (e.commerce == 'nevermind') e.score += 10;
        })
    }

    if (localStorage.getItem('mathFlag')) {
        inpit.forEach(e => {
            if (arr[3] == 'Да' && e.creativity) e.score += 10;
            if (arr[4] == 'Да' && e.langs) e.score += 10;
            if (arr[5] == 'Да' && e.tests) e.score += 10;
            if (arr[5] == 'Да' && e.steps) e.score += 10;
        })
    }
    else {
        inpit.forEach(e => {
            if (arr[3] == 'Да' && e.media) e.score += 10;
            if (arr[4] == 'Да' && e.gameDev) e.score += 10;
            if (arr[5] == 'Да' && e.graphEditor) e.score += 10;
            if (arr[6] == 'Да' && e.webDev) e.score += 10;
            if (arr[7] == 'Да' && e.combine) e.score += 10;
        })
    }

    const app = inpit.sort((a, b) => {
        return b.score - a.score;
    });

    let str = '';

    app.forEach(e => {
        str += e.name + '\n'
    })

    return str;
}
