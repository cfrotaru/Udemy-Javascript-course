'use strict';

export default class AccountData {
  constructor() {
    let accounts = new Map();
    accounts.set('js', {
      owner: 'Jonas Schmedtmann',
      movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
      movementsDates: [
        '2019-01-28T09:15:04.904Z',
        '2019-04-01T10:17:24.185Z',
        '2019-05-27T17:01:17.194Z',
        '2019-07-11T23:36:17.929Z',
        '2019-11-18T21:31:17.178Z',
        '2019-12-23T07:42:02.383Z',
        '2020-03-08T14:11:59.604Z',
        '2020-03-12T10:51:36.790Z',
      ],
      currency: 'EUR',
      interestRate: 1.2, // %
      pin: 1111,
    });

    accounts.set('jd', {
      owner: 'Jessica Davis',
      movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
      movementsDates: [
        '2019-01-25T14:18:46.235Z',
        '2019-02-05T16:33:06.386Z',
        '2019-03-10T14:43:26.374Z',
        '2019-04-25T18:49:59.371Z',
        '2019-11-01T13:15:33.035Z',
        '2019-11-30T09:48:16.867Z',
        '2019-12-25T06:04:23.907Z',
        '2020-02-26T12:01:20.894Z',
      ],
      currency: 'USD',
      interestRate: 1.5,
      pin: 2222,
    });

    accounts.set('stw', {
      owner: 'Steven Thomas Williams',
      movements: [200, -200, 340, -300, -20, 50, 400, -460],
      interestRate: 0.7,
      pin: 3333,
    });

    accounts.set('ss', {
      owner: 'Sarah Smith',
      movements: [430, 1000, 700, 50, 90],
      interestRate: 1,
      pin: 4444,
    });
    this.availableMoney = function (id) {
      const account = accounts.get(id);
      if (account) {
        return account.movements.reduce((acc, mov) => acc + mov, 0);
      }
    };
    this.checkCredentials = function (id, pin) {
      return accounts.get(id)?.pin === Number(pin);
    };

    this.getAccount = function (id, pin) {
      return this.checkCredentials(id, pin) ? [id, accounts.get(id)] : null;
    };

    this.getAllAccounts = function () {
      return accounts;
    };
    this.addAccount = function (id, owner, movements, interestRate, pin) {
      accounts.set(id, {
        owner: owner,
        movements: movements,
        interestRate: interestRate,
        pin: pin,
      });
    };

    this.removeAccount = function (id, pin) {
      console.log(
        accounts.get(id)?.pin === Number(pin) ? accounts.delete(id) : null
      );
    };

    this.transferFunds = function (senderId, receiverId, amount) {
      const sender = accounts.get(senderId);
      const receiver = accounts.get(receiverId);
      console.log(
        `Sender: ${sender}, Receiver: ${receiver}, Amount: ${amount} Available: ${this.availableMoney(
          senderId
        )}`
      );
      if (sender && receiver && this.availableMoney(senderId) >= amount) {
        let [senderMovements, senderMovementsDates] = pushMovement(
          senderId,
          -amount
        );
        pushMovement(receiverId, amount);
        console.log('Transfer successful');
        return [senderMovements, senderMovementsDates];
      } else {
        alert('Transfer failed');
        return [null, null];
      }
    };

    function pushMovement(id, movement) {
      const account = accounts.get(id);
      if (account) {
        account.movements.push(movement);
        account.movementsDates.push(new Date().toISOString());
        accounts.set(id, account);
        return [account.movements, account.movementsDates];
      }
    }
  }
}
