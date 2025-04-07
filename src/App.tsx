import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from './store'
import { setSymbol, setRange, loadCryptoData } from './features/crypto/cryptoSlice'
import { useEffect } from 'react'

import Chart from './components/Chart'

import './App.css'

function App() {
  const dispatch = useDispatch<AppDispatch>()
  const { symbol, range, data, status } = useSelector((state: RootState) => state.crypto)

  useEffect(() => {
    dispatch(loadCryptoData({ symbol, range }))
  }, [symbol, range, dispatch])

  const formattedData = data?.prices
    ?.map(([timestamp, price]: [number, number]) => {
      const date = new Date(timestamp).toISOString().split('T')[0]
      return { date, price: parseFloat(price.toFixed(2)) }
    })
    .reduce((acc: { [key: string]: { date: string; price: number } }, curr: { date: string; price: number }) => {
      if (!acc[curr.date]) {
        acc[curr.date] = curr
      }
      return acc
    }, {}) ?? {}

  const chartData: { date: string; price: number }[] = Object.values(formattedData)


  return (
    <div className="min-h-screen text-white p-6 container mx-auto">
      <h1 className="text-3xl font-bold mb-6">Crypto Asset Tracker</h1>

      <div className="flex justify-between items-center mb-6" >

        <select
          className="bg-gray-800 p-3 rounded text-white"
          value={symbol}
          onChange={(e) => dispatch(setSymbol(e.target.value))}
        >
          <option value="BTC">Bitcoin (BTC)</option>
          <option value="ETH">Ethereum (ETH)</option>
          <option value="AVAX">Avalanche (AVAX)</option>
          <option value="AAVE">Aave (AAVE)</option>
        </select>

        <button className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded text-white font-semibold">
          Connect Wallet
        </button>
      </div>

      <div className="flex gap-2 mb-6">
        {['7', '30', '365'].map((r) => (
          <button
            key={r}
            className={`px-4 py-2 rounded ${range === r ? 'bg-indigo-600' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            onClick={() => dispatch(setRange(r as any))}
          >
            {r === '7' ? 'Week' : r === '30' ? 'Month' : 'Year'}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 rounded">
        {status === 'loading' && (
          <div className="h-64 flex items-center justify-center text-gray-400">Loading data...</div>
        )}
        {status === 'succeeded' && formattedData && <Chart data={chartData} />}
        {status === 'failed' && (
          <div className="h-64 flex items-center justify-center text-red-400">⚠️ Error loading data</div>
        )}
      </div>
    </div>
  );
}
export default App;
