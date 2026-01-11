const moodKeywords = {
  melancholic: [
    "sad", "lonely", "empty", "tired", "down", "lost", "broken", "depressed"
  ],
  energetic: [
    "happy", "excited", "motivated", "pumped", "great", "amazing"
  ],
  calm: [
    "peaceful", "relaxed", "okay", "fine", "stable", "chill"
  ],
  angry: [
    "angry", "mad", "furious", "irritated", "hate", "annoyed"
  ],
  nostalgic: [
    "miss", "remember", "old", "past", "memories", "school"
  ],
  chaotic: [
    "confused", "overwhelmed", "stressed", "chaos", "lost", "mess", "idk"
  ]
}

export function getMood(text) {
  const input = text.toLowerCase()
  let scores = {}

  for (const mood in moodKeywords) {
    scores[mood] = 0
    moodKeywords[mood].forEach(word => {
      if (input.includes(word)) scores[mood]++
    })
  }

  const bestMood = Object.keys(scores).reduce((a, b) =>
    scores[a] > scores[b] ? a : b
  )

  return scores[bestMood] === 0 ? "calm" : bestMood
}

