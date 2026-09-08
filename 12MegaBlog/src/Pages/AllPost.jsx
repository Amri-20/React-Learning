import React, { useState, useEffect } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../Components'

function AllPost() {
    // const [post, setPost] = useState([])
    const [posts, setPosts] = useState([])
    useEffect(() => {
        service.getPosts([]).then((res) => {
            if (res) {
                setPosts(res.documents)
            }
        })
    }, [])
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPost