export declare class Predicate {
    static PREDICATES: string[];
    static factory(predicate: any, field: any, value: any): any;
    static matches(field: any, value: any): (data: any) => any;
    static not_matches(field: any, value: any): boolean;
    static in(field: any, value: any): (data: any) => any;
    static not_in(field: any, value: any): boolean;
    static eq(field: any, value: any): (data: any) => boolean;
    static not_eq(field: any, value: any): (data: any) => boolean;
    static gte(field: any, value: any): (data: any) => boolean;
    static gt(field: any, value: any): (data: any) => boolean;
    static lte(field: any, value: any): (data: any) => boolean;
    static lt(field: any, value: any): (data: any) => boolean;
    static cont(field: any, value: any): (data: any) => any;
    static not_cont(field: any, value: any): (data: any) => boolean;
}
export default Predicate;
