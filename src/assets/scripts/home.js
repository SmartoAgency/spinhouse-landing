import axios from "axios";
import splitToLinesAndFadeUp from "./modules/effects/splitLinesAndFadeUp";
import spinhouseDemoBlock from "./pages/home/spinhouseDemoBlock";
import spinhouseDemoBlockTablet from "./pages/home/spinhouseDemoBlockTablet";
import { useState } from "./modules/helpers/helpers";
import Typed from "typed.js";
import { quizFormHandler } from "./modules/form/formsHandler";


document.body.addEventListener('click',function tabletMenuHandler(evt){
    const target = evt.target.closest('[data-tablet-menu-open]');
    if(!target) return;

    target.classList.toggle('menu-open');
    if (target.classList.contains('menu-open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    document.querySelector('.header__links').classList.toggle('active');
});


spinhouseDemoBlock();

spinhouseDemoBlockTablet();

document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-down-arrow]');
    if(!target) return;
    
    document.querySelector('.spinhouse-demo-screen').scrollIntoView({behavior: 'smooth'});
});


// frontScreenAnimation();

function forThoseWhoLeadBlockParalax() {
    const container = document.querySelector('.home-for-who-block');
    const img = container.querySelector('.home-for-who-block__bg-figure img');

    gsap.timeline({
        scrollTrigger: {
            trigger: container,
            // end: '75% center',
            scrub: true,
        }
    })
    .fromTo(img, {
        y: -250,
        x: 0,
        scale: 1.1,
    },{
        y: 0,
        x: 120,
        scale: 1,
    })
    ;
}
function featuresBlockParalax() {
    const  container = document.querySelector('.home-features-block');
    const img = document.querySelector('.home-features-block__bg_figure img');

    gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true,
        }
    })
    .fromTo(img, {
        y: 0,
        x: 0,
        scale: 1.1,
    },{
        y: window.screen.height * 0.5,
        x: 120,
        scale: 1,
    });
}

function quizBlockParalax() {
    const container = document.querySelector('.quiz-screen');
    const img = container.querySelector('.quiz-screen__bg img');

    gsap.timeline({
        scrollTrigger: {
            trigger: container,
            scrub: true,
        }
    })
    .fromTo(img, {
        y: window.screen.height * -0.1,
        x: 0,
        scale: 1.1,
    },{
        y: 0,
        x: 120,
        scale: 1,
    });
}

featuresBlockParalax();

forThoseWhoLeadBlockParalax();

splitToLinesAndFadeUp('.home-for-who-block__title, .text-style-1920-h-1:not(.home-engage-block__text1):not(.home-engage-block__text2)', gsap);

quizBlockParalax();

function typedAnimation(block) {
    new Typed(block, {
        strings: ['...',block.textContent],
        typeSpeed: 15,
        onComplete: (self) => {
        }
    })
}
function progressBarUpdate(number, $line, $bar) {
    $bar.textContent = (number * 100).toFixed(2);
    gsap.to($line, {
        scaleX: number,
    });
}


async function quizBlock() {
    const form = document.querySelector('[data-quiz-form]');
    const quizItem = form.querySelector('[data-quiz-item]');
    const answerBlock = quizItem.querySelector('.quiz-item__answer-block-wrapper');
    const questionsBlock = quizItem.querySelector('.quiz-item__question-wrap');
    const quizProgressBar = quizItem.querySelector('[data-quiz-item-progress-bar]');

    const quizData = await fetchQuizData();
    const $quizItems = quizData.map((el, index) => $quizItem(el,index,quizData.length - 2)).join('');
    const $quizQuestions = quizData.map(({ dialog }, index) => $quizQuestion(dialog, index)).join('');

    questionsBlock.insertAdjacentHTML('afterbegin', $quizQuestions);
    // answerBlock.innerHTML = $quizItems;
    answerBlock.insertAdjacentHTML('afterbegin', $quizItems);

    form.addEventListener('reset', () => {
        form.querySelectorAll('.checked').forEach($input => {
            $input.classList.remove('checked');
        });
    })

    
    const [ currentIndex, setCurrentIndex, subscribeCurrentIndex ] = useState(0);
    
    subscribeCurrentIndex((index) => {
        const $quizItems = quizItem.querySelectorAll('.quiz-item__answer-item');
        const quizProgress = gsap.utils.mapRange(0, $quizItems.length - 1, 0, 1, index+2);

        quizItem.querySelectorAll('[data-index]').forEach(($item, i) => {
            if ($item.dataset.index == index) {
                $item.classList.add('active');
            } else {
                $item.classList.remove('active');
            }
        });

        typedAnimation(quizItem.querySelector('span.active'));
        
        progressBarUpdate(
            quizProgress,
            quizItem.querySelector('[data-quiz-item-progress-bar-fill]'), 
            quizItem.querySelector('[data-quiz-item-progress-bar-number]')
        );
        quizProgressBar.style.display = index >= quizData.length - 2 ? 'none' : '';


        const $currentQuestion = quizItem.querySelector(`.quiz-item__answer-item[data-index="${index}"]`);

        const isChecked = $currentQuestion.querySelector('input:checked');
        if (!isChecked) {
            if ($currentQuestion.querySelector('[data-quiz-block-next]')) {
                $currentQuestion.querySelector('[data-quiz-block-next]').disabled = true;
            }
        }
        
    });
    
    
    quizItem.addEventListener('change', function(evt) {
        if (!evt.target.matches('.quiz-item__custom-checkbox')) return;
        const name = evt.target.name;
        const $inputs = quizItem.querySelectorAll(`input[name="${name}"]`);
        $inputs.forEach($input => {
            $input.parentElement.classList.remove('checked');
        });

        
        evt.target.parentElement.classList.toggle('checked', evt.target.checked);
        const $currentQuestionButtonNext = evt.target.closest('[data-index]').querySelector('[data-quiz-block-next]');
        $currentQuestionButtonNext.removeAttribute('disabled');
        
    });
    
    quizItem.addEventListener('click', function(evt) {
        const target = evt.target.closest('[data-quiz-block-next]');
        if (!target) return;
        if (currentIndex() === quizData.length - 1) {
            console.log('quiz finished');
            return;
        }
        setCurrentIndex(currentIndex() + 1);
    }); 
    quizItem.addEventListener('click', function(evt) {
        const target = evt.target.closest('[data-quiz-block-prev]');
        if (!target) return;
        setCurrentIndex(currentIndex() - 1);
    }); 
    
    
    setCurrentIndex(0);
    quizFormHandler(() => {
        setCurrentIndex(quizData.length - 1);
        setTimeout(() => {
            setCurrentIndex(0);
        }, 10000);
    });
}


async function fetchQuizData() {
    return (await axios.get('/static/quiz-questions.json')).data;
}

function $quizQuestion(question, index) {
    return `
        <span data-index="${index}">${question}</span>
    `;
}

function $quizItem(item, index, total = 0) {

    const { question, answers = [], name, inputs = [], hideNext } = item;

    const $prevButton = index === 0 ? '' : `
        <button class="quiz-item__button quiz-item__button--prev" type="button" data-quiz-block-prev>
            <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.55001 12.9497L3.60026 8M3.60026 8L8.55001 3.05025M3.60026 8H12.5098" stroke="#212125" stroke-width="2"/>
            </svg>
            <span>BACK</span>
        </button>
    `;

    const $submitButton = item.submit ? `
        <button class="quiz-item__button" type="submit" data-btn-submit="data-btn-submit">
            <span data-btn-submit-text="data-btn-submit-text">${item.submit}</span>
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.5 19L18.5 8M18.5 8L7.5 8M18.5 8L8.6 17.9" stroke="#F7F9FB" stroke-width="3.5" />
            </svg>
        </button>
    ` : '';

    const $nextButton = hideNext ? '' : `
        <button class="quiz-item__button heartbeat" type="button" data-quiz-block-next>
            <span>NEXT</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.94975 12.9478L12.8995 7.99805M12.8995 7.99805L7.94975 3.0483M12.8995 7.99805H3.98995" stroke="#F7F9FB" stroke-width="2"></path>
            </svg>
        </button>
    `;

    const $counter = item.hideCounter ? '' : `
        <div class="quiz-item__counter">
            <span>${index + 1}</span> / ${total}
        </div>
    `;

    const $inputsList = inputs.map((input, i) => `
        <div class="contact-screen-form__group" data-lenis-prevent  data-status="field--inactive" data-field-input="data-field-input" data-field-name="data-field-${input.name}">
            <div class="contact-screen-form__group-message" data-input-message="data-input-message"></div>
            <div class="contact-screen-form__group-title">${input.placeholder}:</div>
            <input class="contact-screen-form__input" type="${input.type}" placeholder="${input.placeholder}" name="${input.name}" />
        </div>
    `).join('');


    const $titles = item.titles ? item.titles.map((title, i) => `
        <div class="">
            ${title}
        </div>
    `).join('') : '';

    return `
        <div class="quiz-item__answer-item" data-index="${index}">
            <div class="quiz-item__answer-item-title">
                ${question}
            </div>
            <div class="quiz-item__answer-item-checkbox-wrapper">
            ${answers.map((answer, i) => `
                <label for="${name+i}" class="quiz-item__answer-item-checkbox">
                    <input  id="${name+i}" class="quiz-item__custom-checkbox" type="radio" name="${name}" value="${answer}">
                    </input>
                    <span>${answer}</span>
                </label>
                `).join('')}
            </div>
            <div class="quiz-item__answer-inputs-wrapper">
                ${$inputsList}
                ${$titles}
            </div>
            <div class="quiz-item__answer-item-button-wrapper">
                ${$prevButton}
                ${$nextButton}
                ${$submitButton}
                ${$counter} 
            </div>
            ${item.svg ? `
                <div class="quiz-item__answer-item-svg">
                    ${item.svg}
                </div>
            ` : ''}
        </div>
    `;
}

quizBlock();



document.body.addEventListener('click',function(evt){
    const target = evt.target.closest('[data-success-layer-close]');
    if(!target) return;

    document.querySelector('[data-success-layer]').classList.remove('active');


});


document.querySelectorAll('.home-features-block__bottom-item-img').forEach((el, index) => {
    gsap.from(el.querySelector('img:last-child'), {
        opacity: 0,
        duration: 10,
        delay: index * 0.2,
        start: '100% bottom',
        scrollTrigger: {
            trigger: el,
            once: true
        },
    });
});

//home-features-block__item

function applyScrollTriggerAnimation(selectors) {
    document.querySelectorAll(selectors).forEach((el) => {
        gsap.timeline({
            scrollTrigger: {
                trigger: el,
                start: '50% bottom',
                // end: 'bottom center',
                once: true,
            },
        })
            .fromTo(el.children,
                { y: 25, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, clearProps: 'all', duration: 1.25, ease: 'power4.out', stagger: 0.1 },
            );
    });
}

applyScrollTriggerAnimation('.contact-screen-form, .home-features-block__item, .home-for-who-block__item, .transform-vision-into-reality-block__description');