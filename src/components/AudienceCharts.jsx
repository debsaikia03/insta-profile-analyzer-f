import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const COLORS = ['#7c3aed', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444']

export default function AudienceCharts({ gendersAges, countries, membersTypes }) {
  const genderData = [
    { name: 'Male', value: +(gendersAges.summary.m * 100).toFixed(1) },
    { name: 'Female', value: +(gendersAges.summary.f * 100).toFixed(1) },
  ]

  const ageData = gendersAges.data.map((d) => ({
    age: d.category,
    Male: +(d.m * 100).toFixed(1),
    Female: +(d.f * 100).toFixed(1),
  }))

  const countryData = countries.slice(0, 6).map((c) => ({
    name: c.name.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase()),
    value: +(c.value * 100).toFixed(1),
  }))

  const typeData = membersTypes.map((t) => ({
    name: t.name.replace(/\b\w/g, (l) => l.toUpperCase()),
    value: +(t.percent * 100).toFixed(1),
  }))

  const Card = ({ title, children }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10 backdrop-blur-sm"
    >
      <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">{title}</h3>
      {children}
    </motion.div>
  )

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
      <Card title="👥 Gender Split">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={genderData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
              {genderData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1a1a2e', border: '1px solid #7c3aed', borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card title="🌍 Top Countries">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={countryData} layout="vertical">
            <XAxis type="number" unit="%" tick={{ fill: '#fff6', fontSize: 10 }} />
            <YAxis type="category" dataKey="name" tick={{ fill: '#fff6', fontSize: 10 }} width={72} />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1a1a2e', border: '1px solid #7c3aed', borderRadius: 8 }} />
            <Bar dataKey="value" fill="url(#grad)" radius={[0, 6, 6, 0]} />
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7c3aed" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="📊 Age Distribution">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={ageData}>
            <XAxis dataKey="age" tick={{ fill: '#fff6', fontSize: 9 }} />
            <YAxis unit="%" tick={{ fill: '#fff6', fontSize: 9 }} />
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1a1a2e', border: '1px solid #7c3aed', borderRadius: 8 }} />
            <Legend wrapperStyle={{ color: '#ffffff99' }} />
            <Bar dataKey="Male" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Female" fill="#ec4899" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card title="🤖 Audience Quality">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={typeData} cx="50%" cy="50%" innerRadius={42} outerRadius={70} dataKey="value" label={({ name, value }) => `${name}: ${value}%`}>
              {typeData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
            </Pie>
            <Tooltip formatter={(v) => `${v}%`} contentStyle={{ background: '#1a1a2e', border: '1px solid #7c3aed', borderRadius: 8 }} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  )
}