class VagaView {
    constructor(elemento) {
        this._elemento = elemento;
    }

    _template(vagas) {
        if (vagas.length === 0) {
            return `
                <div class="sem-vagas">
                    <p>Nenhuma vaga encontrada.</p>
                </div>
            `;
        }

        return `
            <div class="vagas-grid">
                ${vagas.map(vaga => `
                    <div class="vaga-card ${vaga.ocupada ? 'ocupada' : 'disponivel'}">
                        <div class="vaga-header">
                            <h3>Vaga ${vaga.numeroVaga}</h3>
                            <span class="vaga-status ${vaga.ocupada ? 'status-ocupada' : 'status-disponivel'}">
                                ${vaga.ocupada ? 'Ocupada' : 'Disponível'}
                            </span>
                        </div>
                        
                        ${vaga.ocupada ? `
                            <div class="vaga-info"><strong>Placa:</strong> ${vaga.placa}</div>
                            <div class="vaga-info"><strong>Proprietário:</strong> ${vaga.proprietario}</div>
                            <div class="vaga-info"><strong>Apartamento:</strong> ${vaga.apartamento} - Bloco ${vaga.bloco}</div>
                            <div class="vaga-info"><strong>Veículo:</strong> ${vaga.modelo} - ${vaga.cor}</div>
                        ` : ''}
                        
                        <div class="vaga-actions">
                            ${vaga.ocupada ? 
                                `<button class="btn btn-success liberar-vaga" data-id="${vaga.id}">Liberar Vaga</button>` : 
                                `<button class="btn btn-primary ocupar-vaga" data-id="${vaga.id}">Ocupar Vaga</button>`
                            }
                            <button class="btn btn-danger remover-vaga" data-id="${vaga.id}">Remover</button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    update(vagas) {
        this._elemento.innerHTML = this._template(vagas);
        this._registrarEventos(vagas);
    }

    _registrarEventos(vagas) {
        // Adicionar eventos aos botões de liberar vaga
        const botoesLiberar = this._elemento.querySelectorAll('.liberar-vaga');
        botoesLiberar.forEach(botao => {
            botao.addEventListener('click', event => {
                const id = event.target.getAttribute('data-id');
                const evento = new CustomEvent('liberarVaga', { detail: id });
                this._elemento.dispatchEvent(evento);
            });
        });

        // Adicionar eventos aos botões de ocupar vaga
        const botoesOcupar = this._elemento.querySelectorAll('.ocupar-vaga');
        botoesOcupar.forEach(botao => {
            botao.addEventListener('click', event => {
                const id = event.target.getAttribute('data-id');
                const evento = new CustomEvent('ocuparVaga', { detail: id });
                this._elemento.dispatchEvent(evento);
            });
        });

        // Adicionar eventos aos botões de remover vaga
        const botoesRemover = this._elemento.querySelectorAll('.remover-vaga');
        botoesRemover.forEach(botao => {
            botao.addEventListener('click', event => {
                const id = event.target.getAttribute('data-id');
                const evento = new CustomEvent('removerVaga', { detail: id });
                this._elemento.dispatchEvent(evento);
            });
        });
    }
}