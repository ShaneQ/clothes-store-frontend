import {Image} from './image';
import {ProductMeasurement} from './productMeasurement';
import {Size} from "./size";

export class Product {
  constructor(
    public id: number,
    public name: string,
    public quickDesc: string,
    public material: string,
    public fittingInfo: string,
    public washInfo: string,
    public description: string,
    public dryClean: boolean,
    public measurements: ProductMeasurement,
    public imgCover: Image,
    public images: Image[],
    public sizes: Size[]
  ) { }
}
