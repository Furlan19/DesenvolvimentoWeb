class VagaController {
    constructor() {
        this._service = new VagaService();
        
        // Carrega dados de exemplo se necessário
        this._service.carregarDadosExemplo();
        
        // Elementos da página de listagem
        this._vagasContainer = document.getElementById('vagas-container');
        this._mensagemElement = document.getElementById('mensagem-view');
        
        if (this._vagasContainer) {
            this._vagaView = new VagaView(this._vagasContainer);
            this._mensagemView = new MensagemView(this._mensagemElement);
            
            // Inicializa a visualização
            this._atualizarListaVagas();
            
            // Registra eventos de filtro
            this._registrarEventosFiltro();
            
            // Registra eventos da view
            this._registrarEventosView();
        }
        
        // Elementos da página de cadastro
        this._formVaga = document.getElementById('form-vaga');
        
        if (this._formVaga) {
            this._mensagemView = new MensagemView(this._mensagemElement);
            this._registrarEventosFormulario();
        }
    }
    
    _atualizarListaVagas(filtro = 'todas') {
        let vagas;
        
        switch (filtro) {
            case 'ocupadas':
                vagas = this._service.listarVagasOcupadas();
                break;
            case 'disponiveis':
                vagas = this._service.listarVagasDisponiveis();
                break;
            default:
                vagas = this._service.listarVagas();
        }
        
        this._vagaView.update(vagas);
    }
    
    _registrarEventosFiltro() {
        const btnTodas = document.getElementById('todas-vagas');
        const btnOcupadas = document.getElementById('vagas-ocupadas');
        const btnDisponiveis = document.getElementById('vagas-disponiveis');
        
        if (btnTodas && btnOcupadas && btnDisponiveis) {
            btnTodas.addEventListener('click', () => {
                this._atualizarBotoesFiltro(btnTodas);
                this._atualizarListaVagas('todas');
            });
            
            btnOcupadas.addEventListener('click', () => {
                this._atualizarBotoesFiltro(btnOcupadas);
                this._atualizarListaVagas('ocupadas');
            });
            
            btnDisponiveis.addEventListener('click', () => {
                this._atualizarBotoesFiltro(btnDisponiveis);
                this._atualizarListaVagas('disponiveis');
            });
        }
    }
    
    _atualizarBotoesFiltro(botaoAtivo) {
        const botoes = [
            document.getElementById('todas-vagas'),
            document.getElementById('vagas-ocupadas'),
            document.getElementById('vagas-disponiveis')
        ];
        
        botoes.forEach(btn => {
            if (btn === botaoAtivo) {
                btn.classList.add('btn-primary');
                btn.classList.remove('btn');
            } else {
                btn.classList.remove('btn-primary');
                btn.classList.add('btn');
            }
        });
    }
    
    _registrarEventosView() {
        this._vagasContainer.addEventListener('liberarVaga', event => {
            const id = event.detail;
            if (this._service.liberarVaga(id)) {
                this._mensagemView.update('Vaga liberada com sucesso!');
                this._atualizarListaVagas();
            } else {
                this._mensagemView.update('Erro ao liberar vaga.', 'erro');
            }
        });
        
        this._vagasContainer.addEventListener('ocuparVaga', event => {
            const id = event.detail;
            if (this._service.ocuparVaga(id)) {
                this._mensagemView.update('Vaga ocupada com sucesso!');
                this._atualizarListaVagas();
            } else {
                this._mensagemView.update('Erro ao ocupar vaga.', 'erro');
            }
        });
        
        this._vagasContainer.addEventListener('removerVaga', event => {
            const id = event.detail;
            if (this._service.removerVaga(id)) {
                this._mensagemView.update('Vaga removida com sucesso!');
                this._atualizarListaVagas();
            } else {
                this._mensagemView.update('Erro ao remover vaga.', 'erro');
            }
        });
    }
    
    _registrarEventosFormulario() {
        this._formVaga.addEventListener('submit', event => {
            event.preventDefault();
            
            const vaga = this._criarVagaDoFormulario();
            
            // Log das informações do formulário
            console.log('Dados da vaga cadastrada:', {
                placa: vaga.placa,
                proprietario: vaga.proprietario,
                apartamento: vaga.apartamento,
                bloco: vaga.bloco,
                modelo: vaga.modelo,
                cor: vaga.cor,
                numeroVaga: vaga.numeroVaga
            });
            
            this._service.adicionarVaga(vaga);
            this._mensagemView.update('Vaga cadastrada com sucesso!');
            this._formVaga.reset();
            
            // Exibe um alerta após o cadastro
            alert('Cadastro realizado com sucesso!');
        });
    }
    
    _criarVagaDoFormulario() {
        const placa = document.getElementById('placa').value;
        const proprietario = document.getElementById('proprietario').value;
        const apartamento = document.getElementById('apartamento').value;
        const bloco = document.getElementById('bloco').value;
        const modelo = document.getElementById('modelo').value;
        const cor = document.getElementById('cor').value;
        const numeroVaga = document.getElementById('numeroVaga').value;
        
        return new Vaga(
            null,
            placa,
            proprietario,
            apartamento,
            bloco,
            modelo,
            cor,
            numeroVaga
        );
    }
}