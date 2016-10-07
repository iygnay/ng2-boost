
import { enableProdMode  }          from '@angular/core';
import { platformBrowserDynamic }   from '@angular/platform-browser-dynamic';

// 引导启动模块.
import { Ng2UtilsAppModule } from './module';

enableProdMode();
platformBrowserDynamic().bootstrapModule(Ng2UtilsAppModule);