"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryObject = void 0;
class QueryObject {
    constructor(name, num) {
        this.name = name;
        this.num = num;
    }
    userName() {
        return this.name;
    }
    maisDez() {
        return this.num + 10;
    }
}
exports.QueryObject = QueryObject;
