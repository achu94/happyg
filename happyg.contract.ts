import { Contract, TableStore, Singleton, requireAuth, Name } from 'proton-tsc';
import { Pools, Global } from './happyg.tables';

@contract
export class happyg extends Contract {
    contract: Name = this.receiver;

    // globalSingleton: Singleton<Global> = new Singleton<Global>(this.receiver);
    pools: TableStore<Pools> = new TableStore<Pools>(this.receiver);
    globalSingleton: Singleton<Global> = new Singleton<Global>(this.receiver);

    @action('initpool')
    initpool(from: Name, poolName: string): void {
        requireAuth(this.receiver);

        // 1. skip handling for outgoing transfers as notifications are also provided for outgoing transfers
        if (from == this.contract) return;

        const global = this.globalSingleton.get();
        const poolNumber = global.id;

        const refreshRateInHours: u32 = 24;
        const pool = new Pools(poolNumber, poolName, refreshRateInHours);
        pool.poolNumber++;

        this.pools.store(pool, this.contract);
    }
}
