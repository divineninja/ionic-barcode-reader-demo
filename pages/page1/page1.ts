import { Component } from '@angular/core';
import { AssetServices } from '../../providers/asset-services';
import { GroupListPage } from '../group-list/group-list';
import { CreatePage } from '../create/create';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {
  
  public brands: any;
  
  public departments: any;
  public locations: any;
  
  // nav controllers
  public key: any;
  public table: any;

  constructor(public navCtrl: NavController, public AssetServices: AssetServices) {}

  ionViewDidLoad(){
	this.key = 'brand_id';
	this.table = 'brand';
	this.AssetServices.setValue('key', this.key);
	this.AssetServices.setValue('table', this.table);
	
	//get group by brand
	this.AssetServices.getDataByGroup()
	.then(assets => {
		this.brands = assets['result'];
		console.log(this.brands);
	});
	
	this.key = 'department_id';
	this.table = 'department';
	
	this.AssetServices.setValue('key', this.key);
	this.AssetServices.setValue('table', this.table);
	//get group by brand
	this.AssetServices.getDataByGroup()
	.then(assets => {
		this.departments = assets['result'];
	});
	
	this.key = 'floor';
	this.table = 'location';
	
	this.AssetServices.setValue('key', this.key);
	this.AssetServices.setValue('table', this.table);
	//get group by brand
	this.AssetServices.getDataByGroup()
	.then(assets => {
		this.locations = assets['result'];
	});
	
	
  }
  
  go_to(key, table, title, field)
  {
	this.navCtrl.push(GroupListPage, {
		key: key,
		table: table,
		field: field,
		title: title
	});
  }
  
  createNewPage(){
	  this.navCtrl.push(CreatePage, {});
  }
	
}
