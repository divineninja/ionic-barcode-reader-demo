import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {StatusBar, SQLite} from 'ionic-native';
import { Platform } from 'ionic-angular';

/*
  Generated class for the CreateProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class CreateProvider {
	
	public order: any;
	public apiurl: 'http://10.212.51.86/';
	public data: any;
	public fields: any;
	
  constructor(public http: Http, public platform: Platform) {
    console.log('Hello CreateProvider Provider');
	
	this.apiurl = 'http://10.212.51.86/';
	
    platform.ready().then(() => {
        StatusBar.styleDefault();
        let db = new SQLite();
        db.openDatabase({
            name: "data.db",
            location: "default"
        }).then(() => {
            db.executeSql("CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY AUTOINCREMENT, key TEXT, value TEXT)", {})
            .then((data) => {
                console.log("TABLE CREATED: ", data);
            }, (error) => {
                console.error("Unable to execute sql", error);
            })
        }, (error) => {
            console.error("Unable to open database", error);
        });
    });
	
	this.fields = {
		asset_tag: '',
		service_tag: '',
		model: '',
		type: '',
		brand: '',
		station_number: '',
		assigned: '',
		department: '',
		status: ''
	}
	
  }

  saveAsset()
  {
	var data = JSON.stringify(this.fields);
		data = btoa(data);
		
	var action = 'assets';
	var process = 'saveAsset';
	
	var url = this.apiurl+'inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&fields='+encodeURI(data);
	
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
				this.data = data['result'];
				resolve(this.data);
			});
	});
  }
  
  getField(field, order = '')
  {
	var action = 'assets';
	var process = 'get_field_by';
	var item = field;
	
	if(order == '') 
	{
		// var url = 'http://210.213.242.90/inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&item='+encodeURI(item);
		var url = this.apiurl+'inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&item='+encodeURI(item);
	} else {
		var url = this.apiurl+'inventory_api/?action='+encodeURI(action)+'&process='+encodeURI(process)+'&item='+encodeURI(item)+'&order='+order;
	}

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
				this.data = data['result'];
				resolve(this.data);
			});
	});
  }
  
  setOrder(key)
  {
	this.order = key;
  }
  
  setFields(fields)
  {
	  this.fields = fields;
  }
}
