import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
import { BarcodeScanner, StatusBar } from 'ionic-native';
import { AssetServices } from '../../providers/asset-services';
import { ViewController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { CreatePage } from '../create/create';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
  providers: [AssetServices]
})

export class search {
  
  // define values
  public assets: any;
  public assetResult: any;
  public barcodeText: '';
  public searchText: string;

  constructor(
			public navCtrl: NavController, 
			public navParams: NavParams, 
			public AssetServices: AssetServices,
			public platform: Platform, 
			public viewCtrl: ViewController,
			public loadingCtrl: LoadingController,
		) {
	this.assets = {
		'code': 100,
		'message': 'no query yet',
		'status': 'error',
	}
	platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
    });
  }
  
  ionViewDidLoad(){
	// this.AssetServices.load()
	// this.barcodeText = 'this is a demo';
  }
  
  goToRegister()
  {
	this.navCtrl.push(CreatePage, {
		barcode_text: this.barcodeText
	})
  }
  
  onInput(event) {
	var loading = this.presentLoadingDefault();
	
	loading.present();
    // That's right, we're pushing to ourselves!
	this.AssetServices.setValue('asset',event.target.value);
	this.barcodeText = event.target.value;
	this.AssetServices.load()
	.then(data => {
		this.assets = data;
		loading.dismiss()
	});
  }
  
	presentLoadingDefault() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});
		
		return loading;
	}
  
  
  showBarcode(event) {
	BarcodeScanner.scan().then((barcodeData) => {
		// Success! Barcode data is here
		if(barcodeData.text) { 
			var loading = this.presentLoadingDefault();
			this.AssetServices.setValue('asset',barcodeData.text);
			
			loading.present();
			
			this.barcodeText = barcodeData.text;
			this.AssetServices.load()
			
			.then(data => {
				this.assets = data;
				loading.dismiss()
				console.log(this.assets);
			});
		}
	}, (err) => {
		alert(err)
		// An error occurred
	});
  }
  
  
}