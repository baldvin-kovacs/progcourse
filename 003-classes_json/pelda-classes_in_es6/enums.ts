enum Tipus {
    Szemelyauto,
    Busz,
}

class SzallitoEszkoz {
    constructor(readonly tipus: Tipus) {}
}

const sz = new SzallitoEszkoz(Tipus.Busz);
console.log(sz);
