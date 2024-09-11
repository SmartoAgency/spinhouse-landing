import gsap from 'gsap';
import BezierEasing from 'bezier-easing';

export default class MyToster {
  constructor(setting) {
    this.$wrap = setting.$wrap;
    this.$item = setting.$item;
    this.ease_0 = BezierEasing(0.34, 0.98, 0.43, 0.95);

    this.$body = document.querySelector('body');

    this.init();
  }

  /*  */
  createItem({ type, title, text }) {
    return `
      <div class="toast" data-toast-item="" data-toast-status="${type}">
        <div class="toast-logo-block">
          <div class="toast__logo">
            <svg width="166" height="25" viewBox="0 0 166 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 17.6808V6.31924L8.00013 2.16299L15 6.31923V17.6808L8.00013 21.837L1 17.6808Z" stroke="#F7F9FB" stroke-width="2"/>
              <path d="M30.1114 15.048C30.17 15.4 30.4127 15.6747 30.8394 15.872C31.266 16.0693 31.8447 16.168 32.5754 16.168C33.93 16.168 34.6074 15.896 34.6074 15.352C34.6074 15.1387 34.4954 14.9707 34.2714 14.848C34.0474 14.72 33.642 14.6373 33.0554 14.6L31.0714 14.472C29.3114 14.3547 28.0207 13.9787 27.1994 13.344C26.378 12.7093 25.9674 11.8427 25.9674 10.744C25.9674 9.86933 26.218 9.13067 26.7194 8.528C27.226 7.92533 27.9407 7.472 28.8634 7.168C29.7914 6.864 30.8794 6.712 32.1274 6.712C33.322 6.712 34.3887 6.88 35.3274 7.216C36.266 7.552 37.0074 8.02667 37.5514 8.64C38.1007 9.25333 38.4047 9.96 38.4634 10.76H34.2714C34.2234 10.4667 34.01 10.24 33.6314 10.08C33.2527 9.91467 32.7247 9.832 32.0474 9.832C30.7887 9.832 30.1594 10.0827 30.1594 10.584C30.1594 10.7867 30.266 10.9493 30.4794 11.072C30.6927 11.1893 31.066 11.2667 31.5994 11.304L33.8394 11.448C35.0074 11.5227 35.954 11.696 36.6794 11.968C37.4047 12.2347 37.9354 12.608 38.2714 13.088C38.6127 13.5627 38.7834 14.1573 38.7834 14.872C38.7834 15.7467 38.522 16.52 37.9994 17.192C37.4767 17.8587 36.7407 18.376 35.7914 18.744C34.842 19.1067 33.7434 19.288 32.4954 19.288C31.2047 19.288 30.0634 19.112 29.0714 18.76C28.0847 18.408 27.3167 17.912 26.7674 17.272C26.218 16.632 25.9354 15.8907 25.9194 15.048H30.1114ZM47.2333 7C48.3053 7 49.2306 7.17867 50.0093 7.536C50.7879 7.89333 51.3799 8.4 51.7853 9.056C52.1959 9.712 52.4013 10.4827 52.4013 11.368C52.4013 12.2533 52.1959 13.024 51.7853 13.68C51.3799 14.336 50.7879 14.8427 50.0093 15.2C49.2306 15.5573 48.3053 15.736 47.2333 15.736H44.3693V19H40.2413V7H47.2333ZM46.9613 12.52C47.3719 12.52 47.6866 12.4213 47.9053 12.224C48.1293 12.0213 48.2413 11.736 48.2413 11.368C48.2413 11 48.1293 10.7173 47.9053 10.52C47.6866 10.3173 47.3719 10.216 46.9613 10.216H44.3693V12.52H46.9613ZM57.7599 7V19H53.6319V7H57.7599ZM59.6788 7H65.0068L69.6788 14.256V7H73.6788V19H68.5108L63.6788 11.496V19H59.6788V7Z" fill="#F7F9FB"/>
              <rect width="86" height="23" transform="translate(80 1)" fill="#F7F9FB"/>
              <path d="M92.1114 7V11.048H97.2314V7H101.359V19H97.2314V14.696H92.1114V19H87.9834V7H92.1114ZM110.128 19.288C108.683 19.288 107.408 19.0267 106.304 18.504C105.2 17.9813 104.344 17.2453 103.736 16.296C103.134 15.3467 102.832 14.248 102.832 13C102.832 11.752 103.134 10.6533 103.736 9.704C104.344 8.75467 105.2 8.01867 106.304 7.496C107.408 6.97333 108.683 6.712 110.128 6.712C111.574 6.712 112.848 6.97333 113.952 7.496C115.056 8.01867 115.91 8.75467 116.512 9.704C117.12 10.6533 117.424 11.752 117.424 13C117.424 14.248 117.12 15.3467 116.512 16.296C115.91 17.2453 115.056 17.9813 113.952 18.504C112.848 19.0267 111.574 19.288 110.128 19.288ZM106.992 13C106.992 13.5387 107.118 14.0053 107.368 14.4C107.619 14.7893 107.979 15.088 108.448 15.296C108.923 15.504 109.483 15.608 110.128 15.608C110.774 15.608 111.331 15.504 111.8 15.296C112.275 15.088 112.638 14.7893 112.888 14.4C113.139 14.0053 113.264 13.5387 113.264 13C113.264 12.4613 113.139 11.9973 112.888 11.608C112.638 11.2133 112.275 10.912 111.8 10.704C111.331 10.496 110.774 10.392 110.128 10.392C109.483 10.392 108.923 10.496 108.448 10.704C107.979 10.912 107.619 11.2133 107.368 11.608C107.118 11.9973 106.992 12.4613 106.992 13ZM122.858 13.496C122.858 14.1733 123.036 14.696 123.394 15.064C123.751 15.4267 124.298 15.608 125.034 15.608C126.484 15.608 127.21 14.904 127.21 13.496V7H131.338V13.72C131.338 14.824 131.076 15.7973 130.554 16.64C130.031 17.4827 129.292 18.136 128.338 18.6C127.388 19.0587 126.287 19.288 125.034 19.288C123.786 19.288 122.684 19.056 121.73 18.592C120.78 18.128 120.042 17.4773 119.514 16.64C118.991 15.7973 118.73 14.824 118.73 13.72V7H122.858V13.496ZM136.9 15.048C136.959 15.4 137.202 15.6747 137.628 15.872C138.055 16.0693 138.634 16.168 139.364 16.168C140.719 16.168 141.396 15.896 141.396 15.352C141.396 15.1387 141.284 14.9707 141.06 14.848C140.836 14.72 140.431 14.6373 139.844 14.6L137.86 14.472C136.1 14.3547 134.81 13.9787 133.988 13.344C133.167 12.7093 132.756 11.8427 132.756 10.744C132.756 9.86933 133.007 9.13067 133.508 8.528C134.015 7.92533 134.73 7.472 135.652 7.168C136.58 6.864 137.668 6.712 138.916 6.712C140.111 6.712 141.178 6.88 142.116 7.216C143.055 7.552 143.796 8.02667 144.34 8.64C144.89 9.25333 145.194 9.96 145.252 10.76H141.06C141.012 10.4667 140.799 10.24 140.42 10.08C140.042 9.91467 139.514 9.832 138.836 9.832C137.578 9.832 136.948 10.0827 136.948 10.584C136.948 10.7867 137.055 10.9493 137.268 11.072C137.482 11.1893 137.855 11.2667 138.388 11.304L140.628 11.448C141.796 11.5227 142.743 11.696 143.468 11.968C144.194 12.2347 144.724 12.608 145.06 13.088C145.402 13.5627 145.572 14.1573 145.572 14.872C145.572 15.7467 145.311 16.52 144.788 17.192C144.266 17.8587 143.53 18.376 142.58 18.744C141.631 19.1067 140.532 19.288 139.284 19.288C137.994 19.288 136.852 19.112 135.86 18.76C134.874 18.408 134.106 17.912 133.556 17.272C133.007 16.632 132.724 15.8907 132.708 15.048H136.9ZM157.656 14.424H151.216L151 15.736H158.248V19H146.632L147.512 13L146.632 7H158.168V10.264H151L151.216 11.576H157.656V14.424Z" fill="#212125"/>
            </svg>
          </div>
        </div>
        <div class="toast-content-block">
          <h5 class="toast__title">${title}</h5>
          <p class="toast__text">${text}</p>
        </div>
        <button class="toast__colose-btn" data-toast-colose-btn="" type="button">
          <svg class="icon--close" role="presentation">
            <use xlink:href="#icon-close"></use>
          </svg>
        </button>
      </div>
    `;
  }

  removeItem(item) {
    gsap.fromTo(
      item,
      0.25,
      { xPercent: 0, ease: this.ease_0 },
      {
        xPercent: 100,
        onComplete: () => {
          item.remove();
        },
      },
    );
  }

  addToast(settingObj) {
    const markup = this.createItem(settingObj);
    this.$wrap.insertAdjacentHTML('beforeend', markup);
    /*  */
    const items = this.$wrap.querySelectorAll('[data-toast-item]');
    const item = items[items.length - 1];
    /*  */
    gsap.fromTo(
      item,
      0.75,
      { xPercent: 100, skewX: -10 },
      { xPercent: 0, skewX: 0, ease: this.ease_0 },
    );

    setTimeout(() => {
      this.removeItem(item);
    }, 3000);
  }

  listeners() {
    const self = this;
    this.$wrap.addEventListener('click', ({ target }) => {
      if (target.closest('[data-toast-colose-btn]') !== null) {
        const item = target.closest('[data-toast-item]');
        self.removeItem(item);
      }
    });
  }

  init() {
    this.listeners();
  }
}
