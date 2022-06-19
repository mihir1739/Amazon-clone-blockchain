import { createContext, useState, useEffect } from "react";
import { useMoralis } from "react-moralis";

export const AmazonContext = createContext()

export const AmazonProvider = ({ children }) => {

    const [username, setUsername] = useState("")
    const [nickname, setNickname] = useState("")

    const {
        authenticate,
        isAuthenticated,
        Moralis,
        enableWeb3,
        user,
        isWeb3Enabled
    } = useMoralis()

    useEffect(() => {

        ; (async () => {

            if (isAuthenticated) {
                const currentUsername = await user?.get('nickname')
                setUsername(currentUsername)
            }
        })()

    }, [isAuthenticated, user, username])

    const handleSetUsername = () => {
        if (user) {
            if (nickname) {
                user.set('nickname', nickname) //adds another coloumn nickname into the users collection (DB)
                user.save()
                setNickname('')
            }
            else {
                console.log('Cant set empty nickname')
            }
        }
        else {
            console.log("No user connected")
        }
    }


    return (
        <AmazonContext.Provider
            value={{
                isAuthenticated,
                nickname,
                setNickname,
                username,
                handleSetUsername
            }}
        >
            {children}
        </AmazonContext.Provider>
    )
}