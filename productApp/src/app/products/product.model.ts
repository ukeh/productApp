export class IProduct{
    constructor(
        public productId:number,
        public productName:String,
        public productCode:string,
        public releaseDate:String,
        public description:String,
        public price:number,
        public starRating:number,
        public imageUrl:String

    ){}
}