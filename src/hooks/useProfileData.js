import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

export const useProfileData = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const fetchProfile = async (username) => {
    const trimmedUsername = username.trim()

    if (!trimmedUsername) {
      toast.warn('⚠️ Please enter a username!')
      return
    }

    setLoading(true)
    setData(null)

    try {
      const { data: json } = await axios.get(`https://insta-profile-analyzer.onrender.com/api/v1/count/followers`, {
        params: { username: trimmedUsername },
      })

      if (!json.success) {
        toast.error(json.message || '❌ Could not fetch profile data.')
        return
      }

      setData(json)
      toast.success(`✅ Profile loaded for @${trimmedUsername}`)
    } catch (err) {
      const status = err.response?.status
      const message = err.response?.data?.message

      if (status === 404) {
        toast.error(`❌ User "@${trimmedUsername}" not found!`)
      } else if (status === 429) {
        toast.error('🚦 Rate limit hit. Please wait a moment.')
      } else if (message) {
        toast.error(message)
      } else {
        toast.error('🌐 Network error. Is the backend running?')
      }
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, fetchProfile }
}