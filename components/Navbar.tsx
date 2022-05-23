import styled from "styled-components"
import dynamic from "next/dynamic"
import Link from "next/link"
const Anime = dynamic(() => import('react-anime'), { ssr: false })


const NavbarWrapper = styled.nav`
    display: flex;
    justify-content: space-between;
    padding: 32px;
    position: absolute;
    top: 0;
`

const Logo = styled.img`
    cursor: pointer;
    transition: .2s ease-in-out;
    opacity: 0.9;
    :hover {
        opacity: 1;
    }
`
const Title = styled.span`
    cursor: pointer;
    font-size: 26px;
    line-height: 32px;
    font-weight: 400;
    margin-top: -2px;
    padding-left: 12px;
    letter-spacing: -1px
`

const NavbarLeft = styled.div`
    display: flex;
    align-items: center;
`

const NavbarLink = styled(Link)`
    :link,
    :visited {
        color: #fff;
        text-decoration: none;
    }
`

const Navbar = () => {
    return (
        <NavbarWrapper>
            <Anime easing={'easeOutElastic(1, .8)'} translateY={[10, 0]} opacity={[0, 1]} delay={50}>
                <NavbarLeft>
                    <NavbarLink href="https://lightspeed.tv">
                        <Logo height="32px" src="https://lightspeed.tv/assets/hero/logo.svg" />
                    </NavbarLink>
                    <NavbarLink href="/"><Title>blog</Title></NavbarLink>
                </NavbarLeft>
            </Anime>
        </NavbarWrapper>
    )
}

export default Navbar