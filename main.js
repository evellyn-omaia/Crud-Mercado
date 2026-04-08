import { salvar, buscarTodos, editar, deletar } from "./crud.js";

const nomeInput = document.getElementById("adProduto");
const quantInput = document.getElementById("quantProduto");
const lista = document.getElementById("list");
const buscaInput = document.getElementById("busca");
const btnSalvar = document.getElementById("adicionarBtn");

let idEditando = null;

// SALVAR OU EDITAR
btnSalvar.addEventListener("click", async () => {
  const nome = nomeInput.value.trim();
  const quantidade = quantInput.value.trim();

  if (!nome || !quantidade) {
    alert("Preencha tudo!");
    return;
  }

  try {
    if (idEditando) {
      await editar(idEditando, nome, quantidade);
      idEditando = null;
      btnSalvar.textContent = "Adicionar Produto";
    } else {
      console.log(nome , quantidade)
      await salvar(nome, quantidade);
    }

    nomeInput.value = "";
    quantInput.value = "";

    await atualizarLista(buscaInput.value.toLowerCase());
  } catch (err) {
    console.error("Erro:", err);
    alert("Erro ao salvar!");
  }
});

// BUSCA
buscaInput.addEventListener("input", () => {
  atualizarLista(buscaInput.value.toLowerCase());
});

// RENDER ITEM
function renderItem(id, produto, filtro) {
  if (!produto.nome.toLowerCase().includes(filtro)) return;

  const li = document.createElement("li");

  li.innerHTML = `
    <span><strong>${produto.nome}</strong>  — Quantidade: ${produto.quantidade}</span>
    <div>
      <button class="editar">Editar</button>
      <button class="excluir">Excluir</button>
    </div>
  `;

  // EDITAR
  li.querySelector(".editar").addEventListener("click", () => {
    nomeInput.value = produto.nome;
    quantInput.value = produto.quantidade;
    idEditando = id;
    btnSalvar.textContent = "Atualizar";
  });

  // EXCLUIR
  li.querySelector(".excluir").addEventListener("click", async () => {
    if (confirm("Excluir produto?")) {
      await deletar(id);
      atualizarLista(filtro);
    }
  });

  lista.appendChild(li);
}

// LISTAR
async function atualizarLista(filtro = "") {
  const dados = await buscarTodos();
  lista.innerHTML = "";

  for (let id in dados) {
    renderItem(id, dados[id], filtro);
  }
}

//EXCLUIR TUDO
const btnExcluirTudo = document.getElementById("btnExcluirTudo");

btnExcluirTudo.addEventListener("click", async () => {
  if (!confirm("Tem certeza que deseja excluir TODOS os produtos?")) return;

  try {
    const dados = await buscarTodos();

    for (let id in dados) {
      await deletar(id);
    }

    atualizarLista();
  } catch (err) {
    console.error(err);
    alert("Erro ao excluir tudo!");
  }
});

// INICIAR
window.onload = () => atualizarLista();