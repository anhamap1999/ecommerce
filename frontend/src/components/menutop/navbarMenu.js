import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const NavbarHeader = styled.header`
    width:100%;
    height:auto;
    position:  fixed;
    top:0;
    left:0;
    z-index:1000;
    color:#141414;
    padding-top:10px;
    padding-bottom:10px;
    transition:0.7s ease-in-out;
    background-color: #f2f2f2;
    
`;

export const NavbarToggle = styled.div``;
export const NavbarLogo = styled.div`
    font-size:32px;
    font-weight:bold;

`;
export const NavbarMenu = styled.nav`
    position: absolute;
    right: 20px;
`;
export const NavbarUl = styled.ul`
    display:flex;
 
 `;
export const NavbarLi = styled.li`
    padding: 0 25px;
    font-size: 26px;
    line-height: 55px;
`;
export const NavbarLink = styled(Link)``;

export const NavbarShop= styled(Link)`
`;
export const NavbarLogin = styled(Link)``;