
/**
 * 移除输入params中的'空值'.
 * 所谓'空值'是指 undefined, null 或者 ''(空字符串).
 * 
 * 方法返回清理过的的object.
 */
export function removeEmptyParams(params: any) {
    const result: any = {};
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var element = params[key];
            if (element !== undefined && element !== null && element !== '')
                result[key] = element;
        }
        return result;
    }
}