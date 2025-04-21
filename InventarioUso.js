
function fetchInventarioUso() {
    fetch('http://localhost:3000/api/somauso')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(data => {

            const container = document.getElementById('container')

            const titulo = document.createElement('h2');
            titulo.textContent = 'Equipamentos em uso';

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

            container.appendChild(titulo);
            container.appendChild(divDescricao);
            

            if (data.length === 0) {
                const mensagem = document.createElement('p');
                mensagem.textContent = 'Nenhum ítem cadastrado!';
                container.appendChild(mensagem);
            } else {
                data.forEach(uso => {

                    const divContainerUso = document.createElement('div');
                    divContainerUso.className = 'containerUso';

                    const divInvent = document.createElement('div');
                    divInvent.className = 'divInvent';
                    const divItem = document.createElement('div');
                    divItem.className = 'divItem';
                    divItem.textContent = uso.item;
                    const divQuantItem = document.createElement('div');
                    divQuantItem.className = 'divQuantItem';
                    divQuantItem.textContent = uso.total_quantidade;

                    divInvent.appendChild(divItem);
                    divInvent.appendChild(divQuantItem);

                    divContainerUso.appendChild(divInvent);
                   
                    container.appendChild(divContainerUso);
                })
            }
        })
        .catch(error => console.error('Erro:', error));
}
document.addEventListener('DOMContentLoaded', fetchInventarioUso);