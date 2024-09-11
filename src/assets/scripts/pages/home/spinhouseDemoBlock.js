import { driver } from "driver.js";

const infoBoxes = {
    'image': (src) => `
        <div class="infobox infobox--image">
            <div class="infobox__fixed-ratio-block infobox__image-wrapper">
                <img src="${src}" alt="image">
            </div>
        </div>
    `,
    'image_with_text': (title, src) => `
        <div class="infobox infobox--video">
            <div class="infobox__icon">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23.5C5.92487 23.5 1 18.5751 1 12.5C1 6.42487 5.92487 1.5 12 1.5C18.0751 1.5 23 6.42487 23 12.5C23 18.5751 18.0751 23.5 12 23.5ZM-5.24537e-07 12.5C-2.34843e-07 5.87258 5.37258 0.5 12 0.500001C18.6274 0.500001 24 5.87258 24 12.5C24 19.1274 18.6274 24.5 12 24.5C5.37258 24.5 -8.1423e-07 19.1274 -5.24537e-07 12.5ZM10.6 7.7C9.94076 7.20557 9 7.67595 9 8.5L9 16.5C9 17.324 9.94076 17.7944 10.6 17.3L15.9333 13.3C16.4667 12.9 16.4667 12.1 15.9333 11.7L10.6 7.7Z" fill="#FAFBFE"/>
                </svg>
            </div>
            <div class="infobox__video infobox__fixed-ratio-block">
                <img  src="${src}"/>
            </div>
            <div class="infobox__title">
                ${title}
            </div>
            <button class="infobox__button">
                Explore
            </button>
        </div>
    `,
    'video': (title, src) => `
        <div class="infobox infobox--video">
            <div class="infobox__icon">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12 23.5C5.92487 23.5 1 18.5751 1 12.5C1 6.42487 5.92487 1.5 12 1.5C18.0751 1.5 23 6.42487 23 12.5C23 18.5751 18.0751 23.5 12 23.5ZM-5.24537e-07 12.5C-2.34843e-07 5.87258 5.37258 0.5 12 0.500001C18.6274 0.500001 24 5.87258 24 12.5C24 19.1274 18.6274 24.5 12 24.5C5.37258 24.5 -8.1423e-07 19.1274 -5.24537e-07 12.5ZM10.6 7.7C9.94076 7.20557 9 7.67595 9 8.5L9 16.5C9 17.324 9.94076 17.7944 10.6 17.3L15.9333 13.3C16.4667 12.9 16.4667 12.1 15.9333 11.7L10.6 7.7Z" fill="#FAFBFE"/>
                </svg>
            </div>
            <div class="infobox__video infobox__fixed-ratio-block">
                <video autoplay="" loop="" muted="" playsinline="" src="${src}"></video>
            </div>
            <div class="infobox__title">
                ${title}
            </div>
            <button class="infobox__button">
                Explore
            </button>
        </div>
    `,
    'text': (title, text) => `
        <div class="infobox infobox--text">
            <h3 class="text-style-1920-buttons text-white">${title}</h3>
            <p class="text-style-1920-body text-gray">${text}</p>
        </div>
    `,
}

export default function spinhouseDemoBlock() {

    const pinsInstanses = {

    };

    document.body.addEventListener('click',function spinhouseDemoBlockPinsHandler(evt){


        console.log(pinsInstanses);
        
        const target = evt.target.closest('[data-spinhouse-demo-icon]');
        if (!target) return;
        const attrValue = target.getAttribute('data-spinhouse-demo-icon');
        if (pinsInstanses[attrValue]) {
            pinsInstanses[attrValue].highlight(pinsInstanses[attrValue].conf);
            
            return;
        }

        const type = target.dataset.type;
        let layout = '';

        switch (type) {
            case 'text':
                layout = infoBoxes.text(target.dataset.title, target.dataset.text);
                break;
            case 'image':
                layout = infoBoxes.image(target.dataset.src);
                break;
            case 'video':
                layout = infoBoxes.video(target.dataset.title, target.dataset.src);
                break;
            case 'image_with_text':
                layout = infoBoxes.image_with_text(target.dataset.title, target.dataset.src);
                break;
            default:
                break;
        }

        pinsInstanses[attrValue] = driver();
        const $elementToHightlight = document.querySelector(`[data-hightlight-on-open="${attrValue}"]`);
        const thisPinConfig = {
            element: $elementToHightlight,
            onHighlighted: (element, insta) => {
                console.log('onHighlighted', element, insta);
                if (target.dataset.ratio) {
                    document.querySelector('.driver-popover .infobox__fixed-ratio-block').style.paddingBottom = target.dataset.ratio+'%';
                }
            },
            popover: {
                side: 'right',
                description: layout
            }
        };

        pinsInstanses[attrValue].conf = thisPinConfig;

        pinsInstanses[attrValue].highlight(pinsInstanses[attrValue].conf);
    });
}


function addBodyOverlay() {
    const overlay = document.createElement('div');
    overlay.classList.add('overlay');
    document.body.appendChild(overlay);
}

function removeBodyOverlay() {
    const overlay = document.querySelector('.overlay');
    overlay.remove();
}

