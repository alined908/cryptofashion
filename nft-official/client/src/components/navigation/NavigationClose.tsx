import styled from 'styled-components';

const NavigationClose = styled.div`
    position: absolute;
    right: 20px;
    top: 25px;
    width: 32px;
    height: 32px;
    cursor: pointer;

    &:hover::before, &:hover::after {
        background-color: var(--hover-color);
    }

    &:before, &:after {
        position: absolute;
        left: 15px;
        content: ' ';
        height: 33px;
        width: 4px;
        background-color: white;
    }

    &:before {
        transform: rotate(45deg);
    }

    &:after {
        transform: rotate(-45deg);
    }
`

export default NavigationClose