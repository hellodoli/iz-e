var data = [{
        id: 1,
        sentense: 'Tom maintained his innocence.',
        meaning: 'Tom duy trì sự hồn nhiên của mình.',
        mark: 'maintained',
        audio: 'http://study.aitech.ac.jp/tat/1531918.mp3'
    },
    {
        id: 2,
        sentense: 'My cousin is good at doing magic tricks.',
        meaning: 'Anh em họ của tôi giỏi làm trò ảo thuật.',
        mark: 'magic',
        audio: 'http://study.aitech.ac.jp/tat/250215.mp3'
    },
    {
        id: 3,
        sentense: 'Look at the price tag.',
        meaning: 'Nhìn vào thẻ giá.',
        mark: 'tag',
        audio: 'http://study.aitech.ac.jp/tat/3147960.mp3'
    },
    {
        id: 4,
        sentense: 'Being aware of what and how much we eat is essential to good health.',
        meaning: 'Nhận thức được chúng ta ăn những cái gì và bao nhiêu là điều cần thiết để có sức khỏe tốt.',
        mark: 'essential',
        audio: 'http://study.aitech.ac.jp/tat/953147.mp3'
    },
    {
        id: 5,
        sentense: 'I heard laughter in the next room.',
        meaning: 'Tôi nghe thấy tiếng cười ở phòng bên cạnh.',
        mark: 'laughter',
        audio: 'http://study.aitech.ac.jp/tat/2360743.mp3'
    },
    {
        id: 6,
        sentense: 'The first baseman tagged the runner out.',
        meaning: 'Niiko niiko nii',
        mark: 'tagged',
        audio: 'http://study.aitech.ac.jp/tat/27181.mp3'
    }
];

function randomSentence(arr) {
    const i = Math.floor(Math.random() * arr.length);
    return arr[i];
}

function makeBlankSymbol(input) {
    let symbol = '_';
    return symbol.repeat(input.length);
}

function checkAnswer(input, ans) {
    input = input.trim();
    if (input !== '') {
        if (input.toLowerCase() === ans) {
            return true;
        } else {
            return false;
        }
    }
}

function renderHTML(html, element, type = 'beforeend') {
    element.insertAdjacentHTML(type, html);
}

function markupHTMLAudio(s) {
    return `<audio id="audioEnbox"><source src="${s.audio}" type="audio/mpeg">Your browser does not support the audio tag.</audio>`;
}

function markupHTMLCongrat(type = 2) {
    if (type == 1) {
        return `<div class="congrat-msg">Congratulations!</div>`;
    } else if (type == 2) {
        return `<div class="not-correct-msg">Not correct yet :( Please try again.</div>`;
    } else if (type == 3) {
        return `<div class="not-correct-msg">Don\'t worry, You can next Question</div>`;
    }
}

function markupHTMLNextBtn() {
    return `<div class="en-box__ex-next"><button id="btnEnboxNext" class="btn btn-success" type="button">Next Level</button></div>`;
}

function markupHTMLMeaning(s) {
    return `<div class="en-box__ex-quest-mean">${s.meaning}</div>`
}

function markupHTMLLife(life) {
    let html = '';
    for (let i = 0; i < life; i++) {
        html += '<img src="https://giasutoeic.com/static/LearningPlan/images/new/icon_fire.png" />';
    }
    return html;
}

function markupHTMLSubmitBtn() {
    return `<div class="form-group text-center"><div class="en-box__ex-form-btn"><button class="btn btn-primary" id="btnEnboxAns" type="button">Submit Answer</button></div></div>`;
}

function effectBtnPlaying() {
    var audioEnbox = document.getElementById('audioEnbox');
    audioEnbox.onplaying = function () {
        btnEnboxAudio.classList.add('is-playing');
    }
    audioEnbox.onended = function () {
        btnEnboxAudio.classList.remove('is-playing');
    }
}

function showHightLightAns(s, enBoxQuestText) {
    var sentense = s.sentense.replace(s.mark, `<span class="text-success mark-text">${s.mark}</span>`);
    enBoxQuestText.innerHTML = sentense;
    renderHTML(markupHTMLMeaning(s), enBoxQuestText, 'afterend');
}

function renderData(s, blankSymbol, inputEnboxAns, enBoxQuestText, btnEnboxAudio) {
    // reset input value
    inputEnboxAns.value = "";
    // render question
    enBoxQuestText.innerHTML = s.sentense.replace(s.mark, blankSymbol);

    if (btnEnboxAudio.nextElementSibling.id === 'audioEnbox') {
        btnEnboxAudio.nextElementSibling.remove();
    }

    // render audio
    renderHTML(markupHTMLAudio(s), btnEnboxAudio, 'afterend');
    // audio effect when playing
    effectBtnPlaying();
}

var life = data.length + 1;
var wrongSubmit = 3;
var numQuestion = 1;
var s = randomSentence(data);
var blankSymbol = makeBlankSymbol(s.mark);

window.onload = function () {
    // DOM Element
    var inputEnboxAns = document.getElementById('inputEnboxAns');
    var btnEnboxAudio = document.getElementById('btnEnboxAudio');
    var enBoxHeaderLevel = document.querySelector('.en-box__header-level-show');
    var enBoxQuestText = document.querySelector('.en-box__ex-quest-text');
    var enBoxFormAlert = document.querySelector('.en-box__ex-form-alert');
    var enBoxLife = document.querySelector('.en-box__header-life');
    var enBoxHeader = document.querySelector('.en-box__header-check');
    var enBoxBottom = document.querySelector('.en-box__ex-bottom');
    var enBoxForm = document.querySelector('.en-box__ex-form');

    // default render life
    enBoxLife.innerHTML = markupHTMLLife(life);

    // default render
    renderData(s, blankSymbol, inputEnboxAns, enBoxQuestText, btnEnboxAudio);

    // play audio
    btnEnboxAudio.addEventListener('click', function () {
        var audioEnbox = document.getElementById('audioEnbox');
        console.log(audioEnbox.children[0].src);
        audioEnbox.play();
    });

    // submit answer
    enBoxForm.addEventListener('click', function (e) {
        if (e.target.id === 'btnEnboxAns') {
            if (inputEnboxAns.value.trim() === '') return;
            var ans = inputEnboxAns.value;
            var isTrueAns = checkAnswer(ans, s.mark);
            if (isTrueAns) {
                if (inputEnboxAns.classList.contains('is-invalid'))
                    inputEnboxAns.classList.remove('is-invalid');
                inputEnboxAns.classList.add('is-valid');

                // hide user's answer
                enBoxFormAlert.style.display = 'none';

                // remove submit button
                e.target.parentElement.parentElement.style.display = 'none';

                //render Congratulations!
                enBoxHeader.innerHTML = '';
                renderHTML(markupHTMLCongrat(1), enBoxHeader);

                // show highlight sentence
                showHightLightAns(s, enBoxQuestText);

                // render next level button
                if (enBoxBottom.children[1] === undefined)
                    renderHTML(markupHTMLNextBtn(), enBoxBottom);

            } else {
                if (inputEnboxAns.classList.contains('is-valid'))
                    inputEnboxAns.classList.remove('is-valid');
                inputEnboxAns.classList.add('is-invalid');

                // show user's answer
                enBoxFormAlert.children[1].innerHTML = inputEnboxAns.value;
                enBoxFormAlert.style.display = 'flex';

                // subtract when user answer wrong
                if (wrongSubmit === 0) {
                    /*if(data.length === 1) {
                      alert('Bạn đã hoàn thành trò chơi');
                      return;
                    }*/
                    alert('Bạn đã trả lời sai 3 lần.\n Bạn bị mất 1 mạng T_T');
                    life -= 1;
                    // render life
                    enBoxLife.innerHTML = markupHTMLLife(life);
                    // show highlight sentence
                    showHightLightAns(s, enBoxQuestText);
                    // remove submit button
                    e.target.parentElement.parentElement.remove();
                    // render Next Button
                    renderHTML(markupHTMLNextBtn(), enBoxBottom);
                    // show -> user can next
                    enBoxHeader.innerHTML = '';
                    renderHTML(markupHTMLCongrat(3), enBoxHeader);
                } else {
                    wrongSubmit -= 1;
                    // render Not Correct!
                    enBoxHeader.innerHTML = '';
                    renderHTML(markupHTMLCongrat(2), enBoxHeader);
                }
            }
        }
    });

    // next question
    enBoxBottom.addEventListener('click', function (e) {
        if (e.target.id === 'btnEnboxNext') {
            if (data.length > 0) {
                // remove old question in data
                data = data.filter(item => {
                    if (item.id !== s.id) return item;
                });

                // prepare new data
                numQuestion += 1;
                s = randomSentence(data);
                blankSymbol = makeBlankSymbol(s.mark);

                if (wrongSubmit === 0) { // user answer wrong 3 time
                    wrongSubmit = 3;
                    if (inputEnboxAns.classList.contains('is-invalid'))
                        inputEnboxAns.classList.remove('is-invalid');
                    // render Submit Btn
                    renderHTML(markupHTMLSubmitBtn(), enBoxForm);
                    // display none Form Alert
                    enBoxFormAlert.style.display = 'none';
                } else { // user answer right
                    if (inputEnboxAns.classList.contains('is-valid'))
                        inputEnboxAns.classList.remove('is-valid');
                    // display Submit Btn
                    var btnEnboxAns = document.getElementById('btnEnboxAns');
                    btnEnboxAns.parentElement.parentElement.style.display = "block";
                }

                // clear alert
                enBoxHeader.innerHTML = '';
                // clear previous meaning
                enBoxQuestText.nextElementSibling.remove();
                // remove button next question
                e.target.parentElement.remove();
                //render question
                enBoxHeaderLevel.innerHTML = `Question ${numQuestion}`;

                renderData(s, blankSymbol, inputEnboxAns, enBoxQuestText, btnEnboxAudio);
            }
        }
    });
}