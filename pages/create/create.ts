import { Component } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { LoadingController } from 'ionic-angular';
import { CreateProvider } from '../../providers/create-provider';
import { AlertController } from 'ionic-angular';
import { TypeOptionsPage } from '../type-options/type-options';

// import { LocalNotifications } from 'ionic-native';
/*
  Generated class for the Create page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-create',
  templateUrl: 'create.html'
})

export class CreatePage {
	
	// form models
	public service_tag: any;
	public asset_tag: any;
	public location: any;
	public type: any;
	public brand: any;
	public model: any;
	public location_id: any;
	public employee: any;
	public department: any;
	public status: any;
	
	// select
	public typeSelect: any;
	public brandSelect: any;
	public locationSelect: any;
	public departmentSelect: any;
	public statusSelect: any;
	public employeeSelect: any;
	
	// options conversions
	
	
	constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public CreateProvider: CreateProvider, public alertCtrl: AlertController, public modalCtrl: ModalController) {
		//get asset_type
		
		this.CreateProvider.getField('location', 'station_no').then(data => {this.locationSelect = data;});
		
		this.CreateProvider.getField('employee', 'emp_id').then(data => {this.employeeSelect = data;});
		
		this.evaluateVal(navParams.get('barcode_text'))
	}

	ionViewDidLoad() {
		this.model = '9020';
		this.employee = 1;
		//type
		this.CreateProvider.getField('asset_type','type_name').then(data => {
			this.typeSelect = data;
			var type = this.typeSelect.filter((item) => {
				return (item.default == 1);
			});
			this.type = type[0].default;
		});
		// brand
		this.CreateProvider.getField('brand', 'brand_name').then(data => {
			this.brandSelect = data;
			var type = this.brandSelect.filter((item) => {
				return (item.default == 1);
			});
			this.brand = type[0].default;
		});
		
		this.CreateProvider.getField('department', 'department').then(data => {
			this.departmentSelect = data;
			var type = this.departmentSelect.filter((item) => {
				return (item.default == 1);
			});
			this.department = type[0].default;
		});
		
		this.CreateProvider.getField('status').then(data => {
			this.statusSelect = data;
			var type = this.statusSelect.filter((item) => {
				return (item.default == 1);
			});
			this.status = type[0].default;
		});	
	}
	
	showBarcode(event) {
		BarcodeScanner.scan({
			orientation: 'portrait'
		}).then((barcodeData) => {
			// Success! Barcode data is here
			if(barcodeData.text) { 
				var loading = this.presentLoadingDefault();
				this.evaluateVal(barcodeData.text);
				loading.dismiss();
			}
		}, (err) => {
			alert(err)
			// An error occurred
		});
	}
  
	presentLoadingDefault() {
		let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

		return loading;
	}
	
	evaluateVal(input) {
		var barcodeInput = parseInt(input);
	
		if(barcodeInput == input) {
			this.asset_tag = input;
		} else {
			this.service_tag = input;
		}
	}
	
	saveAsset($event) {
	
		var fields = {
			asset_tag: this.asset_tag,
			service_tag: this.service_tag,
			model: this.model,
			type_id: this.type,
			brand_id: this.brand,
			location_id: this.location_id,
			employee_id: this.employee,
			department_id: this.department,
			status_id: this.status
		}
		
		this.CreateProvider.setFields(fields);
		
		this.CreateProvider.saveAsset()
		.then(data => {
			if(data) { 
				this.presentAlert('Success', 'Done creating another asset ('+this.asset_tag+')');
				this.service_tag = '';
				this.asset_tag = '';
				this.location = '';
			}else {
				this.presentAlert('Error', 'Cannot proceed at this time, please try again.');
			} 
		});	
	}
	
	presentAlert(title, description) {
	  let alert = this.alertCtrl.create({
		title: title,
		subTitle: description,
		buttons: ['OK']
	  });
	  alert.present();
	}
	
	// show options
	showModalOptions(optionModelRaw, optionModelName) { 	
		let typeOptionsModal = this.modalCtrl.create(TypeOptionsPage, {optionModel: this[optionModelRaw+'Select'], 'optionModelName': optionModelName});
		typeOptionsModal.onDidDismiss(data => {
			if(data){
				this[optionModelRaw+'_id'] = data[optionModelRaw+'_id'];
				this[optionModelRaw] = data[optionModelName]; 
			}
		});
		typeOptionsModal.present();
	}
}