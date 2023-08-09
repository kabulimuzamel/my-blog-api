import { createGlobalStyle } from 'styled-components'

export const backgroundUrlStyle = (url, hn) => {
    return (
        createGlobalStyle`
            body {
                background: url(${url});
                background-repeat: no-repeat;
                background-size: cover;
                background-attachment: fixed;
                height: ${hn}
            }
        `
    )
}
