import "./styles/tailwind.css";
import React, { useState } from "react";

function App() {
  const produtos = [
    {
      id: 1,
      nome: 'iPhone 15 Pro Max 256GB',
      preco: 7999.00,
      precoAntigo: 9999.00,
      imagem: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop',
      avaliacao: 4.9,
      avaliacoes: 1234,
      categoria: 'Smartphones'
    },
    {
      id: 2,
      nome: 'Samsung Galaxy S24 Ultra 512GB',
      preco: 6999.00,
      precoAntigo: 8499.00,
      imagem: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500&h=500&fit=crop',
      avaliacao: 4.8,
      avaliacoes: 892,
      categoria: 'Smartphones'
    },
    {
      id: 3,
      nome: 'MacBook Pro 14" M3 Pro 18GB 512GB',
      preco: 14999.00,
      precoAntigo: 16999.00,
      imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&h=500&fit=crop',
      avaliacao: 5.0,
      avaliacoes: 567,
      categoria: 'Notebooks'
    },
    {
      id: 4,
      nome: 'Dell XPS 15 Intel i7 16GB 1TB SSD',
      preco: 8999.00,
      imagem: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500&h=500&fit=crop',
      avaliacao: 4.7,
      avaliacoes: 423,
      categoria: 'Notebooks'
    },
    {
      id: 5,
      nome: 'AirPods Pro 2ª Geracao USB-C',
      preco: 1899.00,
      precoAntigo: 2299.00,
      imagem: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500&h=500&fit=crop',
      avaliacao: 4.9,
      avaliacoes: 2341,
      categoria: 'Fones de Ouvido'
    },
    {
      id: 6,
      nome: 'Sony WH-1000XM5 Noise Cancelling',
      preco: 1799.00,
      precoAntigo: 2199.00,
      imagem: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=500&fit=crop',
      avaliacao: 4.8,
      avaliacoes: 1876,
      categoria: 'Fones de Ouvido'
    },
    {
      id: 7,
      nome: 'Apple Watch Series 9 GPS 45mm',
      preco: 3499.00,
      imagem: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500&h=500&fit=crop',
      avaliacao: 4.7,
      avaliacoes: 934,
      categoria: 'Smartwatches'
    },
    {
      id: 8,
      nome: 'iPad Pro 12.9" M2 256GB Wi-Fi',
      preco: 9499.00,
      precoAntigo: 10999.00,
      imagem: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop',
      avaliacao: 4.9,
      avaliacoes: 678,
      categoria: 'Tablets'
    }
  ];
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("");
  const [carrinho, setCarrinho] = useState([]);
  const [menuAberto, setMenuAberto]= useState(false)

  function formatarPreco(preco) {
    return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  function adicionarCarrinho(produto) {
    setCarrinho(carrinhoAtual => {
      const existe = carrinhoAtual.find(p => p.id === produto.id);
      if (existe) {
        return carrinhoAtual.map(p =>
          p.id === produto.id
            ? { ...p, quantidade: p.quantidade + 1 }
            : p
        );
      } else {
        return [...carrinhoAtual, { ...produto, quantidade: 1 }];
      }
    });
  }

  function ListaProduto({ produtos, busca, filtro }) {
    const produtosDisponiveis = produtos
      .filter(p =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.categoria.toLowerCase().includes(busca.toLowerCase())
      )
      .filter(p => !filtro || p.categoria === filtro)

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-10 items-stretch">
        {produtosDisponiveis.map(p => (
          <div key={p.id} className="flex flex-col gap-2 shadow p-4 h-full">
            <img src={p.imagem} alt="" className="w-full h-56 object-cover rounded-lg" />
            <h1 className="text-md max-w-30">{p.nome}</h1>
            <div className="flex flex-col sm text-gray-700">
            <p className="sm w-30">{formatarPreco(p.preco * 1.05)} ou em até 10x de</p>
            <p className="sm">{formatarPreco(p.preco * 1.10/10)} sem juros ou</p>
            <p className="text-lg text-blue-700">{formatarPreco(p.preco)}</p>
            <p className="text-sm text-blue-700">No Pix</p>
            </div>
            
            <button
              onClick={() => adicionarCarrinho(p)}
              className="bg-blue-700 text-white h-10 w-full rounded-lg mt-auto"
            >
              Comprar
            </button>
          </div>
        ))}
      </div>
    );
  }

  function BotaoFiltro() {
    const produtosFiltro = [...new Set(produtos.map(p => p.categoria))];
    return (
      <div className="flex gap-8 justify-center my-8">
        <select
          value={filtro}
          onChange={e => setFiltro(e.target.value)}
          className="border-blue-700 rounded-xl px-4 py-2 text-blue-700 font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-blue-700 shadow-sm transition cursor-pointer text-base"
        >
          <option value="">Todas as categorias</option>
          {produtosFiltro.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    );
  }

  function MostrarCarrinho({ carrinho, setCarrinho }) {
    function RemoverCarrinho(id) {
      setCarrinho(carrinhoAtual => carrinhoAtual.filter(p => p.id !== id));
    }
    const total = carrinho.reduce((soma, p) => soma + p.preco * p.quantidade, 0);
    return (
      <div>
        <h1>Carrinho</h1>
        <div>
          {carrinho.length === 0 ? (
            <p>carrinho vazio</p>
          ) : (
            carrinho.map(p => (
              <div key={p.id}>
                <h1>{p.nome}</h1>
                <p>{formatarPreco(p.preco)}</p>
                <p>{p.quantidade}</p>
                <button onClick={() => RemoverCarrinho(p.id)}>Remover</button>
              </div>
            ))
          )}
          <p>Total: {formatarPreco(total)}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex flex-col md:flex-row gap-2 mb-3 justify-around text-lg h-20 items-center shadow" >
        <div className="flex flex-row gap-10 items-center" >
          
          <a href="#" className="text-blue-600 text-2xl">TechStore</a>
          
          <nav className="hidden md:flex flex-row gap-5">
            <a href="#" className="hover:text-blue-700">Inicio</a>
            <a href="#" className="hover:text-blue-700">Produtos</a>
            <a href="#" className="hover:text-blue-700">Contato</a>
            <a href="#" className="hover:text-blue-700">Carrinho</a>
          </nav>

         
        </div>
        <div className="flex flex-row gap-3">
          
          <input
            placeholder="Buscar Produtos..."
            className="border rounded-lg h-10 px-4 pr-10 w-80 border-gray-300 focus:border-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 placeholder-gray-400 transition text-lg"
            type="text"
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />

          <button className="md:hidden text-blue-700 focus:outline-none" onClick={() => setMenuAberto(!menuAberto)}>
          <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          </button>
        {menuAberto&&(
          <div className="absolute top-20 left-0 w-full bg-white shadow md:hidden z-50">
            <nav className="flex flex-col">
              <a href="#" className="py-2 px-6 hover:text-blue-700">Inicio</a>
              <a href="#" className="py-2 px-6 hover:text-blue-700">Produtos</a>
              <a href="#" className="py-2 px-6 hover:text-blue-700">Contato</a>
              <a href="#" className="py-2 px-6 hover:text-blue-700">Carrinho</a>
            </nav>
          </div>
        )}

        </div>
      </header>
      <div className="bg-blue-600 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="m-3xl">
            <h1 className="text-5xl font-bold text-white ">Os Melhores Eletrônicos Por Preços Incríveis</h1>
            <p className="text-white text-2xl py-7">
              Smartphones, notebooks, fones e muito mais com entrega rápida e segura
            </p>
          </div>
        </div>
      </div>
      <section className="p-10">
        <BotaoFiltro />
        <ListaProduto produtos={produtos} busca={busca} filtro={filtro} />
        <MostrarCarrinho carrinho={carrinho} setCarrinho={setCarrinho} />
      </section>
    </div>
  );
}

export default App;