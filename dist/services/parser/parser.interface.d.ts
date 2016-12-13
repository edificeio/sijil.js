export declare class ParserError extends Error {
    message: string;
    fragment: string;
    constructor(message: string, fragment: string);
}
export declare type ParserCallback = (_: ParserError) => string;
export declare abstract class Parser {
    compile: (text: string, parameters: any, error?: ParserCallback) => string;
}
