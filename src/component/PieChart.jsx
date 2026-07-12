import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import './charts.css';

const COLORS = [
  '#d9a213',
  '#a85c17',
  '#c07f33',
  '#6b3810',
  '#bf9430',
  '#8c4a12',
  '#a86a24',
  '#4a280d',
  '#96702a',
  '#3b2410',
];

const BreweryPieChart = (props) => {

  const countStates = (breweries = []) => {
    const counts = {};

    breweries.forEach((brewery) => {
      const state = brewery.state;
      if (counts[state]) {
        counts[state] = counts[state] + 1;
      }
      else {
        counts[state] = 1;
      }
    });

    return Object.keys(counts)
      .map((state) => ({
        name: state,
        value: counts[state],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 10);
  };

  const data = countStates(props.data);

  return (
    <div className="chart-block">
      <h2 className="chart-title">Top 10 States by Brewery Count</h2>
      <PieChart width={700} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={120}
          paddingAngle={3}
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default BreweryPieChart;