import {} from "route-recognizer";
declare class Transition {}

interface IRouterOptions {
    // we don't support string based handler matching, but only passthru
    // and the user must give us this kind of getHandler
    getHandler<T extends IHandler<any, any, any>>(handler: T): T;
    
    updateURL(url: string): void;
}

declare class Router {
  constructor(options: IRouterOptions);
  map(mapper: (matcher: typeof match) => void): void;
}

declare function to(handler: IHandler<any, any, any>, nested?: (matcher: typeof match) => void): void;
declare function match(path: string): { to: typeof to };

export { Router as default, Transition };

export interface IHandler<P, M, S> {
  model(params: P): Promise<M>;
  serialize(model: M): P;
  enter(): void;
  setup(model: M): void;
}
