import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AssetServices } from '../../providers/asset-services';

/*
  Generated class for the AssetSingle page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-asset-single',
  templateUrl: 'asset-single.html'
})
export class AssetSinglePage {
  
  public service_tag: any;
  public assets: any;
  public title: any;
	
  constructor(public navCtrl: NavController, public navParams: NavParams, public AssetServices: AssetServices) {
	this.service_tag = navParams.get('service_tag');
	this.AssetServices.setValue('asset', this.service_tag);
	
	this.title = 'No item selected';
	this.assets = {
		'code': 100,
		'message': 'no query yet',
		'status': 'error',
	}
  }
  
  ionViewDidLoad() {
	
	this.AssetServices.load()
	.then(data => {
		this.assets = data;
		console.log(this.assets);
		
		if(this.assets.code == 400){
			this.title = this.assets.result.service_tag;
			console.log(data);
		}
		
	});

    console.log('ionViewDidLoad AssetSinglePage');
  }

}
