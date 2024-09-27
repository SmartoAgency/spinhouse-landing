import i18next from 'i18next';
import gsap from 'gsap';
import * as yup from 'yup';
import FormMonster from '../../../../pug/components/form/form';
import SexyInput from '../../../../pug/components/input/input';

export function formsHandler() {
  const formWrapper = document.querySelector('[data-form-wrapper]');
  const modal = document.querySelector('[data-form="data-popup-form"]');
  const formWrapperSuccess = document.querySelector('.form-wrapper-succes-layer');
  let timerId;
  let timerIdAnimateForm;


  const formsWithTel = ['[data-popup-form]', '[data-contact-screen-form]'];
  formsWithTel.forEach(form => {
    const $form = document.querySelector(form);
    if ($form) {
      /* eslint-disable */
      new FormMonster({
        /* eslint-enable */
        elements: {
          $form,
          showSuccessMessage: false,
          successAction: () => {
            formWrapperSuccess.classList.add('active');
            // modal.classList.remove('active');
            gsap.fromTo(formWrapperSuccess, { opacity: 0 }, { opacity: 1 });
            document.querySelector('[data-form-popup-close]').click();
            
          },
          $btnSubmit: $form.querySelector('[data-btn-submit]'),
          fields: {
            name: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-name"]'),
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .matches(/^[А-Яа-яІіЇїҐґA-Za-z\s0-9]+$/, i18next.t('invalid_name'))
                .min(2, i18next.t('name_too_short', { cnt: 2 }))
                .max(15, i18next.t('name_too_long', { cnt: 24 }))
                .trim(),
              defaultMessage: i18next.t('name'),
              valid: false,
              error: [],
            },
            phone: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-phone"]'),
                typeInput: 'phone',
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .min(14, i18next.t('field_too_short', { cnt: 19 - 9 })),
              defaultMessage: i18next.t('phone'),
              valid: false,
              error: [],
            },
            // email: {
            //   inputWrapper: new SexyInput({
            //     animation: 'none',
            //     $field: $form.querySelector('[data-field-name="data-field-email"]'),
            //     typeInput: 'email',
            //   }),
            //   rule: yup
            //     .string()
            //     .required(i18next.t('required'))
            //     .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,3}$/i, i18next.t('invalid_email')),
            //   defaultMessage: i18next.t('email'),
            //   valid: false,
            //   error: [],
            // }
          },
        },
      });
    }
  });
  hiddenFieldsHandler();
}
export function quizFormHandler(successAction) {
  const formWrapper = document.querySelector('[data-form-wrapper]');
  const modal = document.querySelector('[data-form="data-popup-form"]');
  const formWrapperSuccess = document.querySelector('.form-wrapper-succes-layer');
  let timerId;
  let timerIdAnimateForm;


  const formsWithTel = ['[data-quiz-form]'];
  formsWithTel.forEach(form => {
    const $form = document.querySelector(form);
    if ($form) {
      /* eslint-disable */
      new FormMonster({
        /* eslint-enable */
        elements: {
          $form,
          showSuccessMessage: false,
          successAction,
          $btnSubmit: $form.querySelector('[data-btn-submit]'),
          fields: {
            name: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-name"]'),
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .matches(/^[А-Яа-яІіЇїҐґA-Za-z\s0-9]+$/, i18next.t('invalid_name'))
                .min(2, i18next.t('name_too_short', { cnt: 2 }))
                .max(15, i18next.t('name_too_long', { cnt: 24 }))
                .trim(),
              defaultMessage: i18next.t('name'),
              valid: false,
              error: [],
            },
            phone: {
              inputWrapper: new SexyInput({
                animation: 'none',
                $field: $form.querySelector('[data-field-name="data-field-phone"]'),
                typeInput: 'phone',
              }),
              rule: yup
                .string()
                .required(i18next.t('required'))
                .min(14, i18next.t('field_too_short', { cnt: 19 - 9 })),
              defaultMessage: i18next.t('phone'),
              valid: false,
              error: [],
            },
            // email: {
            //   inputWrapper: new SexyInput({
            //     animation: 'none',
            //     $field: $form.querySelector('[data-field-name="data-field-email"]'),
            //     typeInput: 'email',
            //   }),
            //   rule: yup
            //     .string()
            //     .required(i18next.t('required'))
            //     .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,3}$/i, i18next.t('invalid_email')),
            //   defaultMessage: i18next.t('email'),
            //   valid: false,
            //   error: [],
            // }
          },
        },
      });
    }
  });
  hiddenFieldsHandler();
}

function hiddenFieldsHandler() {
  const rowField = document.querySelectorAll('input[name="row_number"]');
  const placeField = document.querySelectorAll('input[name="place_number"]');

  window.addEventListener('interactive-map-infobox-open', (evt) => {
    rowField.forEach((el) => {
      el.value = evt.detail.row_number;
    });
    placeField.forEach((el) => {
      el.value = evt.detail.place_number;
    });
  });
  window.addEventListener('form-close', (evt) => {
    rowField.forEach((el) => {
      el.value = '';
    });
    placeField.forEach((el) => {
      el.value ='';
    });
  });
}
