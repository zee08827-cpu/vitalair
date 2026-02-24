'use client'

import { useState, useEffect } from 'react'

export default function RiskPage() {
  const [aqi, setAqi] = useState(0)
  const [city, setCity] = useState('hyderabad')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity') || 'hyderabad'
    setCity(savedCity)
    fetchAqi(savedCity)
  }, [])

  const fetchAqi = async (searchCity: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`https://api.waqi.info/feed/${searchCity}/?token=4ef9298690f1d2fa501825b7ffcc5b8d2bb02cd9`)
      if (!res.ok) throw new Error('No data available')
      const json = await res.json()
      if (json.status !== 'ok') throw new Error('No data available')
      setAqi(json.data.aqi || 0)
      setCity(searchCity)
    } catch (err: any) {
      setError(err.message || 'Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem', fontSize: '1.5rem', color: '#2e7d32' }}>
        Loading health insights for {city}... 🌿
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '6rem 1rem', color: '#e53935', fontSize: '1.4rem' }}>
        {error} — try searching again from City Search
      </div>
    )
  }

  const getRiskInfo = (score: number) => {
    if (score <= 50) return {
      level: 'Good Air Quality',
      color: '#66bb6a',
      summary: 'Air is fresh and healthy today',
      diseases: [
        'No increased risk of asthma or respiratory issues',
        'Safe for people with heart conditions',
        'No irritation to eyes, nose or throat',
        'Ideal for outdoor activities and exercise'
      ],
      protect: [
        'Enjoy long walks or playtime outside',
        'Open windows for fresh air',
        'No special precautions needed'
      ]
    }
    if (score <= 100) return {
      level: 'Moderate Air Quality',
      color: '#ffca28',
      summary: 'Acceptable but mild irritation possible',
      diseases: [
        'Low risk of nose/throat irritation',
        'Mild chance of asthma symptoms in sensitive people',
        'Very low risk for heart patients',
        'Possible minor eye discomfort'
      ],
      protect: [
        'Limit long outdoor exercise if sensitive',
        'Wear mask if you feel irritation',
        'Stay hydrated and monitor symptoms'
      ]
    }
    if (score <= 150) return {
      level: 'Unhealthy for Sensitive Groups',
      color: '#ffb74d',
      summary: 'Sensitive people should take precautions',
      diseases: [
        'Asthma flare-ups possible',
        'Increased breathing difficulty',
        'Risk of bronchitis in children/elderly',
        'Eye and skin irritation common',
        'Heart strain in people with cardiac issues'
      ],
      protect: [
        'Wear N95 mask outdoors',
        'Avoid strenuous outdoor activity',
        'Use air purifier indoors',
        'Keep windows closed during peak pollution'
      ]
    }
    if (score <= 200) return {
      level: 'Unhealthy Air Quality',
      color: '#ef5350',
      summary: 'Health effects likely for everyone',
      diseases: [
        'High risk of asthma attacks',
        'Breathing problems in healthy people',
        'Increased heart attack risk',
        'Throat and lung irritation',
        'Worsening of chronic respiratory diseases'
      ],
      protect: [
        'Stay indoors as much as possible',
        'Use air purifier and keep windows closed',
        'Avoid all outdoor exercise',
        'Wear mask even for short outdoor trips'
      ]
    }
    return {
      level: 'Very Unhealthy / Hazardous',
      color: '#d32f2f',
      summary: 'Emergency conditions — serious health risk',
      diseases: [
        'Severe asthma and breathing emergencies',
        'High risk of heart attack/stroke',
        'Lung damage with prolonged exposure',
        'Eye/throat burning sensation',
        'Worsening of all respiratory & heart conditions'
      ],
      protect: [
        'Do not go outside unless absolutely necessary',
        'Keep all windows/doors closed',
        'Use air purifier continuously',
        'Seek medical help if feeling unwell',
        'Avoid any physical activity outdoors'
      ]
    }
  }

  const { level, color, summary, diseases, protect } = getRiskInfo(aqi)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%)',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '32px',
        padding: '3rem 2.5rem',
        boxShadow: '0 20px 70px rgba(102,187,106,0.25)',
        position: 'relative'
      }}>
        {/* Cute bubbles */}
        <div className="bubble big" />
        <div className="bubble medium" style={{ animationDelay: '2s' }} />
        <div className="bubble small" style={{ animationDelay: '5s', right: '10%' }} />

        <h1 style={{
          textAlign: 'center',
          color: '#2e7d32',
          fontSize: '3rem',
          marginBottom: '0.5rem'
        }}>
          VitalAir Health Risk
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#388e3c',
          fontSize: '1.3rem',
          marginBottom: '2rem'
        }}>
          Current air quality impact on your health in {city.charAt(0).toUpperCase() + city.slice(1)}
        </p>

        <div style={{
          background: `${color}15`,
          borderRadius: '28px',
          padding: '2.5rem',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <div style={{ fontSize: '5rem', fontWeight: '900', color }}>{aqi}</div>
          <div style={{ fontSize: '2rem', color: '#2e7d32', margin: '0.5rem 0' }}>{level}</div>
        </div>

        <div style={{
          background: 'rgba(232,245,233,0.7)',
          borderRadius: '22px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            color: '#2e7d32',
            textAlign: 'center',
            marginBottom: '1.2rem',
            fontSize: '1.5rem'
          }}>
            Possible Health Effects & Diseases
          </h3>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {diseases.map((item, i) => (
              <li key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.2rem 1.5rem',
                marginBottom: '1rem',
                fontSize: '1.1rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div style={{
          background: `${color}10`,
          borderRadius: '22px',
          padding: '2rem'
        }}>
          <h3 style={{
            color: '#2e7d32',
            textAlign: 'center',
            marginBottom: '1.2rem',
            fontSize: '1.5rem'
          }}>
            How to Protect Yourself Today
          </h3>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {protect.map((item, i) => (
              <li key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.2rem 1.5rem',
                marginBottom: '1rem',
                fontSize: '1.1rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '3rem',
          color: '#4caf50',
          fontStyle: 'italic',
          fontSize: '1.15rem'
        }}>
          Breathe better, live healthier — you're doing great 💚
        </p>
      </div>

      <style jsx global>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(200,230,201,0.5);
          animation: float 14s infinite ease-in-out;
        }
        .big { width: 260px; height: 260px; top: -130px; right: -130px; }
        .medium { width: 160px; height: 160px; animation-duration: 18s; }
        .small { width: 100px; height: 100px; animation-duration: 22s; }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(70px, -90px) rotate(15deg); }
        }
      `}</style>
    </main>
  )
}