
/**
 * 移除输入params中的'空值'.
 * 所谓'空值'是指 undefined, null 或者 ''(空字符串).
 * 
 * 例如: 'a=1;b=;c=2', 其中b就是一个空值参数.
 * angular2 router在导航的时候, 会将空值参数设置为true.
 * 因此, 以上的参数, 实际导航为 'a=1;b=true;c=2'
 * 
 * 这通常不是我们想要的.
 * 此方法就是用于在导航前预处理传入的参数(params), 移除其中的空值.
 * 
 * 例如:
 * let params = {
 *     a: 1,
 *     b: '',
 *     c: 2,
 *     d: null
 * };
 * 
 * let clearedParams = removeEmptyParams(params);
 * router.navigate(['/page', clearedParams]);
 * 
 * 导航结果为: '/page;a=1;c=2', b和d被移除.
 * 
 * @param params
 */
export function removeEmptyParams(params: any) {
    let result: any = {};

    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var value = params[key];
            if (!isEmptyValue(value)) {
                result[key] = value;
            }
        }
    }

    return result;
}

function isEmptyValue(value) {
    return value === undefined || value === null || value === '';
}