// URL base do backend (ajuste se necessário)
const backendUrl = 'http://localhost:3000';

// Função para carregar veículos em destaque
let veiculosCache = [];

async function carregarVeiculosDestaque() {
    const container = document.getElementById('cards-veiculos-destaque');
    const filtroInput = document.getElementById('filtro-veiculos');
    container.innerHTML = '<p>Carregando veículos em destaque... <span class="spinner"></span></p>';
    try {
        const response = await fetch(`${backendUrl}/api/garagem/veiculos-destaque`);
        if (!response.ok) throw new Error('Falha ao carregar veículos em destaque.');
        const veiculos = await response.json();
        veiculosCache = veiculos; // Armazena no cache para filtro

        exibirVeiculosFiltrados('');

        // Adiciona evento para filtro
        filtroInput.oninput = () => {
            exibirVeiculosFiltrados(filtroInput.value);
        };
    } catch (error) {
        console.error("Erro carregarVeiculosDestaque:", error);
        container.innerHTML = `<p class="erro">${error.message} <button class="retry-button" id="retry-veiculos">Tentar novamente</button></p>`;
        document.getElementById('retry-veiculos').onclick = carregarVeiculosDestaque;
    }
}

function exibirVeiculosFiltrados(filtro) {
    const container = document.getElementById('cards-veiculos-destaque');
    container.innerHTML = '';
    const filtroMinusculo = filtro.toLowerCase();
    const filtrados = veiculosCache.filter(v => v.modelo.toLowerCase().includes(filtroMinusculo));
    if (filtrados.length === 0) {
        container.innerHTML = '<p>Nenhum veículo encontrado.</p>';
        return;
    }
    filtrados.forEach(veiculo => {
        const card = document.createElement('div');
        card.className = 'veiculo-card';
        card.innerHTML = `
            <img src="${veiculo.imagemUrl || 'placeholder.jpg'}" alt="${veiculo.modelo}">
            <div>
                <h3>${veiculo.modelo} (${veiculo.ano})</h3>
                <p><strong>Destaque:</strong> ${veiculo.destaque}</p>
            </div>
        `;
        // Adiciona evento para expandir detalhes ao clicar
        card.addEventListener('click', () => {
            if (card.querySelector('.detalhes')) {
                card.querySelector('.detalhes').remove();
            } else {
                const detalhes = document.createElement('div');
                detalhes.className = 'detalhes';
                detalhes.innerHTML = `
                    <p><em>Mais detalhes do veículo...</em></p>
                    <p>ID: ${veiculo.id}</p>
                    <p>Modelo: ${veiculo.modelo}</p>
                    <p>Ano: ${veiculo.ano}</p>
                    <p>Destaque: ${veiculo.destaque}</p>
                `;
                card.appendChild(detalhes);
            }
        });
        container.appendChild(card);
    });
}

// Função para carregar serviços oferecidos
async function carregarServicosGaragem() {
    const lista = document.getElementById('lista-servicos-oferecidos');
    lista.innerHTML = '<li>Carregando serviços...</li>';
    try {
        const response = await fetch(`${backendUrl}/api/garagem/servicos-oferecidos`);
        if (!response.ok) throw new Error('Falha ao carregar serviços.');
        const servicos = await response.json();

        lista.innerHTML = '';
        if (servicos.length === 0) {
            lista.innerHTML = '<li>Nenhum serviço disponível no momento.</li>';
            return;
        }
        servicos.forEach(servico => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${servico.nome}</strong>: ${servico.descricao} (Preço estimado: ${servico.precoEstimado})
            `;
            // Evento para mostrar/ocultar descrição detalhada
            item.addEventListener('click', () => {
                if (item.querySelector('.descricao-detalhada')) {
                    item.querySelector('.descricao-detalhada').remove();
                } else {
                    const desc = document.createElement('p');
                    desc.className = 'descricao-detalhada';
                    desc.textContent = `Descrição detalhada: ${servico.descricao}`;
                    item.appendChild(desc);
                }
            });
            lista.appendChild(item);
        });
    } catch (error) {
        console.error("Erro carregarServicosGaragem:", error);
        lista.innerHTML = `<li class="erro">${error.message}</li>`;
    }
}

// Função para carregar ferramentas essenciais
async function carregarFerramentasEssenciais() {
    const lista = document.getElementById('lista-ferramentas-essenciais');
    lista.innerHTML = '<li>Carregando ferramentas...</li>';
    try {
        const response = await fetch(`${backendUrl}/api/garagem/ferramentas-essenciais`);
        if (!response.ok) throw new Error('Falha ao carregar ferramentas.');
        const ferramentas = await response.json();

        lista.innerHTML = '';
        if (ferramentas.length === 0) {
            lista.innerHTML = '<li>Nenhuma ferramenta disponível no momento.</li>';
            return;
        }
        ferramentas.forEach(ferramenta => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${ferramenta.nome}</strong>: ${ferramenta.utilidade}
            `;
            // Evento para mostrar/ocultar utilidade detalhada
            item.addEventListener('click', () => {
                if (item.querySelector('.utilidade-detalhada')) {
                    item.querySelector('.utilidade-detalhada').remove();
                } else {
                    const util = document.createElement('p');
                    util.className = 'utilidade-detalhada';
                    util.textContent = `Detalhes: ${ferramenta.utilidade}`;
                    item.appendChild(util);
                }
            });
            lista.appendChild(item);
        });
    } catch (error) {
        console.error("Erro carregarFerramentasEssenciais:", error);
        lista.innerHTML = `<li class="erro">${error.message}</li>`;
    }
}

// Funções para atualizar manualmente os dados
document.getElementById('btn-refresh-veiculos').addEventListener('click', carregarVeiculosDestaque);
document.getElementById('btn-refresh-servicos').addEventListener('click', carregarServicosGaragem);
document.getElementById('btn-refresh-ferramentas').addEventListener('click', carregarFerramentasEssenciais);

// Carregar todos os dados ao carregar a página
window.addEventListener('load', () => {
    carregarVeiculosDestaque();
    carregarServicosGaragem();
    carregarFerramentasEssenciais();
});
