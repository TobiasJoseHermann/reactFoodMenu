import React from "react"
import {
  MenuItem,
  Select,
  InputLabel,
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
  Button,
} from "@mui/material"
import { useStoreActions } from "easy-peasy"

export default function Dish({ dish, setAlert }) {
  const [expanded, setExpanded] = React.useState(false)
  const [amount, setAmount] = React.useState(1)
  const addToOrder = useStoreActions(actions => actions.addToOrder)

  function handleExpandClick() {
    setExpanded(!expanded)
  }

  function handleSave() {
    addToOrder({ ...dish, amount })
    setExpanded(false)
    setAlert(dish.title)
  }

  function handleChange(e) {
    setAmount(e.target.value)
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader title={dish.title} />
      <CardMedia
        component="img"
        height="300"
        image={dish.image}
        //TODO: fix alt image
        alt={dish.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the
          mussels, if you like.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button onClick={handleExpandClick}>
          {expanded ? "Cancel" : "Add To Order"}
        </Button>
        {expanded && (
          <>
            <InputLabel id="select-label" sx={{ mr: 1 }}>
              Amount:
            </InputLabel>
            <Select
              size="small"
              labelId="select-label"
              id="select"
              value={amount}
              displayEmpty
              onChange={handleChange}
              sx={{ minWidth: 82 }}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={4}>4</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
            <Button onClick={handleSave}>Save</Button>
          </>
        )}
      </CardActions>
    </Card>
  )
}
