import { motion } from 'framer-motion'

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-24 gap-4">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
        className="w-16 h-16 rounded-full border-4 border-purple-500/30 border-t-purple-500"
      />
      <p className="text-white/60 animate-pulse text-lg">Fetching profile data...</p>
    </div>
  )
}