import styled from 'styled-components';

const NavigationLinks = styled.div`
    color: white;
    font-size: 1.8rem;
    font-weight: bold;
    margin-top: 2rem;

    div {
        cursor: pointer;
        margin-bottom: 1rem;
        transition: all .25s ease;

        &:hover {
            color: var(--hover-color);
        }
    }
`

export default NavigationLinks;