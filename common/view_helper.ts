import { Injectable }                           from '@angular/core';
import { Router, UrlTree, NavigationExtras }    from '@angular/router';
import { Title }                                from '@angular/platform-browser';

import { Toast }                                from './toast';
import { Loading }                              from './loading';

/**
 * ViewHelper:
 * 
 * 提供一些通用的界面行为.
 * 例如: 设置标题, 重定向(replate), 错误捕获(defaultCatch)等.
 */
@Injectable()
export class ViewHelper {
    constructor(
        private _title: Title,
        private _router: Router
    ){
    }

    /**
     * 显示一个Toast
     */
    showToast(title: string, duration?: number | 'long' | 'short' | 'normal') {
        return Toast.show(title, duration);
    }

    /**
     * 显示Loading
     */
    showLoading<T>(p: Promise<T>, title?: string) {
        return Loading.waitFor(p, title);
    }

    defaultCatch(e: any) {
        // if (e && e.redirectToForeign) {
        //     location.replace(e.redirectToForeign);
        //     return new Promise<any>((resolve, reject) => { });
        // }

        // if (e && e.redirectTo) {
	    //     return this.redirectByUrl(e.redirectTo);
        // }

        let errMsg = (typeof (e) == 'string' && e)
            || (e && e.errMsg)
            || (e && e.exceptionMessage)
            || (e && e.message);

        errMsg = errMsg || '系统繁忙, 请稍候再试';
        return Toast.show('操作失败: ' + errMsg);
    }

    /**
     * 设置标题.
     */
    setTitle(s: string){
        this._title.setTitle(s);

        //
        // HACK:
        //
        // 微信iOS端的bug, 标题栏只有在页面刷新的时候才会刷新.
        // 因此使用js插入一个隐藏的iframe模拟页面刷新.
        // 
        var body = document.querySelector('.app-wrapper');
        var iframe = document.createElement('iframe');

        iframe.onload = () => {
            setTimeout(() => {
             iframe.remove();
            }, 100);
        };

        iframe.src = '/favicon.ico';
        iframe.className = 'hidden';
        iframe.style.position = 'absolute';
        iframe.style.height = '0';
        iframe.style.width = '0';
        iframe.style.visibility = 'hidden';
        iframe.style.overflow = 'hidden';
        body.appendChild(iframe);

        return Promise.resolve(s);
    }
    
    back(){
        history.back();
        return Promise.resolve();
    }
}