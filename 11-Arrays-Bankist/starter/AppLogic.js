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
      null,
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
      let receiverId = formData.get('transfer-to');
      let amount = formData.get('transfer-amount');
      let [senderMovements, senderMovementsDates] = this.data.transferFunds(
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
