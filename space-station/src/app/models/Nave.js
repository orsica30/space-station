class Tipo {
  constructor(tipo) {
    this._tipo = tipo;
  }
  get tipo() {
    return this._tipo;
  }
  set tipo(tipo) {
    this._tipo = tipo;
  }
  toString() {
    return `El tipo de vehículo ${this.tipo}, `;
  }
}

export class Nave extends Tipo {
  constructor(tipo, nombre, peso, empuje, combustible, pais) {
    super(tipo);
    this._nombre = nombre;
    this._peso = peso;
    this._empuje = empuje;
    this._combustible = combustible;
    this._pais = pais;
  }
  get nombre() {
    return this._nombre;
  }
  set nombre(nombre) {
    this._nombre = nombre;
  }
  get peso() {
    return this._peso;
  }
  set peso(peso) {
    this._peso = peso;
  }
  get empuje() {
    return this._empuje;
  }
  set empuje(empuje) {
    this._empuje = empuje;
  }
  get combustible() {
    return this._combustible;
  }
  set combustible(combustible) {
    this._combustible = combustible;
  }
  get pais() {
    return this._pais;
  }
  set pais(pais) {
    this._pais = pais;
  }

  mostarTodo() {
    return `de nombre ${this.nombre} tiene un peso de ${this.peso} T, un empuje de ${this.empuje} T, adicionalmente el combustible que maneja es ${this.combustible}, esta nave es proveniente de ${this.pais}.`;
  }
  toString() {
    return `${super.toString()}${this.mostarTodo()}`;
  }
}
