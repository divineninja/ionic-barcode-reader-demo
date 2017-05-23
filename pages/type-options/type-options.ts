import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CreateProvider } from '../../providers/create-provider';

/*
  Generated class for the TypeOptions page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-type-options',
  templateUrl: 'type-options.html'
})
export class TypeOptionsPage {
	public modelOptions: any;
	public optionModelName: any;
	
	public selectOptions: any;
	
	public options: any;
	public orig_options: any;
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public CreateProvider: CreateProvider) {
		this.modelOptions = navParams.get('optionModel');
		this.optionModelName = navParams.get('optionModelName');
		this.orig_options = this.modelOptions;
	}
	
	initialized()
	{
		this.options = this.orig_options;
	}

	ionViewDidLoad() {
		this.initialized();
		console.log('ionViewDidLoad otpions');
	}
  
	dismiss(item) {
		let data = item;
		this.viewCtrl.dismiss(data);
	}
	
	selectOption(item)
	{
		this.dismiss(item);
	}
	
	getItems(ev: any) {
		// Reset items back to all of the items
		this.initialized();

		// set val to the value of the searchbar
		let val = ev.target.value;
	
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.options = this.options.filter((item) => {
				return (item[this.optionModelName].toLowerCase().indexOf(val.toLowerCase())  > -1 );
			});
		}
	}

}
