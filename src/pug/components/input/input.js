import Cleave from 'cleave.js';
import intlTelInput from 'intl-tel-input';

export default class SexyInput {
  constructor(setting) {
    this.selected = false;
    this.$field = setting.$field;
    this.$input = setting.$input || setting.$field.querySelector('input');
    this.typeInput = setting.typeInput || 'text';
    this.animation = setting.animation || 'none';
    this.$message = setting.$message || setting.$field.querySelector('[data-input-message]');

    this.$body = document.querySelector('body');

    this.init();
  }

  get input() {
    return this.$input;
  }

  selectIn(self) {
    return () => {
      if (this.getStatusField() !== 'field--error') {
        self.showSelectedStyle();
        self.addSelectedStyle();
      }
    };
  }

  selectOut(self) {
    return ({ target }) => {
      if (this.getStatusField() === 'field--error' || target.value !== '') return;

      self.showDefaultStyle();
      self.removeSelectedStyle();
    };
  }

  /*  */
  getStatusField() {
    return this.$field.getAttribute('data-status');
  }

  /*  */
  showSuccessStyle() {
    this.changeStatus(this.$field, 'success');
  }

  showDefaultStyle() {
    this.changeStatus(this.$field, 'default');
  }

  showErrorStyle() {
    this.changeStatus(this.$field, 'error');
  }

  showSelectedStyle() {
    this.changeStatus(this.$field, 'selected');
  }

  showLoadingStyle() {
    this.changeStatus(this.$field, 'loading');
  }

  addSelectedStyle() {
    if (this.animation === 'focus') {
      this.$field.classList.add('selected');
    }
  }

  removeSelectedStyle() {
    this.$field.classList.remove('selected');
  }

  writeMessage(text) {
    this.$message.innerHTML = text;
  }
  /*  */

  changeStatus(fieldBlock, status) {
    switch (status) {
      case 'default':
        fieldBlock.classList.remove('selected');
        fieldBlock.setAttribute('data-status', 'field--inactive');

        break;
      case 'success':
        fieldBlock.setAttribute('data-status', 'field--success');

        break;
      case 'error':
        fieldBlock.setAttribute('data-status', 'field--error');
        break;
      case 'selected':
        fieldBlock.classList.add('selected');
        fieldBlock.setAttribute('data-status', 'field--active');
        break;
      case 'loading':
        fieldBlock.classList.add('selected');
        fieldBlock.setAttribute('data-status', 'field--loading');
        break;

      default:
        throw new Error(`Unknown change status ${status}`);
    }
  }

  /*  */

  listeners(input) {
    const self = this;

    const defaultCountryFromBackend = document.body.getAttribute('data-country-code') ? document.body.getAttribute('data-country-code') : 'us';

    const prefferedCountries = defaultCountryFromBackend == 'us' ? ['us'] : [defaultCountryFromBackend, 'us']; 

    if (this.typeInput === 'phone') {
      /* eslint-disable */
      input.setAttribute('inputmode', 'tel');
      input.intTelIput = intlTelInput(input, {
        preferredCountries: [...prefferedCountries, 'ua', 'pl', 'ca', 'se', 'it', 'es','fr', 'tr', 'de', 'gb'],
        defaultCountry: defaultCountryFromBackend,
        excludeCountries: ['ru'],
        countrySearch: true,
      });
      
      let cleave = new Cleave(input, {
        /* eslint-enable */
        numericOnly: true,
        prefix: '+',
        blocks: [3, 3, 3, 2, 2, 2, 2, 2, 2, 2],
        delimiters: [' ', ' ', ' ', '', '', '', '', '', ''],
      });
      input.addEventListener('countrychange', () => {
        return;
        const currentCountry = input.intTelIput.getSelectedCountryData();
        const { dialCode } = currentCountry;
        const selfInput = input;
        let maskPartForUkraine = currentCountry.iso2 === 'ua' ? 2 : 3;

        //'tr', 'kz', 'th', 'de', 'ae'
        switch (currentCountry.iso2) {
          case 'tr':
            maskPartForUkraine = 3;
            break;
          case 'kz':
            maskPartForUkraine = 2;
            
            break;
          case 'th':
            maskPartForUkraine = 3;
            
            break;
          case 'de':
            maskPartForUkraine = 3;
            
            break;
          case 'ae':
              maskPartForUkraine = 4;
              
            break;
        
          default:
            break;
        }
        // cleave.destroy();
        selfInput.value = '';
        // cleave = new Cleave(input, {
        //   numericOnly: true,
        //   delimiter: '-',
        //   prefix: `+${dialCode}`,
        //   /* В код страны добавляется символ + */
        //   blocks: [dialCode.toString().length + 1, maskPartForUkraine, 3, 2, 2, 2, 2, 2, 2, 2],
        //   delimiters: [' ', ' ', ' ', '', '', '', '', '', ''],
        // });
      });
      input.value = '+'+input.intTelIput.getSelectedCountryData().dialCode;
    }



    if (this.animation === 'focus') {
      input.addEventListener('focus', self.selectIn(self));
      input.addEventListener('blur', self.selectOut(self));
    }
  }

  prepareMarkup() {
    if (this.animation === 'focus') {
      this.$field.setAttribute('data-animation', 'focus');
    }
    if (this.animation === 'none') {
      this.$field.setAttribute('data-animation', 'none');
    }
  }

  init() {
    this.listeners(this.$input);
    this.prepareMarkup(this.$input);
  }
}
