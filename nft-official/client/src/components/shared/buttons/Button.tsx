import styled from 'styled-components';

interface Props {
    primary?: boolean
}

const Button = styled.button<Props>`
    display: block;
    border-radius: .5rem;
    padding: .75rem 1rem;
    margin: 0.25rem .5rem;
    background: black;
    color: white;
    border: 0;
    cursor: pointer;

    ${props => props.primary && `
        background: white;
        color: black;
    `}
`

export default Button