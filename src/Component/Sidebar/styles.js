import styled from 'styled-components';

export const Container = styled.div`
    background-color: #363636;
    box-shadow: 0 0 20px 3px;
    position: fixed;
    height: 100%;
    top: 0px;
    left: 0px;
    width: 18%;
    left: ${props => props.sidebar ? '0' : '-100%'};
    animation: showSidebar .4s;
    z-index: 9999;

    > svg {
        position: fixed;
        color: White;
        height: 3.9%;
        width: 1.7%;
        right: 97%;
        bottom: 92%;
        cursor: pointer;
    }

    > logo-under{
        width:10px !important;
    }


@keyframes showSidebar {
    from{
        opacity: 0;
        width: 0;
    }
    to {
        opacity: 1;
        width: 300px;
    }
}
`;

export const Content = styled.div`
    margin-top: 100px;
`;