import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../../lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('donations')
      .select('*')
      .order('donated_at', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json([], { status: 200 });
    }

    return NextResponse.json(data || []);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { sponsor_id, need_id, amount, type } = await request.json();

    if (!sponsor_id || !need_id) {
      return NextResponse.json({ error: 'Sponsor and need are required.' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('donations')
      .insert([{ sponsor_id, need_id, amount, type }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}