
function adicionarItem() {
    document.getElementById('container').addEventListener('submit', function(event) {
        event.preventDefault();

        const item = document.getElementById('item').value;
        const quantidade = document.getElementById('quantidade').value;

        fetch('http://localhost:3000/api/desuso', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ item, quantidade })
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            document.getElementById('container').reset();
            fetchItensUso();
        })
        .catch(error => console.error('Erro', error));
    });
}