import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

type Props = {
  data: Array<{ date: string; price: number }>
}

export default function Chart({ data }: Props) {
  const prices = data.map((point) => point.price)
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  const buffer = (max - min) * 0.1

  const roundedMin = Math.floor((min - buffer) / 100) * 100
  const roundedMax = Math.ceil((max + buffer) / 100) * 100

  return (
    <div className="bg-gray-800 p-4 rounded">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis domain={[roundedMin, roundedMax]} />
          <Tooltip
            formatter={(value: number) => `$${value.toFixed(2)}`}
            labelFormatter={(label) => `Date: ${label}`}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
