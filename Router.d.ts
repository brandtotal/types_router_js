import { Transition } from "./Transition";

export interface IPossibleHandlers {
  [k: string]: IHandler<any, any, any>;
}

export interface IRouterOptions<P extends IPossibleHandlers, H extends keyof P> {
  getHandler(handlerName: H): P[H];
  updateURL(url: string): void;
  log?: typeof console.log;
}

export default class Router<P extends IPossibleHandlers, H extends keyof P> {
  constructor(options: IRouterOptions<P, H>);
  map(mapper: (matcher: match<P, H>) => void): void;
  handleURL(url: string): void;
  generate(name: H, ...parts: any[]): string;
  transitionTo(
    name: H,
    props?: any /* here should be the props type from the handler. but how? IPossibleHandlers[P][H] ??? */,
  ): Transition;
}

// can we make `to` more strict???
interface to<P extends IPossibleHandlers, H extends keyof P> {
  (handler: H, nested?: (matcher: match<P, H>) => void): void;
}

interface match<P extends IPossibleHandlers, H extends keyof P> {
  (path: string): { to: to<P, H> };
}

export interface IHandler<P, M, S> {
  beforeModel?(transition: Transition, params: P & { queryParams: { [x: string]: string | undefined } }): void;
  model?(params: P & { queryParams: { [x: string]: string | undefined } }): Promise<M>;
  afterModel?(model: M, transition: Transition): void;
  serialize?(model: M): P;
  // https://github.com/tildeio/router.js#entry-update-exit-hooks
  enter?(transition: Transition, donno: any): void;
  setup?(model: M): void;
  exit?(transition: Transition, donno: any): void;
}
