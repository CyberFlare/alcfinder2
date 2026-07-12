import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import './charts.css';

const BarGraph = (props) => {

  const countTypes = (data = []) => {
    const counts = {};

    data.forEach((brewery) => {
      const type = brewery.brewery_type;
      if (counts[type]) {
        counts[type] = counts[type] + 1;
      }
      else {
        counts[type] = 1;
      }
    });

    return Object.keys(counts).map((type) => ({
      type: type,
      count: counts[type],
    }));
  };

  const chartData = countTypes(props.data);

  return (
    <div className="chart-block">
      <h2 className="chart-title">Breweries by Type</h2>
      <BarChart
        width={700}
        height={400}
        data={chartData}
        margin={{
          top: 5,
          right: 10,
          left: 10,
          bottom: 25,
        }}
      >
        <XAxis dataKey="type" label={{ value: 'Brewery Type', position: 'insideBottom', offset: -5 }} />
        <YAxis allowDecimals={false} label={{ value: 'Amount of Breweries', angle: -90, position: 'insideLeft' }} />
        <Bar dataKey="count" fill="#f6c945" activeBar={{ fill: 'orange', stroke: 'brown' }} radius={[10, 10, 0, 0]} />
      </BarChart>
    </div>
  );
};

export default BarGraph;