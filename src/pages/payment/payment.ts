import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { PaymentMethodPage } from './payment-method/payment-method';
import { AddMoneyPage } from './add-money/add-money';
import { WithdrawMoneyPage } from './withdraw-money/withdraw-money';

interface Transaction {
  description: string;
  date: Date;
  amount: number
}

const fakeTransactions: Transaction[] = [
  {
    description: 'Reservation package',
    date: new Date(),
    amount: 5.04
  },
  {
    description: 'Reservation package',
    date: new Date(),
    amount: 5.04
  },
  {
    description: 'Reservation package',
    date: new Date(),
    amount: -5.04
  },
  {
    description: 'Withdrawl',
    date: new Date(),
    amount: -5.04
  }
];

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html',
})
export class PaymentPage {
  prepaidCredit = 5.67;
  earnedRewards = 3.67;
  promotional = 10.00;

  get balance() {
    return this.prepaidCredit + this.earnedRewards + this.promotional;
  }

  transactions: Transaction[] = fakeTransactions;

  isPositive(transaction: Transaction) {
    return transaction.amount > 0;
  }

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController) {
  }

  editPaymentMethod() {
    this.navCtrl.push(PaymentMethodPage);
  }

  onAddMoney() {
    const addMoney = this.modalCtrl.create(AddMoneyPage);
    addMoney.present();
  }

  onWithdrawMoney() {
    const withdrawMoney = this.modalCtrl.create(WithdrawMoneyPage);
    withdrawMoney.present();
  }


}
