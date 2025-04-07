import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { store } from './store'
import App from './App'

test('renders the app and allows selecting a crypto asset', async () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  )

  expect(screen.getByText(/crypto asset tracker/i)).toBeInTheDocument()

  const select = screen.getByRole('combobox')
  fireEvent.change(select, { target: { value: 'ETH' } })

  await waitFor(() => {
    expect(select).toHaveValue('ETH')
  })
})
