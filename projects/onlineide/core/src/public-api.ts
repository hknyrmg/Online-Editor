/*
 * Public API Surface of core
 */


export * from './lib/core.module';



export {ProxyCallingTypes} from './lib/Services/proxy-service/enum/proxy-calling-types.enum';
export {ProxyContentTypes} from './lib/Services/proxy-service/enum/proxy-content-types.enum';
export {ProxyManager} from './lib/Services/proxy-service/proxy-manager.service';

export {LoaderService} from './lib/Services/loader-service/loader.service';
export {ChangeClassDirective} from './lib/Directives/change-class.directive';

export {RouteManagerService} from './lib/Services/router-service/route-manager.service'