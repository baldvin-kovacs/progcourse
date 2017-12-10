class Jarmu {
    public kerekekSzama: number;
    private mukodik: boolean;
    
    constructor(n: number) {
	this.kerekekSzama = n;
	this.mukodik = true;
    }

    elront() {
	this.mukodik = false;
    }
}

const a = new Jarmu(3);
a.elront();
console.log(a);
