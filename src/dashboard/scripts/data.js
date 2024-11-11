export const data = {
  Componentes: [
    {
      codigo: "#1234GFH",
      nome: "Placa-mãe",
      estoque: 1242,
      preco: 1500,
      dataEntrada: "2023-01-15",
      dataSaida: "2023-01-20",
      tipoMovimentacao: "Entrada",
      usuario: "João Silva",
    },
    {
      codigo: "#544GFH2",
      nome: "Memória RAM",
      estoque: 1242,
      preco: 1500,
      dataEntrada: "2023-01-10",
      dataSaida: "2023-01-18",
      tipoMovimentacao: "Saída",
      usuario: "Maria Oliveira",
    },
  ],
  Computador: [
    {
      codigo: "#7894GHF",
      nome: "Desktop Gamer",
      estoque: 50,
      preco: 1500,
      dataEntrada: "2023-02-10",
      dataSaida: null,
      tipoMovimentacao: "Entrada",
      usuario: "Carlos Souza",
    },
  ],
  Notebook: [
    {
      codigo: "#5687UJL",
      nome: "Notebook Ultrafino",
      estoque: 30,
      preco: 1500,
      dataEntrada: "2023-02-15",
      dataSaida: null,
      tipoMovimentacao: "Entrada",
      usuario: "Ana Paula",
    },
  ],
};

export const pedidos = [
  {
    fornecedor: "Fornecedor A",
    dataPedido: "2023-03-01",
    status: "Pendente",
    tipoPedido: "Compra",
    quantidade: 100,
    nomeProduto: "Placa-mãe",
  },
  {
    fornecedor: "Fornecedor B",
    dataPedido: "2023-03-05",
    status: "Concluído",
    tipoPedido: "Venda",
    quantidade: 50,
    nomeProduto: "Memória RAM",
  },
];
