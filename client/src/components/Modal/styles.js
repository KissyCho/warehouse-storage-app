import styled from "styled-components";

const ModalContainer = styled.div`
position: fixed;
inset: 0;
background-color: rgba(0, 0, 0, 0.6);
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
transition: all 0.3s ease-in-out;
overflow: hidden;
z-index: 999;
padding: 40px 20px 20px;

form {
    padding: 2rem;
    background-color: #282c34;
    color: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    
    .buttons-container {
        display: flex;
        width: inherit;
        justify-content: space-evenly;
    
    }
    label:not(.radios) {
        display: flex;
        flex-direction: column;
    }

    div.radios input:nth-child(2) {
        margin-left: 1rem;
    }
}
`;

export {ModalContainer};