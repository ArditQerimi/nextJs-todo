import React, { useState } from "react";
import styled from "styled-components";
import { BiTrash } from "react-icons/bi";
import { MdClear } from "react-icons/Md";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(196, 196, 196, 0.6);
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(4px);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 15px;
  padding: 20px;
  width: 400px;
  max-height: 268px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  text-align: center;
  font-family: "Inter", serif;
  z-index: 99999;
`;

const ModalTitle = styled.h2`
  font-size: 1.5rem;
  text-align: start;
  margin-bottom: 10px;
`;

const ModalDescription = styled.p`
  font-size: 1.2rem;
  text-align: start;
  margin-bottom: 20px;
`;

interface ButtonProps {
  background?: any;
  borderColor?: any;
  height?: any;
  width?: any;
  padding?: any;
}
const ModalButton = styled.button<ButtonProps>`
  font-family: "Montserrat", serif;
  font-style: normal;
  font-size: 18px;
  font-weight: 500;
  line-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.color ?? "#fff"};
  background-color: ${(props) => props.background ?? "#fff"};
  border: 1px solid ${(props) => props.borderColor ?? props.background};
  cursor: pointer;
  height: ${(props) => (props.height ? props.height : "60px")};
  width: ${(props) => (props.width ? props.width : "220px")};
  left: 1134px;
  top: 50px;
  border-radius: 8px;
  padding: ${(props) =>
    props.padding ? props.padding : "16px 28px 16px 28px"};
`;

const Circle = styled.div`
  width: 48px;
  height: 48px;
  background: #fef3f2;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SmallerCircle = styled.div`
  width: 34px;
  height: 34px;
  background: #fee4e2;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CancelButton = styled.div`
  cursor: pointer;
`;

const ModalButtonGroup = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
`;

interface Props {
  isOpen?: any;
  onCancel?(): void;
  onConfirm?(): void;
}

const Modal: React.FC<Props> = (props) => {
  const handleModalContentClick = (event: any) => {
    event.stopPropagation();
  };

  return (
    <>
      {props.isOpen && (
        <ModalOverlay onClick={props.onCancel}>
          <ModalContent onClick={handleModalContentClick}>
            <ModalHeader>
              <Circle>
                <SmallerCircle>
                  <BiTrash size={24} color={"#D92D20"} />
                </SmallerCircle>
              </Circle>
              <CancelButton onClick={props.onCancel}>
                <MdClear size={24} color={"#667085"} />
              </CancelButton>
            </ModalHeader>
            <ModalTitle>Delete task</ModalTitle>
            <ModalDescription>
              Are you sure you want to delete this task? This action cannot be
              undone.
            </ModalDescription>
            <ModalButtonGroup>
              <ModalButton
                height={"50px"}
                color="#000"
                borderColor="#D0D5DD"
                background="#fff"
                width="50%"
                onClick={props.onCancel}
              >
                Cancel
              </ModalButton>
              <ModalButton
                height={"50px"}
                color="#fff"
                background="#F04438"
                width="50%"
                onClick={props.onConfirm}
              >
                Delete
              </ModalButton>
            </ModalButtonGroup>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default Modal;
