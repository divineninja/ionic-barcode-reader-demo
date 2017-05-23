import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
/*
  Generated class for the AssetServices provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class AssetServices {
	
	static get parameters() {
		return [[Http]];
	}
	
	public apiurl: 'http://10.212.51.86/';
	 
	constructor(@Inject(Http) private http: Http) {
		this.apiurl = 'http://10.212.51.86/';
		console.log('Asset services provider');
	}

	data = '';
	barcode = '';  
	asset = '';
	
	// get assets by goup
	key = '';
	table = '';
	assets = '';
	
	// single group query
	groupTable = '';
	groupField = '';
	groupKey = '';
	// pass query to get data from database

	load() {
		
		var action = 'assets';
		var process = 'get_asset_by';
		var item = this.getValue('asset');
		
		// var url = 'http://210.213.242.90/inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&item='+encodeURI(item);
		var url = this.apiurl+'inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&item='+encodeURI(item);
		
		// don't have the data yet
		return new Promise(resolve => {
			// We're using Angular HTTP provider to request the data,
			// then on the response, it'll map the JSON data to a parsed JS object.
			// Next, we process the data and resolve the promise with the new data.
			this.http.get(url)
			.map(res => res.json())
			.subscribe(data => {
				// we've got back the raw data, now generate the core schedule data
				// and save the data for later reference
				this.data = data;
				resolve(this.data);
			});
		});
		
	}
	
	setValue(key, value) {
		this[key] = value;
	}
	
	getValue(key) {
		return this[key]
	}
	
	fetchBarcodeData() {
		
	}
	
	getDataByGroup()
	{
		
		var action = 'assets';
		var process = 'get_assets_group_by';
		
		var key = this.getValue('key');
		var table = this.getValue('table');
		
		var url = this.apiurl+'inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&key='+encodeURI(key)+'&table='+encodeURI(table);
		
		return new Promise(resolve => {
			this.http.get(url)
			.map(res => res.json())
			.subscribe(assets => {
				this.assets = assets;
				resolve(this.assets);
			});
		});
	}
	
	getDataByGroupItem()
	{
		var action = 'assets';
		var process = 'get_assets_by_field';
		
		var value = this.getValue('groupKey');
		var field = this.getValue('groupField');
		var table = this.getValue('groupTable');
		
		var url = this.apiurl+'inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&field='+encodeURI(field)+'&table='+encodeURI(table)+'&value='+encodeURI(value);
		console.log(url);
		return new Promise(resolve => {
			this.http.get(url)
			.map(res => res.json())
			.subscribe(assets => {
				this.assets = assets;
				resolve(this.assets);
			});
		});
	}
}
