import { styled } from '@/stitches.config'
import { Card } from 'primereact/card'

export const MessageContainer = styled('div', {
    display: "flex",
    alignItems: "center",
    height: "100vh",
})


export const CardStyled = styled(Card, {
    margin: "auto",
    marginTop: "200px",
    width: "50%",
    textAlign: "center",
    verticalAlign: "middle",
});