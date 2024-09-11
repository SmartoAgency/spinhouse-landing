import { useState } from '../../modules/helpers/helpers';

export default function spinhouseDemoBlockTablet() {
    const [ popupState, setPopupState, subscribePopupState ] = useState({
        isOpen: false,
        content: null,
    });


    subscribePopupState((state) => {
        if (!state.isOpen) {
            document.querySelectorAll('.spinhouse-demo-block-popup').forEach(popup => {
                popup.remove();
            });
            return;
        }
        document.body.insertAdjacentHTML('beforeend', renderInfoPopup({
            ...state
        }));
    });

    document.body.addEventListener('click',function spinhouseDemoBlockTabletHandler(evt){
        const target = evt.target.closest('[data-tablet-click]');
        if (!target) return;
        const attrValue = target.getAttribute('data-tablet-click');
        const title = target.dataset.title;
        const src = target.dataset.src;
        const type = target.dataset.type;
        setPopupState({
            ...popupState(),
            title,
            src,
            type,
            isOpen: true,
        });
    });
    document.body.addEventListener('click',function spinhouseDemoBlockTabletCloseHandler(evt){
        const target = evt.target.closest('[data-spinhouse-demo-block-close]');
        if (!target) return;
        setPopupState({
            isOpen: false,
        });
    });
}


function renderInfoPopup({title = 'No title', src, type}) {

    let content = '';

    switch (type) {
        case 'video':
            content = `
                <video muted autoplay playsinline loop>
                    <source src="${src}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
            `;
            break;
        case 'image':
            content = `
                <img src="${src}">
            `;
            break;
        case 'image-wide':
            content = `
                <img class="wide" src="${src}">
            `;
            break;
        default:
            break;
    }

    return `
        <div class="spinhouse-demo-block-popup">
            <div class="spinhouse-demo-block-popup__title">
                ${title}
            </div>
            <svg data-spinhouse-demo-block-close class="spinhouse-demo-block-popup__close" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 8C0 3.58172 3.58172 0 8 0H32C36.4183 0 40 3.58172 40 8V32C40 36.4183 36.4183 40 32 40H8C3.58172 40 0 36.4183 0 32V8Z" fill="#FAFBFE" fill-opacity="0.88"/>
                <path d="M0.5 8C0.5 3.85786 3.85786 0.5 8 0.5H32C36.1421 0.5 39.5 3.85786 39.5 8V32C39.5 36.1421 36.1421 39.5 32 39.5H8C3.85786 39.5 0.5 36.1421 0.5 32V8Z" stroke="#AEBECC" stroke-opacity="0.4"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9999 14.5858L16.707 15.2929L20.4999 19.0858L24.2928 15.2929L24.9999 14.5858L26.4141 16L25.707 16.7071L21.9141 20.5L25.707 24.2929L26.4141 25L24.9999 26.4142L24.2928 25.7071L20.4999 21.9142L16.707 25.7071L15.9999 26.4142L14.5857 25L15.2928 24.2929L19.0857 20.5L15.2928 16.7071L14.5857 16L15.9999 14.5858Z" fill="#1A1E21"/>
            </svg>
            <div class="spinhouse-demo-block-popup__content">
                ${content}
            </div>
        <button class="button-30" type="button" data-form-popup-call data-spinhouse-demo-block-close> 
            <span >Discover Spinhouse</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 19L18 8M18 8L7 8M18 8L8.1 17.9" stroke="#212125" stroke-width="3.5" />
            </svg>
        </button>
        </div>
    `;
}