export declare class Predicate {
    static PREDICATES: string[];
    static factory(predicate: any, field: any, value: any): any;
    static matches(field: any, value: any): (data: any) => any;
    static not_matches(field: any, value: any): boolean;
    static exists(field: any, value: any): (data: any) => any;
    static not_exists(field: any, value: any): (data: any) => any;
    static ex(field: any, value: any): (data: any) => any;
    static not_ex(field: any, value: any): (data: any) => any;
    static in(field: any, value: any): (data: any) => any;
    static not_in(field: any, value: any): (data: any) => boolean;
    static eq(field: any, value: any): (data: any) => boolean;
    static not_eq(field: any, value: any): (data: any) => boolean;
    static gte(field: any, value: any): (data: any) => boolean;
    static gt(field: any, value: any): (data: any) => boolean;
    static lte(field: any, value: any): (data: any) => boolean;
    static lt(field: any, value: any): (data: any) => boolean;
    static cont(field: any, value: any): (data: any) => boolean;
    static not_cont(field: any, value: any): (data: any) => boolean;
    static starts_with(field: any, value: any): (data: any) => boolean;
    static not_starts_with(field: any, value: any): (data: any) => boolean;
    static st(field: any, value: any): (data: any) => boolean;
    static not_st(field: any, value: any): (data: any) => boolean;
}
export default Predicate;
