import { useStoreState, useStoreActions } from "easy-peasy"
import OrderItem from "../components/OrderItem"
import { Button, Typography, List, Alert, Container } from "@mui/material"
import { useState } from "react"

export default function Menu() {
  let order = useStoreState(state => state.order)
  const finishOrder = useStoreActions(actions => actions.finishOrder)
  const [isOrderFinished, setOrderFinished] = useState(false)

  function handleFinishOrder() {
    finishOrder()
    setOrderFinished(true)
  }

  const menuElements = order.map(orderItem => {
    return <OrderItem orderItem={orderItem} key={orderItem.title} />
  })

  return (
    <Container>
      {isOrderFinished && (
        <Alert severity="success">Your order has been sent</Alert>
      )}
      {!order.length && !isOrderFinished ? (
        <Alert severity="warning">No items have been added</Alert>
      ) : (
        <>
          <Typography variant="h3">Order Items</Typography>
          <List>{menuElements}</List>
          {!isOrderFinished && (
            <Button color="secondary" size="large" onClick={handleFinishOrder}>
              Finish Order
            </Button>
          )}
        </>
      )}
    </Container>
  )
}
