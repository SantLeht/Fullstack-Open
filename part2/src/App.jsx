import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const data = [
  { name: 'A', value: 100 },
  { name: 'B', value: 100 },
  { name: 'C', value: 300 },
  { name: 'D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const App = () => (
  <PieChart width={400} height={400}>
    <Pie
      data={data}
      cx="50%"
      cy="50%"
      labelLine={false}
      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
      outerRadius={120}
      dataKey="value"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
  </PieChart>
);

export default App;
