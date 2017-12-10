class Auto {
    public isBusz: boolean;
    constructor(readonly num_passengers: number) {
	if (num_passengers <= 9) {
	    this.isBusz = false;
	} else {
	    this.isBusz = true;
	}
    }
}

class Trabant extends Auto {
    constructor() {
	super(4);
    }
}

const t = new Trabant();
console.log(t);
