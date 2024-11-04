import { FC } from 'react'
import { useAuth } from '../../hooks/useAuth'

interface Props {
    children: JSX.Element
}

export const ProtectedRoute: FC<Props> = ({ children }) => {
    const isAuth = useAuth()

    return <>
        {isAuth ? (
            children
        ) :
            (<div>
                <h1>To view this you nust be logged in.</h1>
                <img src="/secure.png" alt="" />
            </div>)}
    </>
}
