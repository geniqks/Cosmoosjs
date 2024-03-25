import type { GuardAbstract } from 'src/guards';

export type GuardsType<T extends GuardAbstract = any> = new () => T;
