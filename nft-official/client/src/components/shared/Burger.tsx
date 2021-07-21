import styled from 'styled-components';

const Burger = styled.div`
    display: none;
    cursor: pointer;

    span {
        display: block;
        width: 30px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;
        background: black;
        border-radius: 10px;
        z-index: 1;
    }
`

export default Burger