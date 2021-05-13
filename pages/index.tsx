import { FormEvent, useCallback, useState } from "react"
import { SearchResults } from "../components/SearchResults";

type Results = {
  totalPrice: number;
  data: any[]
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState<Results>({
    data: [],
    totalPrice: 0
  })

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if(!search.trim()){
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/products?q=${search}`)

      const data = await response.json();

      const totalPrice = data.reduce((total, product) => { 
          return total + product.price
        }, 0)
  

      setResults({ data, totalPrice })
    } catch (error) {
      
    }   
  }

  const addToWishlist = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input type="text" value={search} onChange={e => setSearch(e.target.value)}/>
        <button type="submit">Buscar</button>
      </form>
      <SearchResults onAddWishlist={addToWishlist} results={results.data} totalPrice={results.totalPrice} />
    </div>
  )
}
