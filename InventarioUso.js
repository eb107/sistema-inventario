// Função para buscar dados
async function fetchInventarioUso(tipo = '') {
    try {
        const container = document.getElementById('container');
        container.innerHTML = '';

        let endpoint = 'http://localhost:3000/api/somauso';
        if (tipo === 'supervisor') {
            endpoint = 'http://localhost:3000/api/supervisor';
        } else if (tipo === 'consultor') {
            endpoint = 'http://localhost:3000/api/consultor';
        } else if (tipo === 'back') {
            endpoint = 'http://localhost:3000/api/back';
        }

        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error('Erro ao acessar a API');
        }

        const data = await response.json();

        const titulo = document.createElement('h2');
        titulo.textContent = 'Equipamentos em uso';
        container.appendChild(titulo);

        const divDescricao = document.createElement('div');
        divDescricao.className = 'descricao';
        const pNome = document.createElement('p');
        pNome.className = 'nome';
        pNome.textContent = 'Nome';
        const pQtd = document.createElement('p');
        pQtd.className = 'qtd';
        pQtd.textContent = 'QTD';
        divDescricao.appendChild(pNome);
        divDescricao.appendChild(pQtd);
        container.appendChild(divDescricao);

        if (data.length === 0) {
            const mensagem = document.createElement('p');
            mensagem.textContent = 'Nenhum ítem cadastrado!';
            container.appendChild(mensagem);
        } else {
            data.forEach(item => {
                const divContainerUso = document.createElement('div');
                divContainerUso.className = 'containerUso';

                const divInvent = document.createElement('div');
                divInvent.className = 'divInvent';
                const divItem = document.createElement('div');
                divItem.className = 'divItem';
                divItem.textContent = item.item;
                const divQuantItem = document.createElement('div');
                divQuantItem.className = 'divQuantItem';
                divQuantItem.textContent = item.total_quantidade;

                divInvent.appendChild(divItem);
                divInvent.appendChild(divQuantItem);
                divContainerUso.appendChild(divInvent);

                container.appendChild(divContainerUso);
            });
        }

    } catch (error) {
        console.error('Erro:', error);
        const container = document.getElementById('container');
        container.innerHTML = '<p>Erro ao carregar os dados.</p>';
    }
}

// Quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const selectTipo = document.getElementById('container_tipo');

    // Carrega todos inicialmente
    fetchInventarioUso();

    // Muda conforme seleção do select
    selectTipo.addEventListener('change', (event) => {
        const tipoSelecionado = event.target.value.toLowerCase();
        fetchInventarioUso(tipoSelecionado);
    });
});
