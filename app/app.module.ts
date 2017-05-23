import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { CreatePage } from '../pages/create/create';
import { GroupListPage } from '../pages/group-list/group-list';
import { AssetSinglePage } from '../pages/asset-single/asset-single';
import { TypeOptionsPage } from '../pages/type-options/type-options';
import { search } from '../pages/search/search';
import { AssetServices } from '../providers/asset-services';
import { CreateProvider } from '../providers/create-provider';
import { Storage } from '@ionic/storage';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    CreatePage,
    AssetSinglePage,
    TypeOptionsPage,
    GroupListPage,
    search,
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    CreatePage,
    AssetSinglePage,
    TypeOptionsPage,
    GroupListPage,
    search,
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler}, 
    AssetServices, 
    CreateProvider,
    Storage
  ]
})
export class AppModule {}