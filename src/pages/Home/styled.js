import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

export const Card = styled.div`
    position: relative;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;
    transition: border-color 0.3s;
`;