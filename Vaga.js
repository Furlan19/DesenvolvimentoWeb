class Vaga {
    constructor(id, placa, proprietario, apartamento, bloco, modelo, cor, numeroVaga) {
        this._id = id || this._gerarId();
        this._placa = placa;
        this._proprietario = proprietario;
        this._apartamento = apartamento;
        this._bloco = bloco;
        this._modelo = modelo;
        this._cor = cor;
        this._numeroVaga = numeroVaga;
        this._dataRegistro = new Date();
        this._ocupada = true;
    }

    _gerarId() {
        return Math.random().toString(36).substr(2, 9);
    }

    get id() {
        return this._id;
    }

    get placa() {
        return this._placa;
    }

    get proprietario() {
        return this._proprietario;
    }

    get apartamento() {
        return this._apartamento;
    }

    get bloco() {
        return this._bloco;
    }

    get modelo() {
        return this._modelo;
    }

    get cor() {
        return this._cor;
    }

    get numeroVaga() {
        return this._numeroVaga;
    }

    get dataRegistro() {
        return this._dataRegistro;
    }

    get ocupada() {
        return this._ocupada;
    }

    set ocupada(valor) {
        this._ocupada = valor;
    }

    liberarVaga() {
        this._ocupada = false;
    }

    ocuparVaga() {
        this._ocupada = true;
    }
}