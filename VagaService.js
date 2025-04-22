class VagaService {
    constructor() {
        this._key = 'vagas';
        this._vagas = this._carregarVagas();
    }

    _carregarVagas() {
        const vagas = localStorage.getItem(this._key);
        if (!vagas) return [];

        // Converte os objetos simples para instâncias de Vaga
        return JSON.parse(vagas).map(vaga => 
            Object.assign(new Vaga(), vaga)
        );
    }

    _salvarVagas() {
        localStorage.setItem(this._key, JSON.stringify(this._vagas));
    }

    adicionarVaga(vaga) {
        this._vagas.push(vaga);
        this._salvarVagas();
    }

    listarVagas() {
        return [...this._vagas];
    }

    listarVagasOcupadas() {
        return this._vagas.filter(vaga => vaga.ocupada);
    }

    listarVagasDisponiveis() {
        return this._vagas.filter(vaga => !vaga.ocupada);
    }

    removerVaga(id) {
        const index = this._vagas.findIndex(vaga => vaga.id === id);
        if (index !== -1) {
            this._vagas.splice(index, 1);
            this._salvarVagas();
            return true;
        }
        return false;
    }

    liberarVaga(id) {
        const vaga = this._vagas.find(vaga => vaga.id === id);
        if (vaga) {
            vaga.liberarVaga();
            this._salvarVagas();
            return true;
        }
        return false;
    }

    ocuparVaga(id) {
        const vaga = this._vagas.find(vaga => vaga.id === id);
        if (vaga) {
            vaga.ocuparVaga();
            this._salvarVagas();
            return true;
        }
        return false;
    }

    // Método para carregar dados de exemplo
    carregarDadosExemplo() {
        if (this._vagas.length === 0) {
            const vagasExemplo = [
                new Vaga(null, 'ABC1234', 'João Silva', 101, 'A', 'Honda Civic', 'Prata', 1),
                new Vaga(null, 'DEF5678', 'Maria Souza', 202, 'B', 'Toyota Corolla', 'Preto', 2),
                new Vaga(null, 'GHI9012', 'Pedro Santos', 303, 'C', 'Volkswagen Golf', 'Branco', 3),
            ];
            
            // Define a última vaga como disponível
            vagasExemplo[2].liberarVaga();
            
            this._vagas = vagasExemplo;
            this._salvarVagas();
        }
    }
}
