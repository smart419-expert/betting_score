'use server';

import type { NextApiRequest } from 'next';

const API_FOOTBALL_BASE = 'https://api-football-v1.p.rapidapi.com/v3';
const API_KEY = process.env.NEXT_PUBLIC_API_FOOTBALL_KEY;

if (!API_KEY) {
  throw new Error('API-Football key is missing. Please set NEXT_PUBLIC_API_FOOTBALL_KEY in your .env.local');
}

export async function fetchLiveMatches(leagueId?: string) {
  const url = leagueId
    ? `${API_FOOTBALL_BASE}/fixtures?live=all&league=${leagueId}`
    : `${API_FOOTBALL_BASE}/fixtures?live=all`;
  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    } as HeadersInit,
    next: { revalidate: 60 }, // ISR for 1 min
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('fetchLiveMatches error:', res.status, text);
    throw new Error('Failed to fetch live matches');
  }
  const data = await res.json();
  return data.response;
}

export async function fetchOdds(fixtureId: string) {
  const url = `${API_FOOTBALL_BASE}/odds?fixture=${fixtureId}`;
  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    } as HeadersInit,
    next: { revalidate: 60 },
  });
  if (!res.ok) {
    const text = await res.text();
    console.error('fetchOdds error:', res.status, text);
    throw new Error('Failed to fetch odds');
  }
  const data = await res.json();
  return data.response;
}

export async function fetchLeagues() {
  const url = `${API_FOOTBALL_BASE}/leagues`;
  const res = await fetch(url, {
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    } as HeadersInit,
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch leagues');
  const data = await res.json();
  return data.response;
} 