import { ShoppingContext } from "@/context/ShoppingContext";
import { X } from "@phosphor-icons/react";
import Image from "next/image";
import { useContext, useState } from "react";
import { BuyButton, CloseContainer, Container, HandbagContainer, ProductContainer, ProductContent, ProductDetail, ProductImage, SummaryAmount, SummaryPrice } from "./styles";
import { useRouter } from "next/router";
import axios from "axios";

const formatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
});

type HandbagProps = {
  isOpen: boolean
  closeModal: () => void;
}

export function Handbag({ isOpen, closeModal }: HandbagProps) {
  const { shoppingCart, removeProduct } = useContext(ShoppingContext);
  const [isCheckoutIsCreating, setIsCheckoutIsCreating] = useState(false);
  const { isFallback } = useRouter();

  if (isFallback) {
    return <p>Carregando...</p>
  }

  const summay = shoppingCart.items.reduce((acc, cur) => {
    return {
      amount: acc.amount + cur.amount,
      total: acc.total + (cur.amount * cur.product.price)
    }
  }, { amount: 0, total: 0 });

  function handleCloseModal() {
    closeModal();
  }

  function handleRemoveProduct(productId: string) {
    removeProduct(productId);
  }

  async function handleCheckout(){
    setIsCheckoutIsCreating(true);

    try {
      const response = await axios.post('/api/checkout', {
        shoppingCart
      });

      const { url } = response.data;

      window.location.href = url;
    } catch (err) {
      setIsCheckoutIsCreating(false);
      alert("Ocorreu um erro ao continuar com a compra!");
    }
  }

  return (
    <Container className={isOpen ? "isOpen" : "isClosed"}>
      <CloseContainer>
        <X weight="bold" size={24} onClick={handleCloseModal}/>
      </CloseContainer>

      <HandbagContainer>
        <h3>Sacola de Compras</h3>

        <ProductContainer>
          { shoppingCart.items.map(item => {
            const price = item.amount * item.product.price;

            return (
              <ProductContent key={item.product.id}>
                <ProductImage>
                  <Image src={item.product.imageUrl} alt="" width={94} height={94} />
                </ProductImage>
                <ProductDetail>
                  <span>{`${item.amount}x - ${item.product.name}`}</span>
                  <span><strong>{formatter.format(price)}</strong></span>
                  <button type="button" onClick={() => handleRemoveProduct(item.product.id)}>Remover</button>
                </ProductDetail>
              </ProductContent>
            );
          }) }
        </ProductContainer>

        <SummaryAmount>
          <span>Quantidade</span>
          <span>{summay.amount}</span>
        </SummaryAmount>
        <SummaryPrice>
          <span>Valor Total</span>
          <span>{formatter.format(summay.total)}</span>
        </SummaryPrice>

        <BuyButton 
          disabled={isCheckoutIsCreating || !shoppingCart.items.length}
          type="button"
          onClick={handleCheckout}
        >
          Finalizar compra
        </BuyButton>
      </HandbagContainer>
    </Container>
  )
}