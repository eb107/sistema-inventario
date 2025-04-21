
function fetchItensUso() {
    fetch('http://localhost:3000/api/listauso')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede');
            }
            return response.json();
        })
        .then(data => {
            const inventoryTable = document.getElementById('inventoryTable');

            inventoryTable.innerHTML = '';

            const titulo = document.createElement('h2');
            titulo.textContent = 'Ítens em uso';

            inventoryTable.appendChild(titulo);
            
            if (data.length === 0) {
                const mensagem = document.createElement('p');
                mensagem.textContent = 'Nenhum ítem cadastrado';
                inventoryTable.appendChild(mensagem);
            } else {
                data.forEach(uso => {
                    console.log(uso)

                        const containerItem = document.createElement('div');
                        containerItem.className = 'containerItem';

                        const divItem = document.createElement('div');
                        divItem.className = 'item';
                        divItem.textContent = uso.item;

                        const divQuantItem = document.createElement('div');
                        divQuantItem.className = 'divQuantItem';
                        divQuantItem.textContent = uso.quantidade;

                        const divLinkLixeira = document.createElement('div');
                        divLinkLixeira.className = 'divLinkLixeira';
                        const linkLixeira = document.createElement('a');
                        const imagemLinkLixeira = document.createElement('img');
                        imagemLinkLixeira.className = 'imgLixeira';
                        imagemLinkLixeira.src = './images/pngtree-trash-can-icon-png-image_13851979-removebg-preview.png';
                        linkLixeira.appendChild(imagemLinkLixeira);
                        divLinkLixeira.appendChild(linkLixeira);

                        function confirmarExclusao(id) {
                            const confirmar = confirm('Deseja deletar o ítem?');

                            if (confirmar) {
                                fetch(`http://localhost:3000/api/deletaruso/${id}`, {
                                    method: 'DELETE'
                                })
                                .then(response => {
                                    if (!response.ok) {
                                        throw new Error('Erro ao deletar o ítem!');
                                    }
                                    return response.json();
                                })
                                .then(data => {
                                    fetchItensUso();
                                })
                                .catch(error => {
                                    console.error('Erro', error);
                                    alert('Ocorreu um erro ao tentar deletar o item!');
                                });
                            }
                        }

                        imagemLinkLixeira.addEventListener('click', function() {
                            confirmarExclusao(uso.id);
                        });

                        containerItem.appendChild(divItem);
                        containerItem.appendChild(divQuantItem);
                        containerItem.appendChild(divLinkLixeira);

                        inventoryTable.appendChild(containerItem);
                    
                });
            }
        })
        .catch(error => console.error('Erro:', error));
}

document.addEventListener('DOMContentLoaded', fetchItensUso);