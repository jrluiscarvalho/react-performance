import { memo, useState } from "react"
import dynamic from 'next/dynamic'
import { AddProductToWishListProps } from './AddProductToWishList'
// import { AddProductToWishList } from "./AddProductToWishList"

const AddProductToWishlist = dynamic<AddProductToWishListProps>(() => {
  return import('./AddProductToWishList').then(mod => mod.AddProductToWishList)
}, {
  loading: () => <span>Carregando...</span>
})

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    title: string;
  }
  onAddWishlist: (id: number) => void;
}


export function ProductItemComponent({product, onAddWishlist}: ProductItemProps) {

  const [isAdding, setIsAdding] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.price}</strong>

      <button onClick={() => setIsAdding(true  )} >Adicionar aos Favoritos</button>

      {isAdding && <AddProductToWishlist 
        onAddProductToWishList={() => onAddWishlist(product.id)} 
        onRequestClose={() => setIsAdding(false)}
      />}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product)
})