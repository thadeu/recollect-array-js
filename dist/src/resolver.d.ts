export declare const WILDCARD = "*";
export declare type Resolved = {
    fanned: boolean;
    values: any[];
};
export declare const resolve: (data: any, path: any) => Resolved;
export declare const somewhere: (data: any, path: any, matcher: (target: any) => boolean) => boolean;
export default resolve;
