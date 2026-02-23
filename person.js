"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Node = exports.result = exports.myFunction = exports.MyPerson = exports.Person = exports.PersonTypes = void 0;
var PersonTypes;
(function (PersonTypes) {
    PersonTypes[PersonTypes["Student"] = 0] = "Student";
    PersonTypes[PersonTypes["Teacher"] = 1] = "Teacher";
    PersonTypes[PersonTypes["Admin"] = 2] = "Admin";
})(PersonTypes || (exports.PersonTypes = PersonTypes = {}));
var Person = /** @class */ (function () {
    function Person(name, age, type) {
        this.name = name;
        this.age = age;
        this.type = type;
    }
    return Person;
}());
exports.Person = Person;
var MyPerson = /** @class */ (function (_super) {
    __extends(MyPerson, _super);
    function MyPerson(name, age, type) {
        var _this = _super.call(this, name, age, type) || this;
        _this.name = name;
        _this.age = age;
        _this.type = type;
        return _this;
    }
    return MyPerson;
}(Person));
exports.MyPerson = MyPerson;
var myFunction = function () {
    return new MyPerson("John Doe", 20, PersonTypes.Student);
};
exports.myFunction = myFunction;
exports.result = (0, exports.myFunction)();
var Node = /** @class */ (function () {
    function Node(value, next) {
        this.value = value;
        this.next = next;
    }
    return Node;
}());
exports.Node = Node;
exports.default = {
    Person: Person,
    PersonTypes: PersonTypes,
    MyPerson: MyPerson,
    myFunction: exports.myFunction,
    result: exports.result,
    Node: Node
};
