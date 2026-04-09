import { motion, AnimatePresence } from 'framer-motion'
import { Camera } from 'lucide-react'
import SearchBar from './components/SearchBar'
import ProfileHeader from './components/ProfileHeader'
import StatsCards from './components/StatsCards'
import AudienceCharts from './components/AudienceCharts'
import RecentPosts from './components/RecentPosts'
import LoadingSpinner from './components/LoadingSpinner'
import { useProfileData } from './hooks/useProfileData'

export default function App() {
  const { data, loading, fetchProfile } = useProfileData()
  const profile = data?.rawData?.data

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white relative overflow-x-hidden">
      {/* Background gradient blobs */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-700/20 rounded-full blur-3xl" />
        <div className="absolute top-[30%] right-[-10%] w-80 h-80 bg-pink-700/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[10%] left-[30%] w-72 h-72 bg-blue-700/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-6 sm:py-10 md:py-16 space-y-6 sm:space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-5 sm:space-y-4"
        >
          <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 mb-2">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-linear-to-br from-purple-600 to-pink-600 shadow-lg shadow-purple-900/30">
              <Camera size={24} className="sm:size-7 text-white" />
            </div>
            <h1 className="max-w-[12ch] text-3xl sm:text-4xl md:text-5xl font-extrabold leading-none bg-linear-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              Insta Analyzer
            </h1>
          </div>
          <p className="mx-auto max-w-2xl text-white/50 text-sm sm:text-base px-2">Deep-dive analytics for any public Instagram profile</p>
          <SearchBar onSearch={fetchProfile} loading={loading} />
        </motion.div>

        {/* Loading */}
        {loading && <LoadingSpinner />}

        {/* Results */}
        <AnimatePresence>
          {profile && !loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <ProfileHeader data={profile} />
              <StatsCards data={profile} />
              <AudienceCharts
                gendersAges={profile.membersGendersAges}
                countries={profile.membersCountries}
                membersTypes={profile.membersTypes}
              />
              <RecentPosts posts={profile.lastPosts} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Empty state */}
        {!profile && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-white/20 text-lg"
          >
            🔍 Search for a username to see analytics
          </motion.div>
        )}
      </div>
    </div>
  )
}