import StateUnion from '../unions/state';
import Mart from '../mart';

export default class Effect {
	constructor (trigger, transaction) {
		this.trigger = trigger
		this.transaction = transaction

		this.mart = trigger instanceof Mart ? trigger: new Mart(trigger)
		this.mart.on(() => this.transaction.execute(this.mart.value))
	}

	end () {
		this.mart.end()
	}
}

StateUnion.registerClass(Effect)