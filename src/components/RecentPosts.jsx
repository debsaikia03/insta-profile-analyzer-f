import { motion } from 'framer-motion'
import { Heart, MessageCircle, ExternalLink } from 'lucide-react'

export default function RecentPosts({ posts }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-4 sm:p-5 bg-white/5 border border-white/10"
    >
      <h3 className="text-white font-semibold text-base sm:text-lg mb-3 sm:mb-4">📸 Recent Posts</h3>
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.a
            key={post.url}
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="block rounded-xl p-3 sm:p-4 bg-white/5 border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs bg-purple-500/20 text-purple-300 border border-purple-500/30 px-2 py-0.5 rounded-full">{post.type}</span>
              <ExternalLink size={14} className="text-white/30 group-hover:text-purple-400 transition-colors" />
            </div>
            <p className="text-white/60 text-xs line-clamp-3 mb-3">{post.text}</p>
            <div className="flex gap-3 text-sm text-white/70">
              <span className="flex items-center gap-1"><Heart size={13} className="text-pink-400" />{post.likes.toLocaleString()}</span>
              <span className="flex items-center gap-1"><MessageCircle size={13} className="text-blue-400" />{post.comments.toLocaleString()}</span>
            </div>
            <p className="text-white/30 text-xs mt-2">{new Date(post.date).toLocaleDateString()}</p>
          </motion.a>
        ))}
      </div>
    </motion.div>
  )
}