import { getAllPosts, getPostBySlug } from '../../lib/posts'
import markdownToHtml from '../../lib/markdown'
import styled from 'styled-components'
import dynamic from 'next/dynamic'
import Head from "next/head"
import { formatDistanceToNow } from 'date-fns'
import LatestGrid from '../../components/display/LatestGrid'
import AuthorDisplay from '../../components/display/AuthorDisplay'
import LatestPostDisplay from '../../components/display/LatestPostDisplay'
import Link from "next/link"
const Anime = dynamic(() => import('react-anime'), { ssr: false })

const Nav = styled.nav`
    display: flex;
    padding: 32px;
    flex-shrink: 0
`

const Logo = styled.img`
    cursor: pointer;
    transition: .25s ease-in-out;
    opacity: 0.8;
    :hover { opacity: 1; transform: scale(1.03) }
`
const Title = styled.span`
    cursor: pointer;
    font-size: 26px;
    font-weight: 400;
    padding-left: 8px;
    letter-spacing: -1px;
    color: #fff;
    opacity: 0.8;
    transition: .25s ease-in-out;
    transform: translateZ(0) scale(1.0,1.0);
    :hover { opacity: 1; transform: scale(1.03) }
`

const NavLink = styled(Link)`
    :link,
    :visited {
        color: #fff;
        text-decoration: none;
    }
`

const PostHeader = styled.header`
    display: flex;
    align-items: center;
    background-color: #161826;
    flex-direction: row;
    user-select: none;
`

const PostInfo = styled.div`
    text-align: left;
    width: 100%;
    display: flex;
    flex-direction: column;
    flex-grow: 1
`

const PostTitle = styled.h1`
    color: #ffffff;
    font-size: 1.6rem;
    font-weight: 600;
    margin: 0;
`

const PostDate = styled.div`
    color: #ffffff;
    font-size: 1rem;
    font-weight: 300;
    flex-shrink: 0;
    padding-right: 32px
`

const PostDescription = styled.div`
    font-size: 1rem;
    font-weight: 400;
`

const PostContent = styled.main`
    max-width: 60vw;
    margin: 0 auto;
    padding-top: 2rem;

    @media (max-width: 768px) {
        max-width: 90vw;
    }
`

const PostAuthor = styled.footer`
    background-color: #161826;
    font-size: 1.2rem;
    font-weight: 400;
    padding: 1.2em;
    border-radius: 15px;
`

const PostAuthorHeader = styled.h3`
    color: #40DEF3;
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    margin-bottom: 0.75rem;
    user-select: none;
`

const Post = ({ post, latestPosts }: { post: any, latestPosts: any }) => {
    return (
        <>
            <Head>
                <meta property="og:title" content={post.title} />
                <meta property="og:description" content={post.description + ` (${post.readingTime})`} />
            </Head>
            <PostHeader>
                
                    
                    <Nav>
                    <NavLink href="https://lightspeed.tv"><Logo height="32px" src="https://lightspeed.tv/assets/hero/logo.svg" /></NavLink>
                    <NavLink href="/"><Title>blog</Title></NavLink>
                    </Nav>

                    <PostInfo>
                        <PostTitle>{post.title}</PostTitle>
                        <PostDescription>{post.description}</PostDescription>
                    </PostInfo>
                    <PostDate>{formatDistanceToNow(new Date(post.date))} ago · {post.readingTime}</PostDate>
            </PostHeader>
            <PostContent>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={500}>
                    <article className="markdown-dynamic-content" dangerouslySetInnerHTML={{ __html: post.content }} />
                </Anime>
                <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={600}>
                    <PostAuthor>
                        <PostAuthorHeader>About the author</PostAuthorHeader>
                        <AuthorDisplay name={post.author.name} imageUrl={post.author.picture} />
                    </PostAuthor>
                </Anime>
            </PostContent>
            <Anime easing={'easeOutElastic(1, .8)'} translateY={[30, 0]} opacity={[0, 1]} delay={700}>
                <LatestGrid items={latestPosts} component={LatestPostDisplay} heading={"Latest Posts"} />
            </Anime>
        </>
    )
}

type Params = {
    params: {
        slug: string
    }
}

export const getStaticProps = async ({ params }: Params) => {
    const post = getPostBySlug(params.slug, [
        'title',
        'description',
        'coverImage',
        'date',
        'author',
        'slug',
        'content',
        'ogImage',
        'readingTime',
    ])
    const content = await markdownToHtml(post.content || '')

    const allPosts = getAllPosts(["title", "slug", "coverImage", "description", "date"])

    return {
        props: {
            post: {
                ...post,
                content,
            },
            latestPosts: allPosts.slice(0, 4),
        },
    }
}


export const getStaticPaths = async () => {
    const posts = getAllPosts(["slug"])

    return {
        paths: posts.map((post) => {
            return {
                params: {
                    slug: post.slug,
                },
            }
        }),
        fallback: false,
    }
}

export default Post