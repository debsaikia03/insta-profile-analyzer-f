import { motion } from 'framer-motion'
import { CheckCircle, Users, MapPin } from 'lucide-react'

export default function ProfileHeader({ data }) {
  const { name, screenName, description, image, usersCount, verified, country } = data
  const formattedUsersCount = new Intl.NumberFormat().format(usersCount ?? 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative rounded-2xl overflow-hidden p-4 sm:p-6 md:p-8 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-indigo-900/50 border border-white/10 backdrop-blur-sm"
    >
      {/* Glow effect */}
      <div className="absolute -top-20 -left-20 w-60 h-60 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-pink-600/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
            <img src={image} alt={name} className="w-full h-full rounded-full object-cover border-2 border-black" />
          </div>
          {verified && (
            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
              <CheckCircle size={18} className="text-white fill-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white break-words">{name}</h1>
            {verified && <span className="text-xs bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full mx-auto sm:mx-0">✓ Verified</span>}
          </div>
          <p className="text-purple-300 font-medium mt-0.5 text-sm sm:text-base break-all">@{screenName}</p>
          <p className="text-white/70 mt-2 text-sm max-w-none sm:max-w-lg leading-relaxed">{description}</p>

          <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-4">
            <div className="flex items-center gap-1.5 text-white/80">
              <Users size={16} className="text-purple-400" />
              <span className="font-bold text-white text-base sm:text-lg">
                {formattedUsersCount}
              </span>
              <span className="text-sm text-white/50">followers</span>
            </div>
            {country && (
              <div className="flex items-center gap-1.5 text-white/60 text-sm">
                <MapPin size={14} className="text-pink-400" />
                <span className="uppercase">{country}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}