let produtosCarrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
let totalValor = 0;

function adicionar(nomeProduto, precoProduto) {
    const product = { produto: nomeProduto, preco: precoProduto };


    Swal.fire({
        title: "Que legal!",
        text: `voce adicionou ${nomeProduto} - R$${precoProduto},00 ao carrinho`,
        icon: "sucess"
    }).then((result) => {
        if (result.isConfirmed) {
            produtosCarrinho.push(product);
            localStorage.setItem('carrinho', JSON.stringify(produtosCarrinho));
        }
    });
    function mostrarCarrinho() {
        if (produtosCarrinho.lenght === 0) {
            Swal.fire({
                title: "Carrinho Vazio",
                text: "Seu carrinho esta vazio!",
                icon: "info"
            });
        } else {
            const listaProdutos = ListaProdutos();

            Swal.fire({
                title: "seu carrinh",
                icon: "info",
                confirmButtonText: "finalizar compra",
                showCancelButton: true,
                html:
                    <table>
                        <tr><th>nome</th><th>valor</th></tr>
                        ${listaProdutos}
                        <tr><td><strong>Total:</strong></td></tr><strong>R$ ${totalValor},00</strong>
                    </table>
            }).then((result) => {
                if (result.isConfirmed) {
                    finalizarCart();
                }
            });
        }
    function listaProdutos(){
        let listaProdutos = '';
        totalValor: 0;

        produtosCarrinho.forEach((produto) => {
            listaProdutos +=`
            <tr>
                <td>${produto.produto}</td>
                <td>R$ ${produto.preco},00</td>
            </tr>`;
            
            totalValor += produto.preco;
        });

        return listaProdutos
    }
    }

    function finalizarCart(){
        Swal.fire({
            icon: "question",
            confirmButtonText: "enviar pedido",
            showCancelButton: true,
            title: "digite as informações de entrega!",
            html:`
            <form>
            <input id="end" placeholder="endereço" required>
            <input id="tel" placeholder="Telefone" required>
            <input id="pag" placeholder="forma de pagamento" required>
            </form>
            `
        }).then((result) => {
            if (result.isConfirmed) {
                enviaWhats();
                window.location.reload();
            }
        });
    }

    function enviaWhats(){
        const endereco = document.getElementById("end").value;
        const telefone = document.getElementById("tel").value;
        const pagamento = document.getElementById("pag").value;

            const mensagem = `
                Olá, gostaria de  fazer um pedido!
                Endereço: ${endereco}
                Telefone: ${telefone}
                Forma de pagamento: ${pagamento}
                Total de produtos: ${produtosCarrinho}
            `;

            let produtos = listaProdutos();

            const whatsappUrl = 
            `https://wa.me/5515996233571?text=
            ${encodeURIComponent(
                mensagem + produtos + `\nTotal: R$ ${totalValor},00`
            )}`;
            localStorage.clear();
            window.open(whatsappUrl, `_blank`);
    }
}
        