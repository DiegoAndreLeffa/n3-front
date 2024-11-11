// scripts/modal.js

export function openModal(id) {
  const modalElement = document.getElementById(id);
  if (modalElement) {
    modalElement.style.display = "flex";
  }
}

export async function openCreateModal() {
  loadCategories();
  openModal("createModal");

  document.getElementById("addCategoryBtn")?.addEventListener("click", () => {
    const newCategoryInput = document.getElementById("newCategoryInput");
    const categorySelect = document.getElementById("createCategoria");

    if (newCategoryInput.style.display === "none") {
      newCategoryInput.style.display = "block";
      newCategoryInput.setAttribute("required", true);
      categorySelect.style.display = "none";
      categorySelect.removeAttribute("required");
    } else {
      newCategoryInput.style.display = "none";
      newCategoryInput.removeAttribute("required");
      categorySelect.style.display = "block";
      categorySelect.setAttribute("required", true);
    }
  });

  document
    .getElementById("createProductForm")
    ?.addEventListener("submit", async function (event) {
      event.preventDefault();

      const nome = document.getElementById("createNome").value;
      const preco = parseFloat(document.getElementById("createPreco").value);
      const quantidade = parseInt(
        document.getElementById("createQuantidade").value
      );
      const tipoMovimentacao = document.getElementById(
        "createTipoMovimentacao"
      ).value;
      const categoria =
        document.getElementById("newCategoryInput").value ||
        document.getElementById("createCategoria").value;

      // Pega o id do usuário da sessionStorage
      const usuarioData = sessionStorage.getItem("user");
      if (!usuarioData) {
        showToast("Usuário não logado. Por favor, faça login novamente.");
        return;
      }

      const usuarioId = JSON.parse(usuarioData).Id_usuario;
      const dataEntrada = new Date().toISOString().split("T")[0];

      const productData = {
        nome,
        preco,
        quantidade,
        tipoMovimentacao,
        usuarioId,
        categoria,
        dataEntrada,
      };

      console.log(productData);

      try {
        const response = await fetch("http://localhost:3000/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        });

        if (response.ok) {
          closeModal("createModal");
          showToast("Produto adicionado com sucesso!");
        } else {
          throw new Error("Erro ao adicionar produto.");
        }
      } catch (error) {
        console.error("Erro:", error);
        showToast("Ocorreu um erro ao adicionar o produto. Tente novamente.");
      }
    });
}
// Função de exibição do toast
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

export function closeModal(id) {
  const modalElement = document.getElementById(id);
  if (modalElement) {
    modalElement.style.display = "none";
  }
}

export function openEditModal(product) {
  document.getElementById("editNome").value = product.nome;
  document.getElementById("editCategoria").value = product.categoria || "";
  document.getElementById("editPreco").value = product.preco;
  document.getElementById("editQuantidade").value = product.estoque;
  openModal("editModal");
}

let itemToDelete = null;
export function openDeleteModal(item) {
  itemToDelete = item;
  document.getElementById("deleteItemName").innerText = `Item: ${item.nome}`;
  openModal("deleteModal");
}

export function loadModal(modalPath, containerId) {
  const container = document.getElementById(containerId);
  if (container) {
    fetch(modalPath)
      .then((response) => response.text())
      .then((html) => {
        container.innerHTML += html;
      })
      .catch((error) => console.error("Erro ao carregar o modal:", error));
  }
}

export function openCreateOrderModal() {
  openModal("createOrderModal");
}

// Função para abrir o modal de edição de pedido
export function openEditOrderModal(order) {
  // console.log(order);
  document.getElementById("editFornecedor").value = order?.fornecedor;
  document.getElementById("editDataPedido").value = order?.dataPedido;
  document.getElementById("editTipoPedido").value = order?.tipoPedido;
  document.getElementById("editQuantidade").value = order?.quantidade;
  document.getElementById("editNomeProduto").value = order?.nomeProduto;
  openModal("editOrderModal");
}

// Função para abrir o modal de deleção de pedido
export function openDeleteOrderModal(order) {
  document.getElementById(
    "deleteOrderInfo"
  ).innerText = `Pedido de ${order.nomeProduto}`;
  openModal("deleteOrderModal");
}

// Função de confirmação de exclusão de pedido
export function confirmDeleteOrder() {
  console.log("Pedido excluído");
  closeModal("deleteOrderModal");
}

async function loadCategories() {
  try {
    const response = await fetch("http://localhost:3000/categories");
    const categories = await response.json();

    const categorySelect = document.getElementById("createCategoria");
    categorySelect.innerHTML = ""; // Limpa as opções existentes

    categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.categoria;
      option.textContent = category.categoria;
      categorySelect.appendChild(option);
    });
  } catch (error) {
    console.error("Erro ao carregar categorias:", error);
  }
}

// Função para enviar dados do novo produto ao servidor
