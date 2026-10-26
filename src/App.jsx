
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import AddProduct from "./pages/AddProduct";
import ProductList from "./pages/ProductList";
import Orders from "./pages/Orders";
import { useEffect, useState } from "react";
import Sellers from "./pages/Sellers";

function App() {

  const [products, setProducts] = useState(() => {
    const savedProducts = localStorage.getItem("products");

    return savedProducts ? JSON.parse(savedProducts) : [];
  });

  // localga saqlash 
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  return (
    <div className="flex  overflow-hidden">
    
      <Sidebar/>

      <main className="flex-1 flex flex-col h-screen overflow-y-auto">

        <Header />

        <div className="w-full h-full">
          <Routes>
            <Route path="/" element={<Navigate to="/Add" replace />} />
            <Route path="/Add" element={<AddProduct  setProducts={setProducts} /> } />
            <Route path="/List" element={ <ProductList products={products} setProducts={setProducts}/> } />
            <Route path="/Orders" element={ <Orders/> } />
            <Route path="/Sellers" element={ <Sellers/> } />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;