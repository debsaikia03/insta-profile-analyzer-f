import { useState } from 'react'
import { Search } from 'lucide-react'
import { motion } from 'framer-motion'

export default function SearchBar({ onSearch, loading }) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(username)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-2xl mx-auto px-1 sm:px-0"
    >
      <div className="relative flex-1">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 font-bold text-sm">@</span>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter Instagram username..."
          className="w-full pl-9 pr-4 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm sm:text-base focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 transition-all"
        />
      </div>
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full sm:w-auto justify-center px-6 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-purple-500/30 transition-all"
      >
        <Search size={18} />
        {loading ? 'Analyzing...' : 'Analyze'}
      </motion.button>
    </motion.form>
  )
}