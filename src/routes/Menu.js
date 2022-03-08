import { useStoreActions, useStoreState } from "easy-peasy"
import Dish from "../components/Dish"
import { useState, useEffect } from "react"
import {
  Button,
  ButtonGroup,
  Pagination,
  Grid,
  Alert,
  Container,
  LinearProgress,
} from "@mui/material"

export default function Menu() {
  const menu = useStoreState(state => state.menu)
  const fetchMenu = useStoreActions(actions => actions.fetchMenu)
  const [alert, setAlert] = useState()
  const [category, setCategory] = useState("burger")

  useEffect(() => {
    fetchMenu(category)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleChange = (event, value) => {
    setPage(value)
  }

  const handleCategoryChange = value => {
    setCategory(value)
    fetchMenu(value)
  }

  // Pagination
  const [page, setPage] = useState(1)
  const [dishesPerPage] = useState(3)
  const indexOfLastDish = page * dishesPerPage
  const indexOfFirstDish = indexOfLastDish - dishesPerPage
  let currentMenu = menu.slice(indexOfFirstDish, indexOfLastDish)
  let paginationCount = Math.ceil(menu.length / dishesPerPage)

  const menuElements = currentMenu.map(dish => {
    return (
      <Grid item md={4} sm={6} xs={12} key={dish.title}>
        <Dish dish={dish} setAlert={setAlert} />
      </Grid>
    )
  })

  return (
    <Container>
      {!menu.length ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container justifyContent="center">
            <ButtonGroup
              variant="contained"
              aria-label="outlined primary button group"
              sx={{ mb: 2, alignSelf: "center" }}
            >
              <Button onClick={() => handleCategoryChange("burger")}>
                Burger
              </Button>
              <Button onClick={() => handleCategoryChange("dessert")}>
                Dessert
              </Button>
              <Button onClick={() => handleCategoryChange("pasta")}>
                Pasta
              </Button>
              <Button onClick={() => handleCategoryChange("pizza")}>
                Pizza
              </Button>
              <Button onClick={() => handleCategoryChange("rice")}>Rice</Button>
            </ButtonGroup>
          </Grid>
          {alert && (
            <Alert
              sx={{ mb: 2 }}
              onClose={() => {
                setAlert("")
              }}
            >
              {alert} has been added to order
            </Alert>
          )}
          <Grid container spacing={1}>
            {menuElements}
          </Grid>
        </>
      )}
      <Grid container justifyContent="center">
        <Pagination
          sx={{ mt: 2 }}
          count={paginationCount}
          page={page}
          onChange={handleChange}
        />
      </Grid>
    </Container>
  )
}
