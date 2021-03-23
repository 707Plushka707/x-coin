"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FundingFee = void 0;
const typeorm_1 = require("typeorm");
let FundingFee = class FundingFee {
};
__decorate([
    typeorm_1.PrimaryColumn(),
    __metadata("design:type", String)
], FundingFee.prototype, "tranId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FundingFee.prototype, "symbol", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FundingFee.prototype, "income", void 0);
__decorate([
    typeorm_1.Column({ type: 'bigint' }),
    __metadata("design:type", Number)
], FundingFee.prototype, "time", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FundingFee.prototype, "cny", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FundingFee.prototype, "price", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], FundingFee.prototype, "user", void 0);
FundingFee = __decorate([
    typeorm_1.Entity('funding_fee')
], FundingFee);
exports.FundingFee = FundingFee;
// import { Entity, PrimaryColumn, Column } from 'typeorm';
// @Entity('country')
// export class Country {
//   @PrimaryColumn({ name: 'Code' })
//   code!: string;
//   @Column({ name: 'Name' })
//   name!: string;
//   @Column({ name: 'Continent' })
//   continent!: string;
//   @Column({ name: 'SurfaceArea' })
//   surfaceArea!: string;
//   @Column({ name: 'IndepYear' })
//   indepYear!: string;
//   @Column({ name: 'Population' })
//   population!: string;
// }
