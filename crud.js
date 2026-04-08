import { ref, push, set, get, child, update, remove } from "https://www.gstatic.com/firebasejs/12.11.0/firebase-database.js";
import { database } from "./firebaseConfig.js";
const produtosRef = ref(database, "produtos");

export async function salvar(nome, quantidade) {
  const novoItemRef = push(produtosRef);
  await set(novoItemRef, { nome, quantidade });
}

export async function buscarTodos() {
  const snapshot = await get(produtosRef);
  return snapshot.exists() ? snapshot.val() : {};
}

export async function editar(id, nome, quantidade) {
  const itemRef = child(produtosRef, id);
  await update(itemRef, { nome, quantidade });
}

export async function deletar(id) {
  const itemRef = child(produtosRef, id);
  await remove(itemRef);
}