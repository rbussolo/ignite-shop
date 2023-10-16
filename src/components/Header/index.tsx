import Image from "next/image";

import { Handbag as HandbagImage } from "@phosphor-icons/react";
import logoImg from '../../../public/assets/logo.svg';
import { useContext, useState } from "react";
import { ShoppingContext } from "@/context/ShoppingContext";
import { HandBagAmount, HandBagButton, HeaderContainer } from "./styles";
import { Handbag } from "../Handbag";

export function Header() {
  const { shoppingCart } = useContext(ShoppingContext);
  const [modalIsOpen, setModalOpen] = useState(false);

  const amount = shoppingCart.items.reduce((acc, cur) => acc + cur.amount, 0);

  function handleClickHandbag(event: React.MouseEvent<HTMLElement>) {
    event.preventDefault();

    setModalOpen(true);
  }

  function onCloseModal() {
    setModalOpen(false);
  }

  return (
    <>
      <HeaderContainer>
        <Image src={logoImg.src} width={130} height={52} alt="" />

        <HandBagButton onClick={handleClickHandbag}>
          <HandbagImage size={24} weight="bold" />
          { amount > 0 && (
            <HandBagAmount>{amount}</HandBagAmount>
          )}
        </HandBagButton>
      </HeaderContainer>

      <Handbag isOpen={modalIsOpen} closeModal={onCloseModal} />
    </>
  )
}