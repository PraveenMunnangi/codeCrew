import type { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '../../lib/supabaseClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const { title, description, location } = req.body;

  if (!title || !description || !location) {
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const { data, error } = await supabase
    .from('community_needs')
    .insert([{ title, description, location }])
    .select();

  if (error) {
    return res.status(500).json({ error: error.message });
  }

  res.status(201).json(data[0]);
}
