import * as _chain from "as-chain";
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


class initpoolAction implements _chain.Packer {
    constructor (
        public from: _chain.Name | null = null,
        public poolName: string = "",
    ) {
    }

    pack(): u8[] {
        let enc = new _chain.Encoder(this.getSize());
        enc.pack(this.from!);
        enc.packString(this.poolName);
        return enc.getBytes();
    }
    
    unpack(data: u8[]): usize {
        let dec = new _chain.Decoder(data);
        
        {
            let obj = new _chain.Name();
            dec.unpack(obj);
            this.from! = obj;
        }
        this.poolName = dec.unpackString();
        return dec.getPos();
    }

    getSize(): usize {
        let size: usize = 0;
        size += this.from!.getSize();
        size += _chain.Utils.calcPackedStringLength(this.poolName);
        return size;
    }
}

export function apply(receiver: u64, firstReceiver: u64, action: u64): void {
	const _receiver = new _chain.Name(receiver);
	const _firstReceiver = new _chain.Name(firstReceiver);
	const _action = new _chain.Name(action);

	const mycontract = new happyg(_receiver, _firstReceiver, _action);
	const actionData = _chain.readActionData();

	if (receiver == firstReceiver) {
		if (action == 0x74DD9AD291000000) {//initpool
            const args = new initpoolAction();
            args.unpack(actionData);
            mycontract.initpool(args.from!,args.poolName);
        }
	}
  
	if (receiver != firstReceiver) {
		
	}
	return;
}
