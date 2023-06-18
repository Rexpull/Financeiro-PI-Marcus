import styled from 'styled-components';

export const Container = styled.div`
    height: 80px;
    display: flex;
    background-color: #363636;
    box-shadow: 0 0 10px 3px;

    > svg {
        position: absolute;
        color: white; 
        width: 1.6%;
        margin-right: 5%;
        height: 5%;
        margin-top: 1.6%;
        margin-left: 2%;
        cursor: pointer;
    }
`;

export const lightTheme = {
    body: '#FFF',
    text: '#363636'
}

export const darkTheme = {
    body: '#363636',
    text: '#FFF'
}