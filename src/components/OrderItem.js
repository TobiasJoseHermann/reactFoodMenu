import React from "react"
import { useStoreActions } from "easy-peasy"
import {
  MenuItem,
  Select,
  InputLabel,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"

export default function OrderItem({ orderItem }) {
  const { changeAmount, deleteOrderItem } = useStoreActions(actions => ({
    changeAmount: actions.changeAmount,
    deleteOrderItem: actions.deleteOrderItem,
  }))

  function handleChange(e) {
    changeAmount({ id: orderItem.image, amount: e.target.value })
  }

  return (
    <>
      <ListItem>
        <ListItemText primary={orderItem.title} />
        <InputLabel id="select-label" sx={{ mr: 1 }}>
          Amount:
        </InputLabel>
        <Select
          size="small"
          labelId="select-label"
          id="select"
          value={orderItem.amount}
          displayEmpty
          onChange={handleChange}
          sx={{ mr: 1 }}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
        <IconButton
          onClick={() => deleteOrderItem(orderItem.image)}
          edge="end"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  )
}
