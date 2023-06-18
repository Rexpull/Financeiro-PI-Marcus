import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    background-color: #363636;
    font-size: 20px;
    color: White;
    padding: 10px;
    cursor: pointer;
    border: 1px solid White;
    border-radius: 8px;
    margin: 0 15px 20px;
    transition: 0.5s;
    text-decoration:none!important;
    > svg {
        margin: 0 20px;
    }
    &:hover {
        transform: scale(1.05);
        background-color: white;
        color: #363636; 

    }
`;