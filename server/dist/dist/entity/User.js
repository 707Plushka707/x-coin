"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
        r = Reflect.decorate(decorators, target, key, desc);
    else
        for (var i = decorators.length - 1; i >= 0; i--)
            if (d = decorators[i])
                r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
        return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Country = void 0;
const typeorm_1 = require("typeorm");
let Country = class Country {
};
__decorate([
    typeorm_1.PrimaryColumn({ name: 'Code' }),
    __metadata("design:type", String)
], Country.prototype, "code", void 0);
__decorate([
    typeorm_1.Column({ name: 'Name' }),
    __metadata("design:type", String)
], Country.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ name: 'Continent' }),
    __metadata("design:type", String)
], Country.prototype, "continent", void 0);
__decorate([
    typeorm_1.Column({ name: 'SurfaceArea' }),
    __metadata("design:type", String)
], Country.prototype, "surfaceArea", void 0);
__decorate([
    typeorm_1.Column({ name: 'IndepYear' }),
    __metadata("design:type", String)
], Country.prototype, "indepYear", void 0);
__decorate([
    typeorm_1.Column({ name: 'Population' }),
    __metadata("design:type", String)
], Country.prototype, "population", void 0);
Country = __decorate([
    typeorm_1.Entity('country')
], Country);
exports.Country = Country;
