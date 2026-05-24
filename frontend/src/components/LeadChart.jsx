import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const LeadChart = ({ leads }) => {

  const data = [
    {
      name: 'New',
      value: leads.filter(
        (lead) => lead.status === 'New'
      ).length
    },

    {
      name: 'Qualified',
      value: leads.filter(
        (lead) => lead.status === 'Qualified'
      ).length
    },

    {
      name: 'Negotiation',
      value: leads.filter(
        (lead) => lead.status === 'Negotiation'
      ).length
    },

    {
      name: 'Converted',
      value: leads.filter(
        (lead) => lead.status === 'Converted'
      ).length
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow p-5 mt-8">

      <h2 className="text-2xl font-bold mb-5">
        Lead Analytics
      </h2>

      <div className="h-80">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default LeadChart;