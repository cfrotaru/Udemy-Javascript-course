'use strict';
import AccountData from './AccountData.js';
import UIUpdater from './UILogic.js';
export default class AppLogic {
  constructor() {
    this.data = new AccountData();
    this.ui = new UIUpdater();

    this.utils();

    //this.ui.initiateButtons(this.logIn.bind(this));
    this.ui.initiateForms(
      this.logIn.bind(this),
      this.transfer.bind(this),
      this.loan.bind(this),
      this.closeAccount.bind(this)
    );

    this.ui.initiateButtons(this);
  }

  utils() {
    console.log('Utils happens!!!');
    this.logIn = function (formData) {
      const account = this.data.getAccount(
        formData.get('login-user'),
        formData.get('login-pin')
      );
      if (account) {
        this.currentLoggedInAccount = account;
        this.ui.updateUI(account.at(1));
        console.log('Successful login');
      } else {
        alert('Login failed');
      }
    };

    this.transfer = function (formData) {
      const receiverId = formData.get('transfer-to');
      const amount = formData.get('transfer-amount');
      const [senderMovements, senderMovementsDates] = this.data.transferFunds(
        this.currentLoggedInAccount.at(0),
        receiverId,
        amount
      );
      if (senderMovements && senderMovementsDates) {
        this.currentLoggedInAccount.at(1).movements = senderMovements;
        this.currentLoggedInAccount.at(1).movementsDates = senderMovementsDates;
        this.ui.updateUI(this.currentLoggedInAccount.at(1));
      }
    };

    this.loan = function (formData) {
      const amount = formData.get('loan-amount');
      const [movements, movementsDates] = this.data.requestLoan(
        this.currentLoggedInAccount.at(0),
        amount
      );

      if (movements && movementsDates) {
        console.log(
          `Movements: ${movements}, Movements Dates: ${movementsDates}`
        );
        console.log(
          `Current Logged In Account: ${this.currentLoggedInAccount.at(1)}`
        );
        this.currentLoggedInAccount.at(1).movements = movements;
        this.currentLoggedInAccount.at(1).movementsDates = movementsDates;
        this.ui.updateUI(this.currentLoggedInAccount.at(1));
      }
    };

    this.logOut = function () {
      this.currentLoggedInAccount = null;
      this.ui.updateUI();
      console.log('Login failed');
    };

    this.closeAccount = function (formData) {
      const account = this.data.getAccount(
        formData.get('close-user'),
        formData.get('close-pin')
      );
      console.log(account, this.currentLoggedInAccount);
      if (
        account &&
        account.at(0) === this.currentLoggedInAccount.at(0) &&
        Object.keys(account.at(1)).every(
          key => account.at(1)[key] === this.currentLoggedInAccount.at(1)[key]
        )
      ) {
        this.data.removeAccount(account.at(0), formData.get('close-pin'));
        this.logOut();
      } else console.log('Nice Try!');
    };
  }
}
