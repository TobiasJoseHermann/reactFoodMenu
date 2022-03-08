import { action, thunk } from "easy-peasy"

const model = {
  menu: [],
  order: [],
  // Thunks
  fetchMenu: thunk(async (actions, category) => {
    try {
      const arr = []

      for (let i = 1; i < 6; ++i) {
        const baseURL = `https://foodish-api.herokuapp.com/api/images/${category}`
        const res = await fetch(baseURL)
        const data = await res.json()

        arr.push({
          ...data,
          title: `${category.toUpperCase()} ${i}`,
        })
      }

      actions.setMenu(arr)
    } catch (e) {
      console.log(e)
    }
  }),

  // Actions

  setMenu: action((state, menu) => {
    state.menu = menu
  }),

  // TODO: Alert user that the max amount is 5
  addToOrder: action((state, dish) => {
    const index = state.order.findIndex(item => item.image === dish.image)
    if (index !== -1) {
      let auxAmount =
        parseInt(state.order[index].amount) + parseInt(dish.amount)
      if (auxAmount > 5) auxAmount = 5
      state.order[index] = {
        ...state.order[index],
        amount: auxAmount,
      }
    } else {
      state.order = [...state.order, dish]
    }
  }),

  deleteOrderItem: action((state, id) => {
    state.order = state.order.filter(orderItem => orderItem.image !== id)
  }),

  changeAmount: action((state, { id, amount }) => {
    state.order = state.order.map(orderItem =>
      orderItem.image === id ? { ...orderItem, amount } : orderItem
    )
  }),

  finishOrder: action(state => {
    state.order = []
  }),
}
export default model
