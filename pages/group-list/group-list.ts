import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AssetServices } from '../../providers/asset-services';
import { AssetSinglePage } from '../asset-single/asset-single';
/*
  Generated class for the GroupList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-group-list',
  templateUrl: 'group-list.html'
})
export class GroupListPage {
	
	public assets: string[];
	public orig_assets: any;
	public key: any;
	public table: any;
	public title: any;
	public field: any;
	public loading: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public AssetServices: AssetServices) {
	  this.key = navParams.get('key');
	  this.table = navParams.get('table');
	  this.title = navParams.get('title');
	  this.field = navParams.get('field');
	  
	  this.loading = true;
	  
	  this.fetch_data();
  }

  ionViewDidLoad() {
	this.initialized();
  }
  
  initialized()
  {
	this.assets = this.orig_assets;
  }
  
  fetch_data()
  {
	this.AssetServices.setValue('groupKey',this.key);
	this.AssetServices.setValue('groupTable',this.table);
	this.AssetServices.setValue('groupField',this.field);

	this.AssetServices.getDataByGroupItem()
	.then(data => {
		this.orig_assets = data['result'];
		this.assets = data['result'];
		this.loading = false;
	});
  }

	getItems(ev: any) {
	
		// Reset items back to all of the items
		this.initialized();

		// set val to the value of the searchbar
		let val = ev.target.value;
	
		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.assets = this.assets.filter((item) => {
				return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
			});
			
		}
	}
	
	
	goSingleAsset(service_tag)
	{
		this.navCtrl.push(AssetSinglePage, {
			service_tag: service_tag,
		});
	}
}
