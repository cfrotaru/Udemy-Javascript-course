'use strict';

export default class UILogic {
  constructor() {
    this.initiateElements();
    this.initiateGetters();
    this.initiateFunctions();

    this.currencySymbols = new Map([
      ['EUR', '€'],
      ['USD', '$'],
      ['GBP', '£'],
    ]);
  }

  initiateElements() {
    // Elements
    this.labelWelcome = document.querySelector('.welcome');
    this.labelDate = document.querySelector('.date');
    this.labelBalance = document.querySelector('.balance__value');
    this.labelSumIn = document.querySelector('.summary__value--in');
    this.labelSumOut = document.querySelector('.summary__value--out');
    this.labelSumInterest = document.querySelector('.summary__value--interest');
    this.labelTimer = document.querySelector('.timer');

    this.containerApp = document.querySelector('.app');
    this.containerMovements = document.querySelector('.movements');
    console.log('containerMovements: ', this.containerMovements);
    this.btnLogin = document.querySelector('.login__btn');
    this.btnTransfer = document.querySelector('.form__btn--transfer');
    this.btnLoan = document.querySelector('.form__btn--loan');
    this.btnClose = document.querySelector('.form__btn--close');
    this.btnSort = document.querySelector('.btn--sort');

    this.inputLoginUsername = document.querySelector('.login__input--user');
    this.inputLoginPin = document.querySelector('.login__input--pin');
    this.inputTransferTo = document.querySelector('.form__input--to');
    this.inputTransferAmount = document.querySelector('.form__input--amount');
    this.inputLoanAmount = document.querySelector('.form__input--loan-amount');
    this.inputCloseUsername = document.querySelector('.form__input--user');
    this.inputClosePin = document.querySelector('.form__input--pin');

    this.loginForm = document.querySelector('.login');
    this.transferForm = document.querySelector('.form--transfer');
    this.loanForm = document.querySelector('.form--loan');
    this.closeForm = document.querySelector('.form--close');
  }

  initiateGetters() {
    this.getUserField = function () {
      return this.inputLoginUsername.value;
    };

    this.getPinField = function () {
      return this.inputLoginPin.value;
    };
  }

  initiateButtons(context) {
    console.log('init buttons happens');
    this.btnSort.addEventListener(
      'click',
      this.sortMovements.bind(this, context)
    );
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Initializes the event listeners for the forms in the UI.
   * If a handler is null, no event listener is added.
   * @param {function} loginHandler - event handler for the login form
   * @param {function} transferHandler - event handler for the transfer form
   * @param {function} loanHandler - event handler for the loan form
   * @param {function} closeHandler - event handler for the close form
   */
  /******  a7aff188-c884-4355-80a7-b0f5f4f7894b  *******/
  initiateForms(
    loginHandler = null,
    transferHandler = null,
    loanHandler = null,
    closeHandler = null
  ) {
    this.clearForms = function () {
      this.loginForm.reset();
      this.transferForm.reset();
      this.loanForm.reset();
      this.closeForm.reset();

      this.inputLoginUsername.blur();
      this.inputLoginPin.blur();
      this.inputTransferTo.blur();
      this.inputTransferAmount.blur();
      this.inputLoanAmount.blur();
      this.inputCloseUsername.blur();
      this.inputClosePin.blur();
    };

    if (loginHandler) {
      this.btnLogin.type = 'submit';
      this.loginForm.addEventListener('submit', e => {
        e.preventDefault();
        if (loginHandler(new FormData(this.loginForm))) {
          this.clearForms();
        } else {
          this.clearForms();
          this.inputLoginUsername.focus();
        }
      });
    }

    if (transferHandler) {
      this.btnTransfer.type = 'submit';
      this.transferForm.addEventListener('submit', e => {
        e.preventDefault();
        transferHandler(new FormData(this.transferForm));
        this.clearForms();
      });
    }

    if (loanHandler) {
      this.btnLoan.type = 'submit';
      this.loanForm.addEventListener('submit', e => {
        e.preventDefault();
        loanHandler(new FormData(this.loanForm));
        this.clearForms();
      });
    }

    if (closeHandler) {
      this.btnClose.type = 'submit';
      this.closeForm.addEventListener('submit', e => {
        e.preventDefault();
        closeHandler(new FormData(this.closeForm));
        this.clearForms();
      });
    }
  }

  initiateFunctions() {
    this.updateTimer = function (timeLeft) {
      //timeLeft in seconds
      const minutes = Math.floor(timeLeft / 60);
      const seconds = timeLeft % 60;
      this.labelTimer.textContent = `${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
    this.displayMovement = function (
      movement,
      count,
      movementDate = null,
      currency = 'EUR'
    ) {
      const type = movement > 0 ? 'deposit' : 'withdrawal';
      const amount = Math.abs(movement);

      const html = `
            <div class="movements__row">
                <div class="movements__type movements__type--${type}">${count} ${type}</div>
                <div class="movements__date">${this.getFormatedDate(
                  movementDate,
                  false
                )}</div>
                <div class="movements__value">${amount}${this.currencySymbols.get(
        currency
      )}</div>
            </div>
        `;
      this.containerMovements.insertAdjacentHTML('afterbegin', html);
    };
    this.displayMovements = function (
      movements,
      movementsDates = [],
      currency = 'EUR',
      order = 'desc'
    ) {
      console.log(`ORDER: ${order}`);
      let movementsData = [...movements];
      let movementsDatesData = [...movementsDates];
      if (order === 'asc') {
        console.log(`ORDER IS ASC`);
        movementsData.reverse();
        movementsDatesData.reverse();
      }
      this.containerMovements.innerHTML = '';
      movementsData.forEach((movement, index) => {
        console.log(`EACH MOVEMENT IS DISPLAYED`);
        this.displayMovement.call(
          this,
          movement,
          index + 1,
          movementsDatesData[index],
          currency
        );
      });
    };

    this.sortMovements = function (context) {
      const currentAccount = context.currentLoggedInAccount.at(1);

      if (this.btnSort.dataset.value === 'desc') {
        this.btnSort.dataset.value = 'asc';
        this.btnSort.innerHTML = '&uarr; SORT';
      } else {
        this.btnSort.dataset.value = 'desc';
        this.btnSort.innerHTML = '&darr; SORT';
      }

      this.displayMovements(
        currentAccount.movements,
        currentAccount.movementsDates,
        currentAccount.currency,
        this.btnSort.dataset.value
      );
    };
  }

  updateUI(account = null) {
    console.log('UpdateUi happens!');
    console.log('account', account);
    if (account) {
      this.labelWelcome.textContent = `Welcome back, ${
        account.owner.split(' ')[0]
      }`;
      this.labelDate.textContent = this.getFormatedDate();
      this.labelBalance.textContent = `${account.movements
        .reduce((acc, mov) => acc + mov, 0)
        .toFixed(2)}${this.getCurrencySymbol(account)}`;
      this.labelSumIn.textContent = `${account.movements
        .filter(mov => mov > 0)
        .reduce((acc, mov) => acc + mov, 0)
        .toFixed(2)}${this.getCurrencySymbol(account)}`;
      this.labelSumOut.textContent = `${account.movements
        .filter(mov => mov < 0)
        .reduce((acc, mov) => acc + mov, 0)
        .toFixed(2)}${this.getCurrencySymbol(account)}`;
      this.labelSumInterest.textContent = `${(
        (account.movements.reduce((acc, mov) => acc + mov, 0) *
          account.interestRate) /
        100
      ).toFixed(2)}${this.getCurrencySymbol(account)}`;

      this.displayMovements(
        account.movements,
        account.movementsDates,
        account.currency
      );

      this.containerApp.style.opacity = 1;
    } else {
      this.containerApp.style.opacity = 0;
    }
  }

  getCurrencySymbol(account) {
    return account && account.currency
      ? this.currencySymbols.get(account.currency)
      : '€';
  }

  getFormatedDate(date = new Date(), includeTime = true) {
    date = new Date(date);
    const options = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };
    if (includeTime) {
      options.hour = 'numeric';
      options.minute = 'numeric';
    }

    return new Intl.DateTimeFormat(navigator.language, options).format(date);
  }
}
