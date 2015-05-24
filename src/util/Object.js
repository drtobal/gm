Util.Object = new function () {
    this.extend = function (a, b) {
        for (var attrname in b) {
            a[attrname] = b[attrname];
        }
        return a;
    };
};