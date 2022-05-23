import styled from "styled-components"
import dynamic from 'next/dynamic'
/*
 * needed because Anime needs to have
 * access to client-side global objects like window and document
 */
const Anime = dynamic(() => import('react-anime'), { ssr: false })

const IntroductionWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 300px   ;
    width: 100vw;
    background-color: #161826;
    color: #FFFFFF;
    cursor: default;
    flex-direction: column;
`

const Introduction = styled.div`
    min-width: 75vw;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
        flex-direction: column;
        min-height: 25vh;
    }
`

const NameIntroduction = styled.div`
    font-weight: 300;
    font-size: 3rem;
`

const EmphasizedNameIntroduction = styled(NameIntroduction)`
    font-weight: 900;
    color: #40DEF3;
`

const GitHubSection = styled.div`
    font-weight: 400;
    font-size: 1.5rem;
    color: #AD96DE;
    text-align: right;
`

const GitHubLink = styled.a`
    color: #40DEF3;
    text-decoration: none;
    display: block;
`

const InitialIntroduction = () => {
    return (
        <IntroductionWrapper>
            <Introduction>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={50}>
                    <NameIntroduction>
                        Hello.
                        <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={100}>
                            <EmphasizedNameIntroduction>
                                I'm Infi.
                            </EmphasizedNameIntroduction>
                        </Anime>
                    </NameIntroduction>
                </Anime>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={500}>
                    <GitHubSection>
                        <GitHubLink
                            href="https://lightspeed.tv"
                        >
                            return to lightspeed.tv
                        </GitHubLink>
                        <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={510}>
                            or scroll down
                        </Anime>
                    </GitHubSection>
                </Anime>
            </Introduction>
        </IntroductionWrapper >
    )
}

export default InitialIntroduction