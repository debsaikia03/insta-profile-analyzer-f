import { motion } from 'framer-motion'
import { Heart, MessageCircle, TrendingUp, AlertTriangle } from 'lucide-react'

const cards = (d) => [
  { label: 'Avg Likes', value: d.avgLikes, icon: Heart, color: 'from-pink-600 to-rose-600', suffix: '' },
  { label: 'Avg Comments', value: d.avgComments, icon: MessageCircle, color: 'from-blue-600 to-cyan-600', suffix: '' },
  { label: 'Engagement Rate', value: +(d.avgER * 100).toFixed(3), icon: TrendingUp, color: 'from-green-600 to-emerald-600', suffix: '%' },
  { label: 'Fake Followers', value: +(d.pctFakeFollowers * 100).toFixed(1), icon: AlertTriangle, color: 'from-yellow-600 to-orange-600', suffix: '%' },
]

export default function StatsCards({ data }) {
  const formatValue = (value, suffix) => {
    if (suffix === '%') return Number(value).toFixed(2)
    return new Intl.NumberFormat().format(value)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
      {cards(data).map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.5 }}
          className={`relative rounded-2xl p-4 sm:p-5 bg-gradient-to-br ${card.color} overflow-hidden group hover:scale-105 transition-transform duration-300`}
        >
          <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-500" />
          <card.icon size={22} className="text-white/80 mb-3" />
          <p className="text-white/70 text-[11px] sm:text-xs font-medium uppercase tracking-wider">{card.label}</p>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold text-white mt-1 break-words">
            {formatValue(card.value, card.suffix)}
            {card.suffix}
          </p>
        </motion.div>
      ))}
    </div>
  )
}