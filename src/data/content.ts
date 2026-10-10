import type {Language} from './brand';
import type {Translation} from './translations';
type MediaKey=keyof Translation['alts'];
export interface Accommodation {id:string;translation:number;photos:MediaKey[];capacity:number|null;area:number|null;facilities:Record<Language,string>[];price:number|null;status:'pending'|'confirmed'}
export interface WellnessService {id:string;translation:number;photo:MediaKey;duration:number|null;price:number|null;status:'pending'|'confirmed'}
export interface PriceItem {id:string;translation:number;currency:string;amount:number|null;unit:'night'|'session'|'stay';duration:number|null;conditions:Record<Language,string>|null}
// Unconfirmed content stays null. Fill only with information approved by the owner.
export const accommodations:Accommodation[] = [
 {id:'chambres',translation:0,photos:['bedroom','architecture'],capacity:null,area:null,facilities:[],price:null,status:'pending'},
 {id:'gites',translation:1,photos:['architecture','bedroom'],capacity:null,area:null,facilities:[],price:null,status:'pending'},
];
export const services:WellnessService[] = [
 {id:'soins',translation:0,photo:'wellness',duration:null,price:null,status:'pending'},
 {id:'rituels',translation:1,photo:'olive',duration:null,price:null,status:'pending'},
 {id:'detente',translation:2,photo:'landscape',duration:null,price:null,status:'pending'},
 {id:'experiences',translation:3,photo:'hero',duration:null,price:null,status:'pending'},
];
export const pricing:PriceItem[] = [
 {id:'stay',translation:0,currency:'EUR',amount:null,unit:'night',duration:null,conditions:null},
 {id:'wellness',translation:1,currency:'EUR',amount:null,unit:'session',duration:null,conditions:null},
 {id:'packages',translation:2,currency:'EUR',amount:null,unit:'stay',duration:null,conditions:null},
];
export const gallery = [
 {image:'hero',category:'nature'}, {image:'bedroom',category:'stay'},
 {image:'wellness',category:'wellness'}, {image:'architecture',category:'living'},
 {image:'landscape',category:'nature'}, {image:'olive',category:'nature'}, {image:'village',category:'living'},
] as const;
export const destinations = [
 {name:'Nyons & Piégon',image:'olive',source:'https://www.drome-cestmanature.com/decouvrez-la-drome/villes-et-villages/des-villes-a-taille-humaine/nyons/'},
 {name:'Vaison-la-Romaine',image:'architecture',source:'https://www.vaison-ventoux-tourisme.com/'},
 {name:'Les Baronnies provençales',image:'landscape',source:'https://www.baronnies-provencales.fr/'},
] as const;
