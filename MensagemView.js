class MensagemView {
    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(mensagem, tipo) {
        if (!mensagem) return '';
        
        return `
            <div class="mensagem mensagem-${tipo}">
                ${mensagem}
            </div>
        `;
    }

    update(mensagem, tipo = 'sucesso') {
        this._elemento.innerHTML = this._template(mensagem, tipo);
        
        if (mensagem) {
            setTimeout(() => {
                this._elemento.innerHTML = '';
            }, 3000);
        }
    }
}