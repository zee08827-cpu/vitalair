'use client'

import { useState, useEffect } from 'react'

export default function AlertsPage() {
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
      if (!res.ok) throw new Error('No data')
      const json = await res.json()
      if (json.status !== 'ok') throw new Error('No data')
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
      <div style={{ textAlign: 'center', padding: '6rem 1rem', fontSize: '1.5rem', color: '#ef6c00' }}>
        Loading safety alerts for {city}... 🧡
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

  const getAlertInfo = (score: number) => {
    if (score <= 50) return {
      level: 'All Clear',
      color: '#81c784',
      tips: [
        'Enjoy outdoor activities freely — run, play, cycle!',
        'Open windows for fresh air circulation',
        'No mask or special protection needed',
        'Perfect day for morning walks or outdoor sports',
        'Drink plenty of water — hydration is key'
      ],
      why: 'Air quality is excellent today — breathe easy and stay active!'
    }
    if (score <= 100) return {
      level: 'Moderate',
      color: '#ffd54f',
      tips: [
        'Sensitive people (kids, elderly, asthma) wear mask if outside long',
        'Limit very long outdoor exercise',
        'Stay hydrated and monitor any nose/eye irritation',
        'Keep indoor air clean with good ventilation',
        'Avoid peak traffic hours if possible'
      ],
      why: 'Air is generally acceptable, but small precautions help sensitive groups feel better'
    }
    if (score <= 150) return {
      level: 'Unhealthy for Sensitive Groups',
      color: '#ffb74d',
      tips: [
        'Wear N95 mask when going outside',
        'Avoid strenuous outdoor activity or long exposure',
        'Close windows during peak pollution hours',
        'Use air purifier indoors if you have one',
        'Limit outdoor play for children'
      ],
      why: 'Children, elderly, and people with asthma/heart conditions may feel effects — be extra careful'
    }
    if (score <= 200) return {
      level: 'Unhealthy',
      color: '#ef5350',
      tips: [
        'Stay indoors as much as possible',
        'Keep all windows and doors closed',
        'Avoid all outdoor exercise or play',
        'Use air purifier continuously indoors',
        'Wear mask even for short outdoor trips'
      ],
      why: 'Everyone may start feeling breathing difficulty or irritation — protect yourself and family'
    }
    return {
      level: 'Hazardous',
      color: '#d32f2f',
      tips: [
        'Do not go outside unless absolutely necessary',
        'Keep all windows/doors tightly closed',
        'Use air purifier and masks indoors',
        'Seek medical advice if feeling unwell (cough, chest pain)',
        'Avoid any physical activity outdoors',
        'Inform family members to stay inside'
      ],
      why: 'Serious health risks for all ages — emergency conditions, stay inside and stay safe'
    }
  }

  const { level, color, tips, why } = getAlertInfo(aqi)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #fff8e1 0%, #ffe0b2 100%)',
      padding: '2rem 1rem',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        maxWidth: '720px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '32px',
        padding: '3rem 2.5rem',
        boxShadow: '0 20px 70px rgba(255,183,77,0.25)',
        position: 'relative'
      }}>
        {/* Cute bubbles */}
        <div className="bubble big" />
        <div className="bubble medium" style={{ animationDelay: '2s' }} />
        <div className="bubble small" style={{ animationDelay: '5s', right: '10%' }} />

        <h1 style={{
          textAlign: 'center',
          color: '#ef6c00',
          fontSize: '3rem',
          marginBottom: '0.5rem'
        }}>
          VitalAir Safety Alerts
        </h1>

        <p style={{
          textAlign: 'center',
          color: '#ef6c00',
          fontSize: '1.3rem',
          marginBottom: '2rem'
        }}>
          Safety guidance for {city.charAt(0).toUpperCase() + city.slice(1)}
        </p>

        <div style={{
          background: `${color}18`,
          borderRadius: '28px',
          padding: '2.5rem',
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}>
          <div style={{ fontSize: '5rem', fontWeight: '900', color }}>{aqi}</div>
          <div style={{ fontSize: '2rem', color: '#ef6c00', margin: '0.5rem 0' }}>{level}</div>
        </div>

        <div style={{
          background: 'rgba(255,245,157,0.2)',
          borderRadius: '22px',
          padding: '2rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{
            color: '#ef6c00',
            textAlign: 'center',
            marginBottom: '1.2rem',
            fontSize: '1.5rem'
          }}>
            Immediate Safety Tips
          </h3>
          <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
            {tips.map((tip, i) => (
              <li key={i} style={{
                background: 'white',
                borderRadius: '16px',
                padding: '1.2rem 1.5rem',
                marginBottom: '1rem',
                fontSize: '1.1rem',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
              }}>
                {tip}
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
            color: '#ef6c00',
            textAlign: 'center',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            Why These Precautions Matter
          </h3>
          <p style={{
            textAlign: 'center',
            fontSize: '1.2rem',
            color: '#424242',
            lineHeight: 1.7
          }}>
            {why}
          </p>
        </div>

        <p style={{
          textAlign: 'center',
          marginTop: '3rem',
          color: '#ef6c00',
          fontStyle: 'italic',
          fontSize: '1.15rem'
        }}>
          Stay safe, breathe better — you're doing great 🧡
        </p>
      </div>

      <style jsx global>{`
        .bubble {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,235,238,0.55);
          animation: float 15s infinite ease-in-out;
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