// pages/api/donations.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('donations')
      .select(`
        *,
        sponsors (name),
        community_needs (title)
      `)
      .order('donated_at', { ascending: false });

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { sponsor_id, need_id, amount, type } = req.body;

    if (!sponsor_id || !need_id) {
      return res.status(400).json({ error: 'Sponsor and need are required.' });
    }

    const { data, error } = await supabase
      .from('donations')
      .insert([{ sponsor_id, need_id, amount, type }])
      .select();

    if (error) {
      return res.status(500).json({ error: error.message });
    }
    return res.status(201).json(data[0]);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}