import { NextApiRequest, NextApiResponse } from 'next';
import profileData from '../../data/profile.json';

interface Profile {
    name: string;
    username: string;
    location: string;
    bio: string;
    picture: string;
    progress: { label: string; value: string }[];
    karma: { helpful: number; friendly: number; skilled: number; total: number };
    calendar: { date: string; count: number }[];
    history: { title: string; difficulty: string; timeAgo: string }[];
  }

export default function handler(_: NextApiRequest, res: NextApiResponse<Profile>) {
    res.status(200).json(profileData);
}
